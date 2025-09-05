import { 
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission,
  type DemoJob,
  type InsertDemoJob
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  createDemoJob(data: InsertDemoJob): Promise<DemoJob>;
  getDemoJob(id: string): Promise<DemoJob | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private demoJobs: Map<string, DemoJob>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.demoJobs = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...data,
      id,
      createdAt: new Date(),
      processed: false,
      metadata: null
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async createDemoJob(data: InsertDemoJob): Promise<DemoJob> {
    const id = randomUUID();
    const job: DemoJob = {
      ...data,
      id,
      status: "processing",
      createdAt: new Date(),
      completedAt: null,
      metadata: null
    };
    this.demoJobs.set(id, job);
    return job;
  }

  async getDemoJob(id: string): Promise<DemoJob | undefined> {
    return this.demoJobs.get(id);
  }
}

export const storage = new MemStorage();
