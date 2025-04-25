export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { up } from '@auth/d1-adapter';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the Cloudflare environment
    const env = (req as any).cloudflare;

    if (!env || !env.DB) {
        return res.status(500).json({ error: 'Cloudflare environment not available' });
    }

    try {
        // Run D1 adapter migrations
        await up(env.DB);

        // Check if an admin user is needed
        const { email, password, name } = req.body;

        if (email && password) {
            // Check if user already exists
            const existingUser = await env.DB
                .prepare('SELECT * FROM users WHERE email = ?')
                .bind(email)
                .first();

            if (!existingUser) {
                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create admin user
                await env.DB
                    .prepare(
                        'INSERT INTO users (id, name, email, password, role, email_verified) VALUES (?, ?, ?, ?, ?, ?)'
                    )
                    .bind(
                        `user_${Date.now()}`,
                        name || 'Admin User',
                        email,
                        hashedPassword,
                        'admin',
                        new Date().toISOString()
                    )
                    .run();

                return res.status(200).json({
                    success: true,
                    message: 'Database migrated and admin user created successfully'
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Database migrated successfully'
        });
    } catch (error) {
        console.error('Migration error:', error);
        return res.status(500).json({
            error: 'Failed to run migrations',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}