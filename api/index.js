// Vercel serverless function handler
import express from 'express';
import { registerRoutes } from '../dist/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
const server = await registerRoutes(app);

// Export the Express app for Vercel
export default app;
