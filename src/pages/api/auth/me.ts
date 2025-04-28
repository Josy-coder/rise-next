export const runtime = 'experimental-edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient } from '@/lib/cloudflare';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import * as schema from '@/db/schema';

/**
 * API endpoint to get the current authenticated user
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get Cloudflare environment
        const env = getCloudflareEnv(req);
        if (!env) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get token from query parameter
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            return res.status(401).json({ error: 'No authentication token provided' });
        }

        // Verify the token
        const payload = await verifyToken(token);

        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Get the user from database
        const db = getDbClient(env);
        const user = await db.query.users.findFirst({
            where: eq(schema.users.id, payload.sub),
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data (without sensitive information)
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({
            error: 'Failed to fetch user data',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}