import { getMailClient } from "@lib/mail";
import path from "path";

type VerificationEmail = {
  name: string;
  email: string;
  token: string;
}

export async function sendVerificationEmail({ name, email, token }: VerificationEmail) {
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
                <a href="${process.env.WEB_BASE_URL}/auth/verify-email?token=${token}&email=${email}" 
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
};

export async function sendForgotPasswordEmail({ name, email, token }: VerificationEmail) {
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
                <p style="margin:0;">Olá, <strong>${name}</strong>! Recebemos um pedido para redefinir sua senha no Kanban.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">Se você fez essa solicitação, clique no botão abaixo para criar uma nova senha. Caso contrário, ignore este email e sua senha permanecerá a mesma.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:30px 0;">
                <a href="${process.env.WEB_BASE_URL}/auth/reset-password?token=${token}&email=${email}"
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
  });
};

export async function sendLoginVerificationEmail({ name, email }: Pick<VerificationEmail, 'name' | 'email'>, code: string) {
  const mail = await getMailClient();

  await mail.sendMail({
    from: {
      name: 'Kanban',
      address: process.env.GMAIL_USER!
    },
    to: email,
    subject: 'Verificação de dispositivo',
    html: `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#f7f7f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#333333;">
            <tr>
              <td align="center" style="padding:20px;">
                <img src="cid:verify@example.com" alt="Verificação" width="140" height="140" style="display:block; margin:0 auto;"/>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:10px 20px;">
                <h1 style="font-size:22px; color:#222; margin:0;">Verifique seu código</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px; font-size:15px; line-height:22px; text-align:center;">
                <p style="margin:0;">Olá, <strong>${name}</strong>! Use o código abaixo para confirmar sua identidade no Kanban.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:30px 0;">
                <div style="background-color:#f2f2f2; color:#222; display:inline-block; padding:14px 30px; border-radius:5px; font-size:20px; font-weight:bold; letter-spacing:3px;">
                  ${code}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">Este código expira em <strong>10 minutos</strong>. Não compartilhe com ninguém por motivos de segurança.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 30px; font-size:12px; line-height:18px; text-align:center; color:#999;">
                <p style="margin:0;">Se você não solicitou esta verificação, ignore este e-mail.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`,
    attachments: [
      {
        filename: "verify_code.png",
        path: path.join(__dirname, '..', '..', 'public', 'verify_device.png'),
        cid: "verify@example.com"
      }
    ],
  });
}

export async function sendUpdateProfileEmail(name: string, newEmail: string, oldEmail: string, newEmailToken: string) {
  const mail = await getMailClient();
  const expiryHours = 1;

  // Envio para o email antigo
  await mail.sendMail({
    from: {
      name: 'Kanban',
      address: process.env.GMAIL_USER!
    },
    to: oldEmail,
    subject: 'Solicitação de alteração de e-mail',
    html: `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#f7f7f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#333333;">
            <tr>
              <td align="center" style="padding:20px;">
                <img src="cid:alert@example.com" alt="Aviso de alteração" width="140" height="140" style="display:block; margin:0 auto;"/>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:10px 20px;">
                <h1 style="font-size:22px; color:#222; margin:0;">Solicitação de alteração de e-mail</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 30px; font-size:15px; line-height:22px; text-align:center;">
                <p style="margin:0;">Olá, <strong>${name}</strong>! Detectamos uma solicitação para alterar o e-mail da sua conta Kanban.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 40px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">
                  <strong>E-mail atual:</strong> ${oldEmail}<br/>
                  <strong>Novo e-mail solicitado:</strong> ${newEmail}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">Se você **não solicitou essa alteração**, recomendamos alterar sua senha imediatamente para manter sua conta segura.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 30px; font-size:12px; line-height:18px; text-align:center; color:#999;">
                <p style="margin:0;">Este é apenas um aviso — nenhuma ação é necessária caso a solicitação tenha sido feita por você.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`,
    attachments: [
      {
        filename: "alert.png",
        path: path.join(__dirname, '..', '..', 'public', 'alert.png'),
        cid: "alert@example.com"
      }
    ],
  });

  // Envio para o email novo
  await mail.sendMail({
    from: {
      name: 'Kanban',
      address: process.env.GMAIL_USER!,
    },
    to: newEmail,
    subject: 'Sua conta foi atualizada',
    html: `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#f7f7f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#333333;">
            <tr>
              <td align="center" style="padding:20px;">
                <img src="cid:new_email@example.com" alt="Confirmação de e-mail" width="140" height="140" style="display:block; margin:0 auto;"/>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:10px 20px;">
                <h1 style="font-size:22px; color:#222; margin:0;">Confirme seu novo e-mail</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 30px; font-size:15px; line-height:22px; text-align:center;">
                <p style="margin:0;">Olá, <strong>${name}</strong>! Você solicitou a alteração do e-mail da sua conta Kanban.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 40px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">
                  Para concluir a alteração e ativar seu novo endereço de e-mail (<strong>${newEmail}</strong>), clique no botão abaixo:
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:30px 0;">
                <a href="${process.env.WEB_BASE_URL}/update-email?token=${newEmailToken}" style="display:inline-block; text-decoration:none; background:#e3279a; color:#ffffff; padding:12px 28px; border-radius:6px; font-weight:600; font-size:16px;">
                  Confirmar novo e-mail
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 30px; font-size:14px; line-height:20px; text-align:center; color:#555;">
                <p style="margin:0;">Este link expira em <strong>${expiryHours} hora</strong>. Após esse período, será necessário solicitar novamente.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 30px; font-size:12px; line-height:18px; text-align:center; color:#999;">
                <p style="margin:0;">Se você não solicitou essa alteração, ignore este e-mail.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`,
    attachments: [
      {
        filename: "new_email.png",
        path: path.join(__dirname, '..', '..', 'public', 'new_email.png'),
        cid: "new_email@example.com"
      }
    ]
  })
}