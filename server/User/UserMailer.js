import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

class UserMailer {
  constructor(nodemailer) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.tellmann.co.za',
      port: 587,
      secure: false,
      auth: {
        method: 'PLAIN',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  
  sendEmailConfirmation = async ({ email, email_activation_token }) => {
    return (
      await this.transporter.sendMail({
        from: '"Felix Tellmann" <felix@tellmann.co.za>', // sender address
        to: /*email*/ 'felix@burgerexchange.co.za',
        subject: 'Welcome to SmartUp! Please confirm your email address...',
        text: 'Welcome to SmartUp! Please confirm your email address...',
        html: `Hello, <br> Please Click on the link to verify your email.<br><a href="${process.env.URL}/user/register/${email_activation_token}">Click here to verify</a>`, // html body
      })
    );
  };
  
  sendResetToken = async ({ email, reset_token }) => {
    return (
      await this.transporter.sendMail({
        from: '"Felix Tellmann" <felix@tellmann.co.za>', // sender address
        to: /*email*/ 'felix@burgerexchange.co.za',
        subject: 'SmartUp Password reset confirmation',
        text: 'Please click on the link below to reset your password',
        html: `Hello, <br> Please Click on the link to reset your password for account: ${email}.<br><a href="${process.env.URL}/user/resetPassword/${email}/${reset_token}">Click here to reset password</a>`, // html body
      })
    );
  };
}

export default new UserMailer(nodemailer);
/*

export const transporter = nodemailer.createTransport({
  host: 'smtp.tellmann.co.za',
  port: 587,
  secure: false,
  auth: {
    method: 'PLAIN',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmailConfirmation({ email, email_activation_token }, url) {
  return (
    await transporter.sendMail({
      from: '"Felix Tellmann" <felix@tellmann.co.za>', // sender address
      to: /!*email*!/ 'felix@burgerexchange.co.za',
      subject: 'Welcome to SmartUp! Please confirm your email address...',
      text: 'Welcome to SmartUp! Please confirm your email address...',
      html: `Hello, <br> Please Click on the link to verify your email.<br><a href="${url}/user/register/${email_activation_token}">Click here to verify</a>`, // html body
    })
  );
}

export default { transporter, sendEmailConfirmation };*/
