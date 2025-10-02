import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // In a real application, you would check cookies or session tokens here
    // For this demo, we're using client-side localStorage check
    // The actual protection happens on the client side in the dashboard page
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
