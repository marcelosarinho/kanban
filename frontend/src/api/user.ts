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

export async function login(user: Pick<User, 'email' | 'password'>) {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-For': '203.0.113.42'
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

export async function verifyResetPassword(token: string, email: string) {
  const response = await fetch(`http://localhost:8080/verify-reset-password?token=${token}&email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();

    return { valid: false, message: error.message };
  }

  return { valid: true, message: 'Token válido!' };
}

export async function resetPassword(token: string | null = null, email: string | null = null, password: string) {
  const response = await fetch(`http://localhost:8080/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, email, password })
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}

export async function verifyDevice(code: string, email: string) {
  const response = await fetch(`http://localhost:8080/verify-device`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, email })
  })

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}