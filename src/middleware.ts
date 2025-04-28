import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Define public routes that don't require authentication
const publicPaths = [
    '/',
    '/about',
    '/contact',
    '/donate',
    '/programs',
    '/opportunities',
    '/blog',
    '/apply',
    '/track',
    '/api/public/',
    '/admin/login',
    '/admin/register',
    '/admin/forgot-password',
    '/admin/reset-password'
];

// Define routes that require admin access
const adminPaths = [
    '/admin/dashboard',
    '/admin/posts',
    '/admin/programs',
    '/admin/opportunities',
    '/admin/applications',
    '/admin/forms',
    '/admin/applicants',
    '/admin/media',
    '/admin/users'
];

// Define routes that require editor access
const editorPaths = [
    '/admin/editor'
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is public
    if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
        return NextResponse.next();
    }

    // For API routes, apply JWT auth check
    if (pathname.startsWith('/api/')) {
        // Public API endpoints don't need auth
        if (pathname.startsWith('/api/public/')) {
            return NextResponse.next();
        }

        // Get token from query parameter
        const url = new URL(request.url);
        const token = url.searchParams.get('token');

        if (!token) {
            return new NextResponse(JSON.stringify({ error: 'No authentication token provided' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return new NextResponse(JSON.stringify({ error: 'Invalid or expired token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Admin API endpoints need admin role
        if (pathname.startsWith('/api/admin/')) {
            if (payload.role !== 'admin') {
                return new NextResponse(JSON.stringify({ error: 'Admin role required' }), {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return NextResponse.next();
    }

    // For admin and editor routes, we'll redirect to login
    // The actual auth check will happen client-side in the components
    if (adminPaths.some(path => pathname === path || pathname.startsWith(`${path}/`)) ||
        editorPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
        // Just redirecting to login if not authenticated will be handled client-side
        return NextResponse.next();
    }

    // Default behavior: allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except _next, static files, and api routes handled separately
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
};