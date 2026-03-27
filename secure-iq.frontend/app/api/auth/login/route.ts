// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) return NextResponse.json(data, { status: res.status })

  // set cookie บน frontend domain แทน
  const response = NextResponse.json(data)
  response.cookies.set('_ssid', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',   // ← เปลี่ยนเป็น lax ได้เลย same domain แล้ว
    maxAge: 60 * 60 * 24,
  })

  return response
}