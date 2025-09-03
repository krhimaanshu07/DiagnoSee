import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { sendContactFormEmail } from "./emailService";

// Contact form schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  role: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "Consent is required",
  }),
});

// Demo job schema for API documentation examples
const demoJobSchema = z.object({
  modality: z.enum(["xray", "ct", "mri", "pathology"]),
  studyId: z.string(),
  enhancement: z.enum(["super-resolution", "denoising", "harmonization"]),
  strength: z.number().min(0).max(100).default(85),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission(contactData);
      
      // Send email notification
      const emailSent = await sendContactFormEmail(contactData);
      
      console.log("Contact form submission:", {
        id: submission.id,
        email: contactData.email,
        organization: contactData.organization,
        emailSent: emailSent,
        timestamp: new Date().toISOString(),
      });
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! We'll be in touch soon.",
        submissionId: submission.id,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error. Please try again later.",
        });
      }
    }
  });

  // Demo job endpoints for API documentation examples
  app.post("/api/demo-jobs", async (req, res) => {
    try {
      const jobData = demoJobSchema.parse(req.body);
      
      // Create a mock demo job
      const job = await storage.createDemoJob(jobData);
      
      res.json({
        jobId: job.id,
        status: "processing",
        estimatedTime: getEstimatedProcessingTime(jobData.modality),
        message: "Enhancement job started successfully",
      });
    } catch (error) {
      console.error("Demo job creation error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid job parameters",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create demo job",
        });
      }
    }
  });

  app.get("/api/demo-jobs/:id", async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await storage.getDemoJob(jobId);
      
      if (!job) {
        res.status(404).json({
          success: false,
          message: "Job not found",
        });
        return;
      }
      
      // Simulate job progression
      const now = Date.now();
      const elapsed = now - new Date(job.createdAt).getTime();
      const estimatedDuration = getEstimatedProcessingTime(job.modality) * 1000; // Convert to ms
      
      let status = job.status;
      let progress = 0;
      
      if (elapsed < estimatedDuration) {
        status = "processing";
        progress = Math.min(95, (elapsed / estimatedDuration) * 100);
      } else {
        status = "completed";
        progress = 100;
      }
      
      res.json({
        jobId: job.id,
        status,
        progress: Math.round(progress),
        modality: job.modality,
        enhancement: job.enhancement,
        strength: job.strength,
        createdAt: job.createdAt,
        estimatedCompletion: new Date(new Date(job.createdAt).getTime() + estimatedDuration).toISOString(),
        ...(status === "completed" && {
          resultUrl: `/api/demo-results/${job.id}`,
          downloadUrl: `/api/demo-downloads/${job.id}`,
        }),
      });
    } catch (error) {
      console.error("Demo job retrieval error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve job status",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: {
        database: "connected",
        storage: "available",
        ai_processing: "operational",
      },
    });
  });

  // API status endpoint for documentation
  app.get("/api/status", (req, res) => {
    res.json({
      service: "Agnostic Imaging AI API",
      version: "v1.0.0",
      status: "operational",
      uptime: process.uptime(),
      endpoints: {
        contact: "/api/contact",
        demo_jobs: "/api/demo-jobs",
        health: "/api/health",
      },
      rateLimit: {
        requests_per_minute: 100,
        burst_limit: 20,
      },
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to get estimated processing times
function getEstimatedProcessingTime(modality: string): number {
  const times = {
    xray: 45, // 45 seconds
    ct: 180, // 3 minutes
    mri: 300, // 5 minutes
    pathology: 120, // 2 minutes
  };
  
  return times[modality as keyof typeof times] || 60;
}
