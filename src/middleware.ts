import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for the admin dashboard
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // If the user is not authenticated or doesn't have a valid role, redirect to login
        if (!token) {
            const url = new URL('/admin/login', request.url);
            url.searchParams.set('callbackUrl', encodeURI(pathname));
            return NextResponse.redirect(url);
        }

        // If user doesn't have admin role, redirect to unauthorized page
        if (token.role !== 'admin' && token.role !== 'editor' && token.role !== 'viewer') {
            return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
        }
    }

    // For the application tracking page
    if (pathname.startsWith('/track') && pathname !== '/track') {
        // Allow access to the tracking page with a valid application ID
        // This is handled in the page itself with OTP verification
    }

    return NextResponse.next();
}

// Only run middleware on matching paths
export const config = {
    matcher: ['/admin/:path*', '/track/:path*'],
};