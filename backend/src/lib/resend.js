import {Resend} from 'resend';
import {ENV} from './env.js';

export const resendClient = new Resend(ENV.RESEND_API_KEY);
export const sender = `${ENV.EMAIL_FROM_NAME} <${ENV.EMAIL_FROM}>`;