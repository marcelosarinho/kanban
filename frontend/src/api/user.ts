import type { User } from "@custom-types/user";

export async function createUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  const response = await fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}

export async function forgotPassword(email: Pick<User, 'email'>) {
  const response = await fetch('http://localhost:8080/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}