# DiagnoSee - Advanced Medical Imaging Platform

A cutting-edge medical imaging platform featuring 3D visualization, DICOM support, and modern web technologies.

## 🏥 Features

- **3D Medical Visualization**: Interactive 3D models using Three.js and React Three Fiber
- **DICOM Viewer**: Advanced medical image viewing capabilities
- **Modern UI**: Dark theme with Tailwind CSS and Radix UI components
- **Contact System**: Integrated email service with SendGrid
- **Responsive Design**: Mobile-first approach with modern UX
- **Real-time Updates**: Hot reloading in development mode

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Three.js** for 3D graphics
- **React Three Fiber** for React integration
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **SendGrid** for email services
- **Drizzle ORM** for database management
- **Express Session** for session management

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/himanshukumar/DiagnoSee.git
   cd DiagnoSee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   BASE_URL=http://127.0.0.1:5000
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
DiagnoSee/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── three/         # 3D scene components
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── emailService.ts   # Email service integration
├── shared/               # Shared schemas and types
└── attached_assets/      # Media assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

## 🏗️ Development

The application runs in development mode with:
- Hot reloading for both frontend and backend
- TypeScript compilation
- Vite for fast frontend builds
- Express server for API endpoints

## 📧 Email Configuration

The contact form uses SendGrid for email delivery. To enable email functionality:

1. Sign up for a SendGrid account
2. Create an API key
3. Add it to your `.env` file as `SENDGRID_API_KEY`

Without the API key, the application will run but email functionality will be disabled.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏥 Medical Disclaimer

This software is for educational and research purposes only. It is not intended for clinical use or medical diagnosis. Always consult with qualified medical professionals for medical decisions.

---

**DiagnoSee** - Revolutionizing medical imaging through advanced 3D visualization technology.
