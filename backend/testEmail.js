import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendClient = new Resend(process.env.RESEND_API_KEY);

(async () => {
  try {
    const result = await resendClient.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`, // FIXED
      to: 'lekshmi.reachme@gmail.com',
      subject: 'Test Email',
      html: '<h1>Hello from Chatify</h1>',
    });
    console.log('Email sent:', result);
  } catch (err) {
    console.error('Error sending email:', err);
  }
})();