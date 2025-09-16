import nodemailer from 'nodemailer';
import 'dotenv/config';

export async function getMailClient() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'marcelo.kanban.dev@gmail.com',
      serviceClient: process.env.GMAIL_CLIENT_ID,
      privateKey: process.env.GMAIL_CLIENT_SECRET,
    },
  });

  return transporter;
}
