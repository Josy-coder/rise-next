import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient, getKvClient } from '@/lib/cloudflare';
import { eq } from 'drizzle-orm';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';
import { sendEmail } from '@/lib/email'; // We'll need to implement this with Resend

/**
 * Handles authentication for application tracking
 * Allows applicants to access their application without creating an account
 */
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
        const kv = getKvClient(env);

        switch (action) {
            case 'request_access':
                return handleRequestAccess(req, res, db, kv);
            case 'verify_token':
                return handleVerifyToken(req, res, db, kv);
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Application access error:', error);
        return res.status(500).json({
            error: 'Request failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Handle request for application access
 * Generates a one-time token and sends it to the applicant's email
 */
async function handleRequestAccess(req: NextApiRequest, res: NextApiResponse, db: any, kv: any) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Find applications associated with this email
    const applicant = await db.query.applicants.findFirst({
        where: eq(schema.applicants.email, email.toLowerCase()),
        with: {
            applications: {
                with: {
                    opportunity: true,
                    program: true
                }
            }
        }
    });

    if (!applicant || applicant.applications.length === 0) {
        // Don't reveal if email exists or not for privacy
        return res.status(200).json({
            success: true,
            message: 'If this email has applications, a verification code will be sent.'
        });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the verification token in KV with a 15-minute expiration
    const tokenKey = `application_token:${email.toLowerCase()}`;
    await kv.put(tokenKey, verificationCode, { expirationTtl: 60 * 15 }); // 15 minutes

    // Send the verification code via email
    try {
        await sendEmail({
            to: email,
            subject: 'Your Application Verification Code',
            text: `Your verification code is: ${verificationCode}\n\nThis code will expire in 15 minutes.`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Your Application Verification Code</h2>
                    <p>Use the following code to access your application status:</p>
                    <div style="padding: 10px; background-color: #f4f4f4; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold;">
                        ${verificationCode}
                    </div>
                    <p>This code will expire in 15 minutes.</p>
                </div>
            `
        });
    } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        return res.status(500).json({
            error: 'Failed to send verification email',
            message: 'Please try again later'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Verification code sent to your email'
    });
}

/**
 * Handle verification of the one-time token
 * Returns a temporary JWT token if valid
 */
async function handleVerifyToken(req: NextApiRequest, res: NextApiResponse, db: any, kv: any) {
    const { email, token } = req.body;

    if (!email || !token) {
        return res.status(400).json({ error: 'Email and token are required' });
    }

    // Verify the token from KV
    const tokenKey = `application_token:${email.toLowerCase()}`;
    const storedToken = await kv.get(tokenKey);

    if (!storedToken || storedToken !== token) {
        return res.status(401).json({ error: 'Invalid or expired verification code' });
    }

    // Find the applicant
    const applicant = await db.query.applicants.findFirst({
        where: eq(schema.applicants.email, email.toLowerCase()),
    });

    if (!applicant) {
        return res.status(404).json({ error: 'No applications found for this email' });
    }

    // Generate a temporary access token
    const accessToken = nanoid(32);

    // Store in verification tokens table
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

    await db.insert(schema.verificationTokens).values({
        token: accessToken,
        identifier: email.toLowerCase(),
        expires: expiresAt,
        type: 'application_auth'
    });

    // Delete the verification code from KV since it's been used
    await kv.delete(tokenKey);

    // Set a cookie with the access token
    res.setHeader('Set-Cookie', [
        `application_token=${accessToken}; Path=/; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}Max-Age=${30 * 60}` // 30 minutes
    ]);

    return res.status(200).json({
        success: true,
        applicantId: applicant.id,
        accessToken
    });
}