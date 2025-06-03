import { Resend } from 'resend'

export class EmailService {
    private resend: Resend
    private fromEmail: string

    constructor(apiKey: string, fromEmail: string = 'noreply@yournonprofit.org') {
        this.resend = new Resend(apiKey)
        this.fromEmail = fromEmail
    }

    async sendPasswordResetEmail(to: string, resetToken: string, frontendUrl: string): Promise<boolean> {
        try {
            const resetUrl = `${frontendUrl}/admin/reset-password?token=${resetToken}`

            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: [to],
                subject: 'Reset Your Password - Nonprofit Platform',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Your Password</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
                .button { display: inline-block; background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { background: #f8f9fa; padding: 15px; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; text-align: center; }
                .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p>We received a request to reset your password for your Nonprofit Platform admin account.</p>
                  <p>Click the button below to reset your password:</p>
                  <a href="${resetUrl}" class="button">Reset Password</a>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
                  <div class="warning">
                    <strong>Important:</strong> This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email.
                  </div>
                  <p>If you continue to have problems, please contact your system administrator.</p>
                </div>
                <div class="footer">
                  <p>This is an automated message from Nonprofit Platform. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            })

            if (error) {
                console.error('Resend error:', error)
                return false
            }

            console.log('Password reset email sent:', data?.id)
            return true
        } catch (error) {
            console.error('Email service error:', error)
            return false
        }
    }

    async sendApplicationTrackingEmail(to: string, trackingToken: string, frontendUrl: string): Promise<boolean> {
        try {
            const trackingUrl = `${frontendUrl}/track?token=${trackingToken}`

            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: [to],
                subject: 'Track Your Application - Nonprofit Platform',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Track Your Application</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
                .button { display: inline-block; background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { background: #f8f9fa; padding: 15px; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Application Tracking Link</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p>You requested to track your application status. Click the button below to view your application:</p>
                  <a href="${trackingUrl}" class="button">Track Application</a>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #28a745;">${trackingUrl}</p>
                  <p>This link will expire in 24 hours for security reasons.</p>
                </div>
                <div class="footer">
                  <p>This is an automated message from Nonprofit Platform. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            })

            if (error) {
                console.error('Resend error:', error)
                return false
            }

            console.log('Tracking email sent:', data?.id)
            return true
        } catch (error) {
            console.error('Email service error:', error)
            return false
        }
    }

    async sendInviteEmail(to: string, inviteCode: string, inviterName: string, frontendUrl: string): Promise<boolean> {
        try {
            const inviteUrl = `${frontendUrl}/admin/register?code=${inviteCode}`

            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: [to],
                subject: 'You\'re Invited to Join Nonprofit Platform',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Join Nonprofit Platform</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
                .button { display: inline-block; background: #6f42c1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .code { background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 18px; text-align: center; margin: 15px 0; }
                .footer { background: #f8f9fa; padding: 15px; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to Nonprofit Platform</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p><strong>${inviterName}</strong> has invited you to join the Nonprofit Platform admin team.</p>
                  <p>Click the button below to create your account:</p>
                  <a href="${inviteUrl}" class="button">Join Now</a>
                  <p>Or use this invite code:</p>
                  <div class="code">${inviteCode}</div>
                  <p>You can also copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #6f42c1;">${inviteUrl}</p>
                  <p><strong>Note:</strong> This invitation will expire in 7 days.</p>
                </div>
                <div class="footer">
                  <p>This is an automated message from Nonprofit Platform. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            })

            if (error) {
                console.error('Resend error:', error)
                return false
            }

            console.log('Invite email sent:', data?.id)
            return true
        } catch (error) {
            console.error('Email service error:', error)
            return false
        }
    }

    async sendApplicationStatusUpdate(
        to: string,
        applicantName: string,
        status: string,
        programOrOpportunityTitle: string,
        frontendUrl: string
    ): Promise<boolean> {
        try {
            const statusMessages = {
                pending: 'We have received your application and it is currently being reviewed.',
                under_review: 'Your application is currently under review by our team.',
                accepted: 'Congratulations! Your application has been accepted.',
                rejected: 'Thank you for your interest. Unfortunately, your application was not selected at this time.',
                waitlisted: 'Your application has been placed on our waitlist. We will contact you if a position becomes available.',
            }

            const statusColors = {
                pending: '#ffc107',
                under_review: '#17a2b8',
                accepted: '#28a745',
                rejected: '#dc3545',
                waitlisted: '#fd7e14',
            }

            const message = statusMessages[status as keyof typeof statusMessages] || 'Your application status has been updated.'
            const color = statusColors[status as keyof typeof statusColors] || '#6c757d'

            const { data, error } = await this.resend.emails.send({
                from: this.fromEmail,
                to: [to],
                subject: `Application Status Update - ${programOrOpportunityTitle}`,
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Application Status Update</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
                .status { background: ${color}; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; }
                .footer { background: #f8f9fa; padding: 15px; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Application Status Update</h1>
                </div>
                <div class="content">
                  <p>Dear ${applicantName},</p>
                  <p>We have an update regarding your application for <strong>${programOrOpportunityTitle}</strong>.</p>
                  <div class="status">
                    <h2>Status: ${status.replace('_', ' ').toUpperCase()}</h2>
                  </div>
                  <p>${message}</p>
                  ${status === 'accepted' ? '<p>We will be in touch soon with next steps.</p>' : ''}
                  ${status === 'rejected' ? '<p>We encourage you to apply for future opportunities that match your interests and qualifications.</p>' : ''}
                  <p>If you have any questions, please don\'t hesitate to contact us.</p>
                  <p>Thank you for your interest in our organization.</p>
                </div>
                <div class="footer">
                  <p>This is an automated message from Nonprofit Platform. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            })

            if (error) {
                console.error('Resend error:', error)
                return false
            }

            console.log('Status update email sent:', data?.id)
            return true
        } catch (error) {
            console.error('Email service error:', error)
            return false
        }
    }
}