import type { User } from "../types/user";

export async function createUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao cadastrar usuário!', error);
  }
}