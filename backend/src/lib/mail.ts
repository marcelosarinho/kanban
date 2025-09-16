import nodemailer from 'nodemailer';
import 'dotenv/config';
import { OAuth2Client } from 'google-auth-library';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function getMailClient() {
  const OAuth2 = new OAuth2Client(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_REDIRECT_URI);

  OAuth2.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  const { token } = await OAuth2.getAccessToken();

  const smtpConfig: SMTPTransport.Options = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: token!,
    },
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  return transporter;
}
