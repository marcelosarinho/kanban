import { getMailClient } from "../lib/mail";
import path from "path";

type VerificationEmail = {
  name: string;
  email: string;
  verifyToken: string;
}

export async function sendVerificationEmail({ name, email, verifyToken }: VerificationEmail) {
  const mail = await getMailClient();

  await mail.sendMail({
        from: {
          name: 'Kanban',
          address: process.env.GMAIL_USER!
        },
        to: email,
        subject: 'Verificação de email',
        html: `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#f7f7f7; padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#333333;">
                  <tr>
                    <td align="center" style="padding:20px;">
                      <img src="cid:mail@example.com" alt="Mail" width="120" height="120" style="display:block; margin:0 auto;"/>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:10px 20px;">
                      <h1 style="font-size:22px; color:#222; margin:0;">Verifique seu email</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 30px; font-size:15px; line-height:22px; text-align:center;">
                      <p style="margin:0;">Olá, <strong>${name}</strong>! Por favor, verifique seu email para confirmar seu cadastro e utilizar o Kanban.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                      <p style="margin:0;">A verificação de e-mail serve para garantir que o email informado é realmente seu e manter sua conta segura. Com isso, você poderá recuperar sua senha quando precisar.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <a href="${process.env.WEB_BASE_URL}/auth/verify-email?token=${verifyToken}&email=${email}" 
                        style="background-color:#e3279a; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:5px; font-size:15px; font-weight:bold; display:inline-block;">
                        Verificar Email
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>`,
        attachments: [
          {
            filename: "mail.png",
            path: path.join(__dirname, '..', '..', 'public', 'mail.png'),
            cid: "mail@example.com"
          }
        ]
      });
}