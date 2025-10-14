export * from '@api/project';
export * from '@api/task';
export * from '@api/user';

async function request<T>(
  url: string,
  { method = 'GET', headers, body, ...rest }: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
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
  post: <T>(url: string, body: BodyInit | null | undefined, options?: RequestInit) => request<T>(url, { ...options, method: 'POST', body }),
  put: <T>(url: string, body: BodyInit | null | undefined, options?: RequestInit) => request<T>(url, { ...options, method: 'PUT', body }),
  patch: <T>(url: string, body: BodyInit | null | undefined, options?: RequestInit) => request<T>(url, { ...options, method: 'PATCH', body }),
  delete: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'DELETE' }),
}