import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import ejs from "ejs";
import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}


const sendMailer = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // get the path from the email template file
  const emailTemplatePath = path.join(__dirname, `../mails`, template);

  
  //   render the email template with the Ejs

  const html: string = await ejs.renderFile(emailTemplatePath, data);
  
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
  
};

export default sendMailer;