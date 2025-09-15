import { FastifyInstance } from "fastify";
import argon2 from 'argon2';
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer";
import path from "path";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request: any, reply: any) => {
    try {
      const { name, email, password } = request.body;

      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (user && user.verified) {
        return reply.status(400).send({ message: 'Usuário já cadastrado!' });
      }

      if (user && !user.verified) {
        if (user.verifyTokenExpiry && dayjs().isAfter(dayjs.utc(user.verifyTokenExpiry))) {
          const newVerifyToken = randomBytes(64).toString('hex');
          const newVerifyTokenExpiry = dayjs.utc().add(1, 'day').format();

          await db.update(users).set({ verifyToken: newVerifyToken, verifyTokenExpiry: newVerifyTokenExpiry }).where(eq(users.email, user.email));
        } else {
          const mail = await getMailClient();

          const message = await mail.sendMail({
            from: {
              name: 'Kanban',
              address: 'kanban@kanban.com',
            },
            to: email,
            subject: 'Verifique seu email',
            html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img style="width: 200px; height: 200px;" src="cid:mail@example.com" alt="Mail"/>
              <h1>Verifique seu email</h1>
              <p>Olá, ${user.name}! Por favor, verifique seu email para confirmar seu cadastro e utilizar o Kanban.</p>
              <p>A verificação de e-mail serve para garantir que o email informado é realmente seu e manter sua conta segura. Com isso, você poderá recuperar sua senha quando precisar.</p>
              <a style="margin-top: 10px; color: white; text-decoration: none; padding: 12px; border-radius: 5px; background-color: #e3279a; font-size: 14px;" href="http://localhost:3000/verify-email?token=${user.verifyToken}">Verificar email</a>
            </div>`,
            attachments: [
              {
                filename: "mail.svg",
                path: path.join(__dirname, '..', '..', 'public', 'mail.svg'),
                cid: "mail@example.com"
              }
            ],
          });

          console.log(nodemailer.getTestMessageUrl(message));
        }

        return reply.status(200).send({ message: 'Enviado email de verificação!' });
      }

      const hashedPassword = await argon2.hash(password);
      const verifyToken = randomBytes(64).toString('hex');
      const verifyTokenExpiry = dayjs.utc().add(1, 'day').format();

      await db.insert(users).values({ name, email, password: hashedPassword, verifyToken, verifyTokenExpiry });

      const mail = await getMailClient();

      const message = await mail.sendMail({
        from: {
          name: 'Kanban',
          address: 'kanban@kanban.com',
        },
        to: email,
        subject: 'Verifique seu email',
        html: `
          <h1>Verifique seu email</h1>
          <p>Por favor, verifique seu email para confirmar seu cadastro.</p>
          <img src="cid:mail@example.com" alt="Mail"/>
          <a href="http://localhost:3000/verify-email?token=${verifyToken}">Verificar email</a>
        `,
        attachments: [
          {
            filename: "mail.svg",
            path: "../public/mail.svg",
            cid: "mail@example.com"
          }
        ]
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}