import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const userData = request.cookies.get('userData')?.value;

    const { pathname } = request.nextUrl;

    const publicRoutes = ['/admin/sign-in', '/sign-up', '/sign-in'];

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    if (token && validateUserRole(userData, pathname)) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(pathname.startsWith('/admin') ? '/admin/sign-in' : '/sign-in', request.url));
}

function validateUserRole(userData: string | undefined, pathname: string) {
    const user = JSON.parse(userData || '{}');

    if (pathname.startsWith('/admin')) {
        return user.role === 'ADMIN';
    }

    return user.role === 'CLIENT';


}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};