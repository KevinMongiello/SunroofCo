const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response;
}

export async function requestJson<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await request(path, options);
  return response.json();
}

export async function requestText(
  path: string,
  options?: RequestInit,
): Promise<string> {
  const response = await request(path, options);
  return response.text();
}