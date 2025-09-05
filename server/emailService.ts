import { MailService } from '@sendgrid/mail';

// Initialize mail service only if API key is available
let mailService: MailService | null = null;

if (process.env.SENDGRID_API_KEY) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("SENDGRID_API_KEY not set - email functionality will be disabled");
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  role?: string;
  interest?: string;
  message?: string;
}

export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  if (!mailService) {
    console.warn("Email service not available - SENDGRID_API_KEY not configured");
    return false;
  }

  try {
    const emailContent = `
New Contact Form Submission - DiagnoSee

Contact Details:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Organization: ${formData.organization || 'Not provided'}
- Role: ${formData.role || 'Not provided'}
- Primary Interest: ${formData.interest || 'Not provided'}

Message:
${formData.message || 'No message provided'}

---
This email was sent from the DiagnoSee contact form.
Submitted at: ${new Date().toLocaleString()}
    `.trim();

    const msg = {
      to: 'himanshu.kumar@rashmigroup.com',
      from: 'noreply@diagnosee.com', // This should be a verified sender in SendGrid
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #228B22; margin-bottom: 20px;">New Contact Form Submission - DiagnoSee</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              <p><strong>Organization:</strong> ${formData.organization || 'Not provided'}</p>
              <p><strong>Role:</strong> ${formData.role || 'Not provided'}</p>
              <p><strong>Primary Interest:</strong> ${formData.interest || 'Not provided'}</p>
            </div>
            
            ${formData.message ? `
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${formData.message}</p>
            </div>
            ` : ''}
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
              <p>This email was sent from the DiagnoSee contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    };

    await mailService.send(msg);
    console.log('Contact form email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return false;
  }
}