import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define email sending options
interface EmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
    replyTo?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer | string;
    }>;
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const { to, subject, text, html, from, replyTo, attachments } = options;

        // Use default from address if not provided
        const fromAddress = from || process.env.EMAIL_FROM || 'noreply@your-nonprofit-domain.org';

        // Send the email
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to: Array.isArray(to) ? to : [to],
            subject,
            text: text || '',
            html,
            replyTo: replyTo,
            attachments
        });

        if (error) {
            console.error('Resend API error:', error);
            return {
                success: false,
                error: error.message
            };
        }

        return {
            success: true,
            id: data?.id
        };
    } catch (error) {
        console.error('Email sending error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error sending email'
        };
    }
}

/**
 * Send a verification code email
 */
export async function sendVerificationCode(email: string, code: string, expiresInMinutes: number = 15): Promise<{ success: boolean; error?: string }> {
    return sendEmail({
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}\n\nThis code will expire in ${expiresInMinutes} minutes.`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Your Verification Code</h2>
                <p>Use the following code to verify your identity:</p>
                <div style="padding: 10px; background-color: #f4f4f4; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
                    ${code}
                </div>
                <p>This code will expire in ${expiresInMinutes} minutes.</p>
            </div>
        `
    });
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<{ success: boolean; error?: string }> {
    return sendEmail({
        to: email,
        subject: 'Password Reset Request',
        text: `You requested to reset your password. Please click the following link to reset your password:\n\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request a password reset, please ignore this email.`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Password Reset Request</h2>
                <p>You requested to reset your password. Please click the button below to reset your password:</p>
                <div style="margin: 20px 0;">
                    <a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
                <p>This link will expire in 1 hour.</p>
                <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
            </div>
        `
    });
}

/**
 * Send an application confirmation email
 */
export async function sendApplicationConfirmationEmail(
    email: string,
    applicantName: string,
    opportunityTitle: string,
    trackingLink: string
): Promise<{ success: boolean; error?: string }> {
    return sendEmail({
        to: email,
        subject: `Application Received: ${opportunityTitle}`,
        text: `
Dear ${applicantName},

Thank you for your application to ${opportunityTitle}. We have received your submission and it is currently being reviewed.

You can track the status of your application using the following link:
${trackingLink}

We will notify you of any updates to your application status.

Best regards,
The RiseNext Team
        `,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Application Received</h2>
                <p>Dear ${applicantName},</p>
                <p>Thank you for your application to <strong>${opportunityTitle}</strong>. We have received your submission and it is currently being reviewed.</p>
                <p>You can track the status of your application using the button below:</p>
                <div style="margin: 20px 0;">
                    <a href="${trackingLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                        Track Your Application
                    </a>
                </div>
                <p>We will notify you of any updates to your application status.</p>
                <p>Best regards,<br>The RiseNext Team</p>
            </div>
        `
    });
}

/**
 * Send an application status update email
 */
export async function sendApplicationStatusEmail(
    email: string,
    applicantName: string,
    opportunityTitle: string,
    status: 'accepted' | 'rejected' | 'under_review' | 'waitlisted',
    trackingLink: string,
    message?: string
): Promise<{ success: boolean; error?: string }> {
    let statusText: string;
    let statusColor: string;

    switch (status) {
        case 'accepted':
            statusText = 'Accepted';
            statusColor = '#22C55E'; // green
            break;
        case 'rejected':
            statusText = 'Not Selected';
            statusColor = '#EF4444'; // red
            break;
        case 'under_review':
            statusText = 'Under Review';
            statusColor = '#F59E0B'; // amber
            break;
        case 'waitlisted':
            statusText = 'Waitlisted';
            statusColor = '#6B7280'; // gray
            break;
    }

    return sendEmail({
        to: email,
        subject: `Application Status Update: ${opportunityTitle}`,
        text: `
Dear ${applicantName},

There has been an update to your application for ${opportunityTitle}.

Status: ${statusText}

${message ? `Message: ${message}\n\n` : ''}

You can view more details about your application here:
${trackingLink}

Best regards,
The RiseNext Team
        `,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Application Status Update</h2>
                <p>Dear ${applicantName},</p>
                <p>There has been an update to your application for <strong>${opportunityTitle}</strong>.</p>
                
                <div style="margin: 20px 0; padding: 15px; background-color: #F3F4F6; border-radius: 4px;">
                    <p style="margin: 0; font-size: 18px;">Status: <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
                </div>
                
                ${message ? `<div style="margin: 20px 0;"><p><strong>Message:</strong> ${message}</p></div>` : ''}
                
                <p>You can view more details about your application using the button below:</p>
                <div style="margin: 20px 0;">
                    <a href="${trackingLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                        View Application Details
                    </a>
                </div>
                
                <p>Best regards,<br>The RiseNext Team</p>
            </div>
        `
    });
}