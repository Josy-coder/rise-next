import { NextResponse } from 'next/server';
import { getDb, Env } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import jwt from '@tsndr/cloudflare-worker-jwt';

// Types
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
    id: string;
    email: string;
    name: string | null;
    image?: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface JwtPayload {
    sub: string;        // User ID
    email: string;      // User email
    name?: string;      // User name (optional)
    role: UserRole;     // User role
    iat: number;        // Issued at
    exp: number;        // Expiration time
}

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-for-development-only';
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Hash a password with a random salt using scrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey(
        'raw',
        data,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const derivedBits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        key,
        256
    );
    return `${Buffer.from(salt).toString('base64')}.${Buffer.from(derivedBits).toString('base64')}`;
}

/**
 * Verify a password against a stored hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [saltStr, hashStr] = storedHash.split('.');
    const salt = Buffer.from(saltStr, 'base64');
    const storedKey = Buffer.from(hashStr, 'base64');

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const key = await crypto.subtle.importKey(
        'raw',
        data,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const derivedBits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        key,
        256
    );

    if (derivedBits.byteLength !== storedKey.byteLength) {
        return false;
    }
    const derivedView = new Uint8Array(derivedBits);
    const storedView = new Uint8Array(storedKey);
    let isEqual = true;
    for (let i = 0; i < derivedView.length; i++) {
        isEqual = isEqual && derivedView[i] === storedView[i];
    }
    return isEqual;
}

/**
 * Generate a JWT for a user
 */
export async function generateToken(user: User): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
        iat: now,
        exp: now + SESSION_DURATION
    };
    return jwt.sign(payload, JWT_SECRET);
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
    try {
        const result = await jwt.verify(token, JWT_SECRET);
        return result ? result.payload as JwtPayload : null;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

/**
 * Get the current user from a token
 */
export async function getUserFromToken(token: string, env?: Env): Promise<User | null> {
    const payload = await verifyToken(token);
    if (!payload) return null;

    const db = getDb(env || 'defaultEnvValue' as unknown as Env);
    const user = await db.query.users.findFirst({
        where: eq(schema.users.id, payload.sub),
    });

    if (!user) return null;

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

/**
 * Get user by ID
 */
export async function getUserById(id: string, env?: Env): Promise<User | null> {
    const db = getDb(env || 'defaultEnvValue' as unknown as Env);
    const user = await db.query.users.findFirst({
        where: eq(schema.users.id, id),
    });

    if (!user) return null;

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

/**
 * Check if a user has a specific role based on their token
 */
export async function hasRole(requiredRole: UserRole, token: string): Promise<boolean> {
    const payload = await verifyToken(token);
    if (!payload) return false;

    const userRole = payload.role;

    if (requiredRole === 'admin') {
        return userRole === 'admin';
    } else if (requiredRole === 'editor') {
        return userRole === 'admin' || userRole === 'editor';
    } else if (requiredRole === 'viewer') {
        return userRole === 'admin' || userRole === 'editor' || userRole === 'viewer';
    }

    return false;
}

/**
 * Helper to create a response with authentication error
 */
export function createAuthError(redirectTo = '/admin/login'): NextResponse {
    return NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
        status: 302,
    });
}

/**
 * WebAuthn (FIDO2) functionality for passwordless 2FA
 */
export const webauthn = {
    // Implementation can be added here if needed
};
