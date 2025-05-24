import nodemailer from 'nodemailer';


const mailConfiguration = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default mailConfiguration;
