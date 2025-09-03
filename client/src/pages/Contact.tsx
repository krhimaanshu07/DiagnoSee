import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { siteConfig } from "@/site.config";
import contactBackgroundVideo from "@assets/5534943_Coll_wavebreak_Animation_1920x1080_1756886679021.mov";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  role: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive communications",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      role: "",
      interest: "",
      message: "",
      consent: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message! We'll be in touch soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  const roles = [
    { value: "radiologist", label: "Radiologist" },
    { value: "it-director", label: "IT Director" },
    { value: "administrator", label: "Administrator" },
    { value: "researcher", label: "Researcher" },
    { value: "other", label: "Other" },
  ];

  const interests = [
    { value: "xray", label: "X-Ray Super-Resolution" },
    { value: "ct", label: "CT Enhancement" },
    { value: "mri", label: "MRI Super-Resolution" },
    { value: "pathology", label: "Digital Pathology" },
    { value: "integration", label: "PACS Integration" },
    { value: "enterprise", label: "Enterprise Deployment" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - {siteConfig.name}</title>
        <meta name="description" content="Get in touch with our medical imaging AI experts. Schedule a demo or discuss your imaging enhancement needs." />
      </Helmet>

      {/* Video Background Container */}
      <div className="relative overflow-hidden min-h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="contact-background-video"
          onLoadStart={() => console.log("Contact video loading started")}
          onCanPlay={() => console.log("Contact video can play")}
        >
          <source src={contactBackgroundVideo} type="video/mp4" />
          <source src={contactBackgroundVideo} type="video/mov" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 z-20">
          <Section 
            title="Get in Touch"
            subtitle="Ready to transform your medical imaging capabilities? Contact us to learn more about our GenAI solutions."
            background="black"
            className="pt-32 bg-transparent"
          >
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-20">
          {/* Contact Form */}
          <div className="contact-3d-card p-8 rounded-xl">
            <h3 className="text-xl font-dm-sans font-bold text-white mb-6">Send us a message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">First Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-zinc-800 border-zinc-600 text-white focus:border-primary"
                            data-testid="input-first-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Last Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-zinc-800 border-zinc-600 text-white focus:border-primary"
                            data-testid="input-last-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="bg-zinc-800 border-zinc-600 text-white focus:border-primary"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Organization</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-zinc-800 border-zinc-600 text-white focus:border-primary"
                          data-testid="input-organization"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white" data-testid="select-role">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Area of Interest</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white" data-testid="select-interest">
                            <SelectValue placeholder="Select an area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interests.map((interest) => (
                            <SelectItem key={interest.value} value={interest.value}>
                              {interest.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Tell us about your imaging needs and how we can help..."
                          className="bg-zinc-800 border-zinc-600 text-white focus:border-primary"
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="accent-primary"
                          data-testid="checkbox-consent"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-zinc-300">
                          I agree to receive communications from {siteConfig.name} about our products and services *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={submitMutation.isPending}
                  data-testid="submit-contact-form"
                >
                  {submitMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner animate-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-3d-card p-8 rounded-xl">
              <h3 className="text-xl font-dm-sans font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center" data-testid="contact-email">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-zinc-300">{siteConfig.contact.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center" data-testid="contact-phone">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-primary"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-zinc-300">{siteConfig.contact.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center" data-testid="contact-address">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div className="text-zinc-300">
                      {siteConfig.contact.address.street}<br/>
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-3d-card p-8 rounded-xl">
              <h3 className="text-xl font-dm-sans font-bold text-white mb-6">Follow Us</h3>
              
              <div className="flex space-x-4">
                <a 
                  href={siteConfig.social.linkedin} 
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible"
                  data-testid="social-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a 
                  href={siteConfig.social.twitter} 
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible"
                  data-testid="social-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={siteConfig.social.rss} 
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible"
                  data-testid="social-rss"
                >
                  <i className="fas fa-rss"></i>
                </a>
              </div>
            </div>
            
            <div className="contact-3d-card p-8 rounded-xl">
              <h3 className="text-xl font-dm-sans font-bold text-white mb-4">Schedule a Demo</h3>
              <p className="text-zinc-300 mb-6">
                See our technology in action with a personalized demonstration using your imaging data.
              </p>
              <Button 
                asChild 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                data-testid="schedule-demo-button"
              >
                <a href="/demos">
                  <i className="fas fa-calendar mr-2"></i>
                  Book Demo
                </a>
              </Button>
            </div>
          </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
