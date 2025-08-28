# Agnostic Imaging AI - Medical Imaging GenAI SaaS

## Overview

This is a production-ready marketing and demo website for Agnostic Imaging AI, a medical imaging GenAI SaaS platform. The application showcases an OEM-agnostic solution that provides super-resolution and enhancement for X-Ray, CT, MRI, and Digital Pathology imaging through advanced AI technology. The website features a modern 3D design with a pure black theme, interactive demonstrations, and comprehensive information about the platform's capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern React 18 with TypeScript for type safety and developer experience
- **Vite**: Lightning-fast build tool and development server with hot module replacement
- **Routing**: React Router DOM for client-side navigation with dedicated pages for each section
- **State Management**: Zustand for lightweight, performant global state management
- **3D Graphics**: React Three Fiber ecosystem with Drei helpers for procedural 3D medical gantry visualization
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with full accessibility support
- **Styling**: TailwindCSS with custom medical-themed color variables and design system

### Backend Architecture
- **Express.js**: RESTful API server with middleware for logging, JSON parsing, and error handling
- **TypeScript**: Full-stack type safety with shared schema definitions
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **API Endpoints**: Contact form submission and demo job management with Zod validation
- **Development Integration**: Vite middleware integration for seamless full-stack development

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**: Users, contact submissions, and demo jobs with JSONB metadata support
- **Environment**: Database URL configuration with automatic provisioning checks

### Authentication & Security
- **Magic Link Authentication**: Passwordless login system for enhanced security
- **Form Validation**: React Hook Form with Zod schemas for comprehensive client and server-side validation
- **HIPAA Compliance**: Framework ready for healthcare data protection requirements
- **CORS & Security**: Express security middleware with appropriate headers

### Design System
- **Typography**: Inter for UI elements, DM Sans for headlines with medical-grade readability
- **Color Palette**: Pure black background with medical cyan (#00E5FF) and violet (#7C4DFF) accents
- **Components**: Modular component architecture with Badge, CTA, Section, and FeatureCard primitives
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Full keyboard navigation, screen reader support, and WCAG compliance

### Content Management
- **Static Content**: Markdown files for executive summaries and detailed technical documentation
- **Dynamic Content**: JSON-based configuration for solutions, features, and site settings
- **SEO Optimization**: React Helmet Async for meta tags, Open Graph, and structured data
- **Asset Management**: Optimized image handling with proper alt text and lazy loading

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching for API interactions
- **react-router-dom**: Client-side routing and navigation
- **react-helmet-async**: SEO and meta tag management
- **framer-motion**: Animation library for smooth UI transitions

### 3D Graphics Stack
- **@react-three/fiber**: React renderer for Three.js scenes
- **@react-three/drei**: Utility library with cameras, controls, and effects
- **@react-three/postprocessing**: Bloom and visual effects for medical device visualization
- **three**: Core 3D graphics library

### UI Component Libraries
- **@radix-ui/react-***: Comprehensive accessible component primitives
- **lucide-react**: Modern icon library with medical and technical icons
- **class-variance-authority**: Type-safe component variant management
- **clsx & tailwind-merge**: Efficient className management utilities

### Database & Validation
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **zod**: Runtime type validation and schema definition

### Medical Imaging Specific
- **react-compare-slider**: Before/after image comparison for demonstrating enhancement results
- **cornerstone3d**: DICOM viewer integration for medical image display and manipulation
- **date-fns**: Date formatting for medical timestamps and scheduling

### Development & Build Tools
- **vite**: Build tool with React plugin and development server
- **typescript**: Static type checking across the entire application
- **eslint & prettier**: Code quality and formatting tools
- **@replit/vite-plugin-***: Replit-specific development enhancements and error handling

### Authentication & Forms
- **@hookform/resolvers**: React Hook Form integration with Zod validation
- **zustand**: Lightweight state management for user sessions and preferences

### Styling & Design
- **tailwindcss**: Utility-first CSS framework with custom medical theme
- **autoprefixer**: CSS vendor prefix automation
- **postcss**: CSS processing and optimization