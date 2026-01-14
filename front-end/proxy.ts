import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/admin/sign-in', '/sign-up', '/sign-in'];

    if (!publicRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/admin/sign-in', request.url));
    }

    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/agendamentos', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};