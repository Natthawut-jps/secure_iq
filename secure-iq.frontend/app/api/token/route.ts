// /app/api/posts/route.ts
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('_ssid')?.value;

  return Response.json({ token });
}