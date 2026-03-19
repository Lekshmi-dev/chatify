import {Resend} from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // correct way

export const resendClient = new Resend(process.env.RESEND_API_KEY);
export const sender = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`;