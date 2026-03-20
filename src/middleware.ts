import { NextRequest, NextResponse } from 'next/server'
import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export function middleware(request: NextRequest) {
	const { cookies, nextUrl, url } = request

	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthenticated = Boolean(accessToken || refreshToken)

	const isAuthPage = nextUrl.pathname.startsWith('/auth')

	if (isAuthPage && isAuthenticated) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	if (!isAuthPage && !isAuthenticated) {
		return NextResponse.redirect(new URL('/auth', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/i/:path*', '/auth/:path*']
}
