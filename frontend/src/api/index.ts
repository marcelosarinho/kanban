export * from '@api/project';
export * from '@api/task';
export * from '@api/user';

async function request<T>(
  url: string,
  { method = 'GET', headers, body, ...rest }: RequestInit = {}): Promise<T> {
    const response = await fetch(`http://localhost:8080${url}`, {
      method,
      headers: {
        ...(method !== 'DELETE' ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body,
      ...rest,
    })

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message);
    }

    return await response.json() as T;
}

export const api = {
  get: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'DELETE' }),
}