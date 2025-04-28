import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient } from '@/lib/cloudflare';
import { hasRole } from '@/lib/auth';
import { eq, like } from 'drizzle-orm';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';
import { hashPassword } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

/**
 * API handler for user management (admin only)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Get Cloudflare environment
        const env = getCloudflareEnv(req);
        if (!env) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Check if user has admin role
        const isAdmin = await hasRole('admin', req as any);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Unauthorized: Admin role required' });
        }

        // Get database client
        const db = getDbClient(env);

        // Handle different HTTP methods
        switch (req.method) {
            case 'GET':
                return handleGetUsers(req, res, db);
            case 'POST':
                return handleCreateUser(req, res, db);
            case 'PUT':
                return handleUpdateUser(req, res, db);
            case 'DELETE':
                return handleDeleteUser(req, res, db);
            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('User management API error:', error);
        return res.status(500).json({
            error: 'Request failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Handle GET request to list/search users
 */
async function handleGetUsers(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { search, page = '1', limit = '10', role } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    // Build query
    let query = db.select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        createdAt: schema.users.createdAt,
    }).from(schema.users);

    // Apply filters
    if (search) {
        const searchTerm = `%${search}%`;
        query = query.where(
            like(schema.users.email, searchTerm)
        );
    }

    if (typeof role === 'string' && ['admin', 'editor', 'viewer'].includes(role)) {
        query = query.where(eq(schema.users.role, role as 'admin' | 'editor' | 'viewer'));
    }

    // Add pagination
    query = query.limit(limitNumber).offset(offset).orderBy(schema.users.createdAt);

    // Execute query
    const users = await query;

    // Get total count for pagination
    const countResult = await db.select({ count: db.fn.count() }).from(schema.users);
    const totalUsers = countResult[0].count;

    return res.status(200).json({
        users,
        pagination: {
            total: totalUsers,
            pages: Math.ceil(totalUsers / limitNumber),
            page: pageNumber,
            limit: limitNumber
        }
    });
}

/**
 * Handle POST request to create a new user
 */
async function handleCreateUser(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { name, email, role, sendInvite } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate role
    if (role && !['admin', 'editor', 'viewer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        // Check if email exists
        const existingUser = await db.select().from(schema.users).where(eq(schema.users.email, email.toLowerCase())).limit(1);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Generate random password if sending invite
        const tempPassword = sendInvite ? generateRandomPassword() : null;

        // Create the user
        const userId = nanoid();

        // Hash password if sending invite
        const hashedPassword = tempPassword ? await hashPassword(tempPassword) : null;

        await db.insert(schema.users).values({
            id: userId,
            name: name || null,
            email: email.toLowerCase(),
            password: hashedPassword || '', // Will be set later if not sending invite
            role: role || 'viewer',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Send invite email if requested
        if (sendInvite && tempPassword) {
            const resetToken = nanoid(32);
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

            // Store reset token
            await db.insert(schema.verificationTokens).values({
                token: resetToken,
                identifier: email.toLowerCase(),
                expires: expiresAt,
                type: 'password_reset',
            });

            // Generate reset link
            const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reset-password?token=${resetToken}`;

            // Send email with temporary password and reset link
            await sendEmail({
                to: email,
                subject: 'Invitation to RiseNext Admin Dashboard',
                text: `
You have been invited to join the RiseNext Admin Dashboard.

Your temporary login details:
Email: ${email}
Password: ${tempPassword}

Please use these credentials to log in, and then set a new password.

You can also set your password directly using this link:
${resetLink}

This link will expire in 24 hours.
                `,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Welcome to RiseNext Admin Dashboard</h2>
                        <p>You have been invited to join the RiseNext Admin Dashboard with the role: <strong>${role || 'Viewer'}</strong>.</p>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #F3F4F6; border-radius: 4px;">
                            <p><strong>Your temporary login details:</strong></p>
                            <p>Email: ${email}</p>
                            <p>Password: <code>${tempPassword}</code></p>
                        </div>
                        
                        <p>Please use these credentials to log in, and then set a new password.</p>
                        
                        <p>You can also set your password directly using the button below:</p>
                        <div style="margin: 20px 0;">
                            <a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                                Set Password
                            </a>
                        </div>
                        
                        <p style="color: #6B7280; font-size: 14px;">This link will expire in 24 hours.</p>
                    </div>
                `
            });
        }

        return res.status(201).json({
            success: true,
            user: {
                id: userId,
                name,
                email,
                role: role || 'viewer',
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            error: 'Failed to create user',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Handle PUT request to update a user
 */
async function handleUpdateUser(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { id, name, role } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Validate role
    if (role && !['admin', 'editor', 'viewer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        // Check if user exists
        const existingUser = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prepare update data
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (name !== undefined) {
            updateData.name = name;
        }

        if (role !== undefined) {
            updateData.role = role;
        }

        // Update the user
        await db.update(schema.users)
            .set(updateData)
            .where(eq(schema.users.id, id));

        return res.status(200).json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            error: 'Failed to update user',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Handle DELETE request to delete a user
 */
async function handleDeleteUser(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Check if user exists
        const existingUser = await db.select().from(schema.users).where(eq(schema.users.id, id as string)).limit(1);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete associated sessions
        await db.delete(schema.sessions).where(eq(schema.sessions.userId, id as string));

        // Delete associated webAuthn credentials if they exist
        try {
            await db.delete(schema.webAuthnCredentials).where(eq(schema.webAuthnCredentials.userId, id as string));
        } catch (error) {
            // Ignore if table doesn't exist yet
            console.warn('WebAuthn table may not exist:', error);
        }

        // Delete the user
        await db.delete(schema.users).where(eq(schema.users.id, id as string));

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            error: 'Failed to delete user',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Generate a random password for new users
 */
function generateRandomPassword(length = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';

    // Ensure at least one character from each category
    const lowercaseMatch = charset.match(/[a-z]/);
    if (lowercaseMatch) password += lowercaseMatch[0]; // lowercase
    const uppercaseMatch = charset.match(/[A-Z]/);
    if (uppercaseMatch) password +=uppercaseMatch[0] // uppercase
    const number = charset.match(/[0-9]/)
    if (number) password += number[0]; // number
    const special = charset.match(/[!@#$%^&*()_+]/)
    if (special) password += special[0]; // special

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}