import {eq} from "drizzle-orm";

import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { getDb } from '@/db';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';

export default async function handler(req: NextRequest) {
    if (req.method !== 'POST') {
        return new NextResponse(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get the Cloudflare environment
    const env = (req as any).cloudflare;

    if (!env || !env.DB) {
        return new NextResponse(JSON.stringify({ error: 'Cloudflare environment not available' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Get DB client
        const db = getDb(env);

        // Parse request body
        const { email, password, name } = await req.json();

        if (email && password) {
            // Check if user already exists
            const existingUser = await db.query.users.findFirst({
                where: eq(schema.users.email, email.toLowerCase()),
            });

            if (!existingUser) {
                // Hash password
                const hashedPassword = await hashPassword(password);

                // Create admin user
                const userId = nanoid();
                await db.insert(schema.users).values({
                    id: userId,
                    name: name || 'Admin User',
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    role: 'admin',
                    emailVerified: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                return new NextResponse(JSON.stringify({
                    success: true,
                    message: 'Admin user created successfully'
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return new NextResponse(JSON.stringify({
            success: true,
            message: 'Database setup completed'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Setup error:', error);
        return new NextResponse(JSON.stringify({
            error: 'Failed to set up database',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}