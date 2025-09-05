# DiagnoSee Deployment Guide

## Vercel Deployment

This guide will help you deploy the DiagnoSee medical imaging platform to Vercel.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **SendGrid Account**: For email functionality (optional)

### Deployment Steps

#### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `krhimaanshu07/DiagnoSee`
4. Vercel will automatically detect it as a Node.js project

#### 2. Configure Build Settings

Vercel should automatically detect the build settings, but verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 3. Environment Variables

Set these environment variables in Vercel dashboard:

```bash
NODE_ENV=production
BASE_URL=https://your-app.vercel.app
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

**To get SendGrid API Key:**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Go to Settings > API Keys
3. Create a new API key
4. Copy the key and add it to Vercel environment variables

#### 4. Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for the build to complete
3. Your app will be available at `https://your-app.vercel.app`

### Post-Deployment

#### 1. Test the Application

- Visit your deployed URL
- Test the contact form
- Verify 3D components load correctly
- Check API endpoints at `/api/health`

#### 2. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Add your custom domain
3. Update the `BASE_URL` environment variable

### Troubleshooting

#### Build Issues

If the build fails:

1. **Check build logs** in Vercel dashboard
2. **Verify Node.js version** (should be 18+)
3. **Check dependencies** are properly installed

#### Runtime Issues

If the app doesn't work after deployment:

1. **Check function logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Test API endpoints** individually

#### Large File Issues

The app includes large video files that may cause issues:

1. **Move large assets** to a CDN (Cloudinary, AWS S3)
2. **Compress videos** before deployment
3. **Use Git LFS** for large files

### Performance Optimization

#### 1. Asset Optimization

- Compress images and videos
- Use WebP format for images
- Implement lazy loading for 3D components

#### 2. Caching

- Static assets are automatically cached by Vercel
- API responses can be cached using Vercel's Edge Network

#### 3. Database

For production, consider:
- **Neon Database** (PostgreSQL)
- **PlanetScale** (MySQL)
- **MongoDB Atlas**

### Monitoring

#### 1. Vercel Analytics

- Enable Vercel Analytics for performance monitoring
- Track Core Web Vitals
- Monitor API response times

#### 2. Error Tracking

- Set up error tracking (Sentry, LogRocket)
- Monitor API errors
- Track user interactions

### Security

#### 1. Environment Variables

- Never commit sensitive data to Git
- Use Vercel's environment variable system
- Rotate API keys regularly

#### 2. API Security

- Implement rate limiting
- Add CORS configuration
- Validate all inputs

### Scaling

#### 1. Vercel Pro Features

- **Edge Functions** for global performance
- **Incremental Static Regeneration** for dynamic content
- **Advanced caching** strategies

#### 2. Database Scaling

- Use connection pooling
- Implement read replicas
- Consider database sharding

## Support

For issues with deployment:

1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact support if needed

---

**DiagnoSee** - Deployed and ready for medical imaging excellence! 🏥✨
