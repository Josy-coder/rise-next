export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Get the Cloudflare environment from the request
    const env = (req as any).cloudflare;

    if (!env || !env.DB) {
        return res.status(500).json({ error: 'Cloudflare environment not available' });
    }

    // Pass the environment to auth options
    return await NextAuth(req, res, authOptions(env));
}