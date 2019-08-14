import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';

function makeMailerActions(mailer) {
  let transporter = mailer.createTransport({
    host: 'smtp.tellmann.co.za',
    port: 587,
    secure: false,
    auth: { method: 'PLAIN', user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
    tls: { rejectUnauthorized: false }
  });
  
  return Object.freeze({
    sendEmailConfirmation
  });
  
  
  async function sendEmailConfirmation({ email, email_activation_token }, url) {
    return (
      await transporter.sendMail({
        from: '"Felix Tellmann" <felix@tellmann.co.za>', // sender address
        to: email,
        subject: 'Welcome to SmartUp! Please confirm your email address...',
        text: 'Welcome to SmartUp! Please confirm your email address...',
        html: `Hello, <br> Please Click on the link to verify your email.<br><a href="${url}/user/register/${email_activation_token}">Click here to verify</a>` // html body
      })
    );
  }
}

export const {
  sendEmailConfirmation
} = makeMailerActions(nodemailer);