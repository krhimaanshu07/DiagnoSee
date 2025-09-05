import f from"express";import{createServer as N}from"http";import{z as i}from"zod";import{randomUUID as h}from"crypto";var y=class{users;contactSubmissions;demoJobs;constructor(){this.users=new Map,this.contactSubmissions=new Map,this.demoJobs=new Map}async getUser(t){return this.users.get(t)}async getUserByUsername(t){return Array.from(this.users.values()).find(o=>o.username===t)}async createUser(t){let o=h(),s={...t,id:o,createdAt:new Date};return this.users.set(o,s),s}async createContactSubmission(t){let o=h(),s={...t,id:o,createdAt:new Date,processed:!1,metadata:null};return this.contactSubmissions.set(o,s),s}async createDemoJob(t){let o=h(),s={...t,id:o,status:"processing",createdAt:new Date,completedAt:null,metadata:null};return this.demoJobs.set(o,s),s}async getDemoJob(t){return this.demoJobs.get(t)}},u=new y;import{MailService as j}from"@sendgrid/mail";var g=null;process.env.SENDGRID_API_KEY?(g=new j,g.setApiKey(process.env.SENDGRID_API_KEY)):console.warn("SENDGRID_API_KEY not set - email functionality will be disabled");async function v(e){if(!g)return console.warn("Email service not available - SENDGRID_API_KEY not configured"),!1;try{let t=`
New Contact Form Submission - DiagnoSee

Contact Details:
- Name: ${e.firstName} ${e.lastName}
- Email: ${e.email}
- Organization: ${e.organization||"Not provided"}
- Role: ${e.role||"Not provided"}
- Primary Interest: ${e.interest||"Not provided"}

Message:
${e.message||"No message provided"}

---
This email was sent from the DiagnoSee contact form.
Submitted at: ${new Date().toLocaleString()}
    `.trim(),o={to:"himanshu.kumar@rashmigroup.com",from:"noreply@diagnosee.com",subject:`New Contact Form Submission from ${e.firstName} ${e.lastName}`,text:t,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #228B22; margin-bottom: 20px;">New Contact Form Submission - DiagnoSee</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${e.firstName} ${e.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${e.email}">${e.email}</a></p>
              <p><strong>Organization:</strong> ${e.organization||"Not provided"}</p>
              <p><strong>Role:</strong> ${e.role||"Not provided"}</p>
              <p><strong>Primary Interest:</strong> ${e.interest||"Not provided"}</p>
            </div>
            
            ${e.message?`
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${e.message}</p>
            </div>
            `:""}
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
              <p>This email was sent from the DiagnoSee contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `};return await g.send(o),console.log("Contact form email sent successfully"),!0}catch(t){return console.error("Failed to send contact form email:",t),!1}}var C=i.object({firstName:i.string().min(1,"First name is required"),lastName:i.string().min(1,"Last name is required"),email:i.string().email("Invalid email address"),organization:i.string().optional(),role:i.string().optional(),interest:i.string().optional(),message:i.string().optional(),consent:i.boolean().refine(e=>e===!0,{message:"Consent is required"})}),$=i.object({modality:i.enum(["xray","ct","mri","pathology"]),studyId:i.string(),enhancement:i.enum(["super-resolution","denoising","harmonization"]),strength:i.number().min(0).max(100).default(85)});async function x(e){return e.post("/api/contact",async(o,s)=>{try{let r=C.parse(o.body),n=await u.createContactSubmission(r),d=await v(r);console.log("Contact form submission:",{id:n.id,email:r.email,organization:r.organization,emailSent:d,timestamp:new Date().toISOString()}),s.json({success:!0,message:"Thank you for your message! We'll be in touch soon.",submissionId:n.id})}catch(r){console.error("Contact form error:",r),r instanceof i.ZodError?s.status(400).json({success:!1,message:"Invalid form data",errors:r.errors}):s.status(500).json({success:!1,message:"Internal server error. Please try again later."})}}),e.post("/api/demo-jobs",async(o,s)=>{try{let r=$.parse(o.body),n=await u.createDemoJob(r);s.json({jobId:n.id,status:"processing",estimatedTime:S(r.modality),message:"Enhancement job started successfully"})}catch(r){console.error("Demo job creation error:",r),r instanceof i.ZodError?s.status(400).json({success:!1,message:"Invalid job parameters",errors:r.errors}):s.status(500).json({success:!1,message:"Failed to create demo job"})}}),e.get("/api/demo-jobs/:id",async(o,s)=>{try{let r=o.params.id,n=await u.getDemoJob(r);if(!n){s.status(404).json({success:!1,message:"Job not found"});return}let c=Date.now()-new Date(n.createdAt).getTime(),a=S(n.modality)*1e3,p=n.status,b=0;c<a?(p="processing",b=Math.min(95,c/a*100)):(p="completed",b=100),s.json({jobId:n.id,status:p,progress:Math.round(b),modality:n.modality,enhancement:n.enhancement,strength:n.strength,createdAt:n.createdAt,estimatedCompletion:new Date(new Date(n.createdAt).getTime()+a).toISOString(),...p==="completed"&&{resultUrl:`/api/demo-results/${n.id}`,downloadUrl:`/api/demo-downloads/${n.id}`}})}catch(r){console.error("Demo job retrieval error:",r),s.status(500).json({success:!1,message:"Failed to retrieve job status"})}}),e.get("/api/health",(o,s)=>{s.json({status:"healthy",timestamp:new Date().toISOString(),version:"1.0.0",services:{database:"connected",storage:"available",ai_processing:"operational"}})}),e.get("/api/status",(o,s)=>{s.json({service:"Agnostic Imaging AI API",version:"v1.0.0",status:"operational",uptime:process.uptime(),endpoints:{contact:"/api/contact",demo_jobs:"/api/demo-jobs",health:"/api/health"},rateLimit:{requests_per_minute:100,burst_limit:20}})}),N(e)}function S(e){return{xray:45,ct:180,mri:300,pathology:120}[e]||60}import _ from"express";import A from"fs";import w from"path";import{createServer as ee,createLogger as F}from"vite";import{defineConfig as E}from"vite";import P from"@vitejs/plugin-react";import l from"path";import U from"@replit/vite-plugin-runtime-error-modal";var J=E({plugins:[P(),U(),...process.env.NODE_ENV!=="production"&&process.env.REPL_ID!==void 0?[await import("@replit/vite-plugin-cartographer").then(e=>e.cartographer())]:[]],resolve:{alias:{"@":l.resolve(import.meta.dirname,"client","src"),"@shared":l.resolve(import.meta.dirname,"shared"),"@assets":l.resolve(import.meta.dirname,"attached_assets")}},root:l.resolve(import.meta.dirname,"client"),build:{outDir:l.resolve(import.meta.dirname,"dist/public"),emptyOutDir:!0},server:{fs:{strict:!0,deny:["**/.*"]}}});import{nanoid as oe}from"nanoid";var re=F();function D(e,t="express"){let o=new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0});console.log(`${o} [${t}] ${e}`)}function I(e){let t=w.resolve(import.meta.dirname,"public");if(!A.existsSync(t))throw new Error(`Could not find the build directory: ${t}, make sure to build the client first`);e.use(_.static(t)),e.use("*",(o,s)=>{s.sendFile(w.resolve(t,"index.html"))})}var m=f();m.use(f.json());m.use(f.urlencoded({extended:!1}));m.use((e,t,o)=>{let s=Date.now(),r=e.path,n,d=t.json;t.json=function(c,...a){return n=c,d.apply(t,[c,...a])},t.on("finish",()=>{let c=Date.now()-s;if(r.startsWith("/api")){let a=`${e.method} ${r} ${t.statusCode} in ${c}ms`;n&&(a+=` :: ${JSON.stringify(n)}`),a.length>80&&(a=a.slice(0,79)+"\u2026"),D(a)}}),o()});m.use("/api",async(e,t,o)=>{try{(await x(f())).emit("request",e,t)}catch(s){o(s)}});process.env.NODE_ENV==="production"&&I(m);m.use((e,t,o,s)=>{let r=e.status||e.statusCode||500,n=e.message||"Internal Server Error";o.status(r).json({message:n}),console.error(e)});m.get("/",(e,t)=>{t.json({status:"healthy",service:"DiagnoSee API",timestamp:new Date().toISOString()})});var de=m;export{de as default};
