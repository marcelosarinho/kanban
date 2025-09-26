export default async function forgotPasswordMiddleware() {
  const response = await fetch('http://localhost:8080/reset-password', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}