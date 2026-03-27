import { cookies } from 'next/headers'

export async function fetchWithAuth(path: string, options?: RequestInit) {
  const token = (await cookies()).get('_ssid')?.value

  return fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: `_ssid=${token}`,
    },
  })
}