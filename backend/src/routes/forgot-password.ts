import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import path from "path";
import argon2 from 'argon2';

export async function forgotPassword(app: FastifyInstance) {
  app.post('/forgot-password', async (request: any, reply: any) => {
    try {
      const { email } = request.body;

      const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.verified, true)) });

      if (!user) {
        return reply.status(404).send({ message: 'Não foi possível encontrar um usuário com esse email!' });
      }

      const forgotPasswordToken = randomBytes(64).toString('hex');
      const forgotPasswordTokenExpiry = dayjs.utc().add(15, 'minute').format();
      const hashForgotPasswordToken = await argon2.hash(forgotPasswordToken);

      await db.update(users).set({
        forgotPasswordToken: hashForgotPasswordToken,
        forgotPasswordTokenExpiry,
      }).where(eq(users.email, email));

      const mail = await getMailClient();

      await mail.sendMail({
        from: {
          name: 'Kanban',
          address: process.env.GMAIL_USER!
        },
        to: email,
        subject: 'Recuperação de senha',
        html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#f7f7f7; padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#333333;">
                <tr>
                  <td align="center" style="padding:20px;">
                    <img src="cid:password@example.com" alt="Mail" width="120" height="120" style="display:block; margin:0 auto;"/>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:10px 20px;">
                    <h1 style="font-size:22px; color:#222; margin:0;">Recupere sua senha</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 30px; font-size:15px; line-height:22px; text-align:center;">
                    <p style="margin:0;">Olá, <strong>${user.name}</strong>! Recebemos um pedido para redefinir sua senha no Kanban.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                    <p style="margin:0;">Se você fez essa solicitação, clique no botão abaixo para criar uma nova senha. Caso contrário, ignore este email e sua senha permanecerá a mesma.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:30px 0;">
                    <a href="${process.env.WEB_BASE_URL}/auth/reset-password?token=${forgotPasswordToken}&email=${user.email}"
                        style="background-color:#e3279a; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:5px; font-size:15px; font-weight:bold; display:inline-block;">
                      Redefinir Senha
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 30px; font-size:12px; line-height:18px; text-align:center; color:#999;">
                    <p style="margin:0;">Este link expira em 15 minutos por motivos de segurança.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>`,
        attachments: [
          {
            filename: "forgot_password.png",
            path: path.join(__dirname, '..', '..', 'public', 'forgot_password.png'),
            cid: "password@example.com"
          }
        ],
      }) 

      return reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}