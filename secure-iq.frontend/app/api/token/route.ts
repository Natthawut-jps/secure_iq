import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('_ssid')?.value

  const res = await fetch(`${process.env.API_URL}/api/v1/posts`, {
    headers: {
      Cookie: `_ssid=${token}`,
    },
  })

  return NextResponse.json(await res.json())
}