import z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório!'),
  email: z.email('Email inválido!'),
  password: z.string().trim().min(8, 'Senha deve ter pelo menos 8 caracteres!'),
});

export const userLoginSchema = userSchema.omit({ name: true});

export const userRegisterSchema = userSchema.extend({
  password_confirmation: z.string()
  .trim()
  .min(8, 'Senha deve ter pelo menos 8 caracteres!')
}).refine((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem!',
  path: ['password_confirmation'],
});

export const userForgotPasswordSchema = userSchema.pick({ email: true });