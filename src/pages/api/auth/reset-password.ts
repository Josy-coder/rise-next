export const runtime = "experimental-edge";

import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient } from '@/lib/cloudflare';
import { hashPassword } from '@/lib/auth';
import { eq, and, gt } from 'drizzle-orm';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';
import { sendEmail } from '@/lib/email';

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
            case 'request_reset':
                return handleRequestReset(req, res, db);
            case 'verify_token':
                return handleVerifyToken(req, res, db);
            case 'reset_password':
                return handleResetPassword(req, res, db);
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            error: 'Password reset failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Handle request for a password reset
 */
async function handleRequestReset(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Find the user by email
        const user = await db.query.users.findFirst({
            where: eq(schema.users.email, email.toLowerCase()),
        });

        // For security reasons, we don't reveal if the email exists or not
        // We just return success even if the email doesn't exist
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'If this email is registered, a reset link has been sent'
            });
        }

        // Generate a unique token
        const resetToken = nanoid(32);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour expiration

        // Store the token in the verification_tokens table
        await db.insert(schema.verificationTokens).values({
            token: resetToken,
            identifier: email.toLowerCase(),
            expires: expiresAt,
            type: 'password_reset',
        });

        // Generate the reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reset-password?token=${resetToken}`;

        // Send the reset email
        await sendEmail({
            to: email,
            subject: 'Reset Your RiseNext Admin Password',
            text: `
You requested to reset your password for the RiseNext Admin dashboard.

Please click the following link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Reset Your Password</h2>
                    <p>You requested to reset your password for the RiseNext Admin dashboard.</p>
                    
                    <p>Please click the button below to reset your password:</p>
                    
                    <div style="margin: 25px 0;">
                        <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p>Or copy and paste this URL into your browser:</p>
                    <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
                    
                    <p>This link will expire in 1 hour.</p>
                    
                    <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: 'If this email is registered, a reset link has been sent'
        });

    } catch (error) {
        console.error('Error requesting password reset:', error);
        // For security, still return success even if there was an error
        return res.status(200).json({
            success: true,
            message: 'If this email is registered, a reset link has been sent'
        });
    }
}

/**
 * Verify if a reset token is valid
 */
async function handleVerifyToken(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Check if the token exists and is not expired
        const verificationToken = await db.query.verificationTokens.findFirst({
            where: and(
                eq(schema.verificationTokens.token, token),
                eq(schema.verificationTokens.type, 'password_reset'),
                gt(schema.verificationTokens.expires, new Date().getTime())
            ),
        });

        if (!verificationToken) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        return res.status(200).json({ valid: true });

    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({
            error: 'Failed to verify token',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Reset the password using a valid token
 */
async function handleResetPassword(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: 'Token and password are required' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special characters'
        });
    }

    try {
        // Start a transaction
        // Note: For Cloudflare D1, transactions might work differently than traditional SQL databases
        // Depending on D1's capabilities, you might need to adjust this logic

        // Find the token and make sure it's not expired
        const verificationToken = await db.query.verificationTokens.findFirst({
            where: and(
                eq(schema.verificationTokens.token, token),
                eq(schema.verificationTokens.type, 'password_reset'),
                gt(schema.verificationTokens.expires, new Date().getTime())
            ),
        });

        if (!verificationToken) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Find the user by email
        const email = verificationToken.identifier;
        const user = await db.query.users.findFirst({
            where: eq(schema.users.email, email),
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(password);

        // Update the user's password
        await db.update(schema.users)
            .set({
                password: hashedPassword,
                updatedAt: new Date()
            })
            .where(eq(schema.users.id, user.id));

        // Delete the used token
        await db.delete(schema.verificationTokens)
            .where(eq(schema.verificationTokens.token, token));

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({
            error: 'Failed to reset password',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}