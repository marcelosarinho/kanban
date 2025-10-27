import z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório!'),
  email: z.email('Email inválido!'),
  password: z.string().trim().min(4, 'Senha deve ter entre 4 a 60 caracteres!').max(60, 'Senha deve ter entre 4 a 60 caracteres!'),
});

export const userLoginSchema = userSchema.omit({ name: true});

export const userRegisterSchema = userSchema.extend({
  password_confirmation: z.string()
  .trim()
  .min(4, 'Senha deve ter entre 4 a 60 caracteres!')
  .max(60, 'Senha deve ter entre 4 a 60 caracteres!'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem!',
  path: ['password_confirmation'],
});

export const userForgotPasswordSchema = userSchema.pick({ email: true });

export const userResetPasswordSchema = userSchema.pick({ password: true }).extend({
  token: z.string().optional(),
  email: z.string().optional(),
  password_confirmation: z.string()
  .trim()
  .min(4, 'Senha deve ter entre 4 a 60 caracteres!')
  .max(60, 'Senha deve ter entre 4 a 60 caracteres!'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem!',
  path: ['password_confirmation'],
});

export const userVerifyDevice = z.object({
  code: z.string().trim().min(1, 'Código obrigatório!'),
});

export const profileInfoSchema = userSchema.omit({ password: true });
export const profilePasswordSchema = userSchema.pick({ password: true }).extend({
  new_password: z.string().trim().min(4, 'Senha deve ter entre 4 a 60 caracteres!').max(60, 'Senha deve ter entre 4 a 60 caracteres!'),
  new_password_confirmation: z.string()
  .trim()
  .min(4, 'Senha deve ter entre 4 a 60 caracteres!')
  .max(60, 'Senha deve ter entre 4 a 60 caracteres!'),
}).refine((data) => data.new_password === data.new_password_confirmation, {
  message: 'As senhas não coincidem!',
  path: ['new_password_confirmation'],
});