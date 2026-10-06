import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COMING_SOON_PATH = '/proximamente'

export function proxy(request: NextRequest) {
  if (process.env.COMING_SOON === 'false') {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === COMING_SOON_PATH) {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL(COMING_SOON_PATH, request.url))
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
