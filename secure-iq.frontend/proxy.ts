import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// เปลี่ยนแค่ชื่อ function จาก middleware → proxy
export default function proxy(request: NextRequest) {
  const token = request.cookies.get('_ssid')?.value
  const { pathname } = request.nextUrl

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard/posts', request.url))
  }

  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
}