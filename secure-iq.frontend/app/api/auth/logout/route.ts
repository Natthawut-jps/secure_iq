import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.set('_ssid', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,  
  })
  return response
}