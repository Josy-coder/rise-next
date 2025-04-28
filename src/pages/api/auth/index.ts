import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient } from '@/lib/cloudflare';
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { action } = req.body;
        const env = getCloudflareEnv(req);

        if (!env) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const db = getDbClient(env);

        switch (action) {
            case 'login':
                return handleLogin(req, res, db);
            case 'register':
                return handleRegister(req, res, db);
            case 'logout':
                return handleLogout(req, res, db);
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            error: 'Authentication failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

async function handleLogin(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email.toLowerCase()),
    });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });

    // Return user data and token (without sensitive information)
    return res.status(200).json({
        success: true,
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    });
}

async function handleRegister(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { name, email, password, inviteCode } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // For the nonprofit admin system, we should only allow registration with invite codes
    // or restrict initial registrations to be manually approved
    if (!inviteCode) {
        return res.status(403).json({
            error: 'Registration requires an invite code'
        });
    }

    // Check if invite code is valid (implement your invite code logic here)
    // For now, let's use a simple environment variable as the admin invite code
    const isValidInviteCode = inviteCode === process.env.ADMIN_INVITE_CODE;
    if (!isValidInviteCode) {
        return res.status(403).json({ error: 'Invalid invite code' });
    }

    try {
        // Check if email already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(schema.users.email, email.toLowerCase()),
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user (first user gets admin role, others get viewer by default)
        const userCount = await db.select({ count: db.fn.count() }).from(schema.users);
        const isFirstUser = userCount[0].count === 0;

        const userId = nanoid();
        await db.insert(schema.users).values({
            id: userId,
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: isFirstUser ? 'admin' : 'viewer',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Get the newly created user
        const newUser = await db.query.users.findFirst({
            where: eq(schema.users.id, userId),
        });

        // Generate JWT token
        const token = await generateToken({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        });

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: userId,
                email,
                name,
                role: isFirstUser ? 'admin' : 'viewer'
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            error: 'Registration failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

async function handleLogout(req: NextApiRequest, res: NextApiResponse, db: any) {
    // With JWT, we don't need to do anything server-side for logout
    // The client will simply delete the token
    console.log("database connected", db)

    return res.status(200).json({ success: true });
}