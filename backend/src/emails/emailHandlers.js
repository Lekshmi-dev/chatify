import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
export const sendWelcomeEmail = async (email, name, clientURL) => {
    const{data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name, clientURL)
    });
    if(error){  
        console.log("Error sending welcome email:", error);
    }else{
        console.log("Welcome email sent successfully to", data);
    }
}