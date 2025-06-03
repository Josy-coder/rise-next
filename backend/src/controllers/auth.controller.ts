import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq, and } from 'drizzle-orm'
import { sign, verify } from 'hono/jwt'
import { admins, inviteCodes, passwordResetTokens } from '../db/schema'
import { hashPassword, verifyPassword } from '../utils/password'
import { EmailService } from '../services/email.service'
import type { Bindings } from '../index'

type HonoContext = Context<{ Bindings: Bindings }>

export const authController = {
    // Admin login
    login: async (c: HonoContext) => {
        try {
            const { email, password } = await c.req.json()
            const db = drizzle(c.env.DB)

            // Find admin by email
            const admin = await db
                .select()
                .from(admins)
                .where(eq(admins.email, email))
                .get()

            if (!admin || !admin.isActive) {
                return c.json({ error: 'Invalid credentials or account deactivated' }, 401)
            }

            // Verify password using Web Crypto API
            const isValidPassword = await verifyPassword(password, admin.passwordHash)
            if (!isValidPassword) {
                return c.json({ error: 'Invalid credentials' }, 401)
            }

            // Generate JWT token
            const token = await sign(
                {
                    sub: admin.id.toString(),
                    email: admin.email,
                    role: admin.role,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 7 days
                },
                c.env.JWT_SECRET
            )

            return c.json({
                token,
                admin: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                },
            })
        } catch (error) {
            console.error('Login error:', error)
            return c.json({ error: 'Login failed' }, 500)
        }
    },

    // Register with invite code
    register: async (c: HonoContext) => {
        try {
            const { code, name, email, password } = await c.req.json()
            const db = drizzle(c.env.DB)

            // Validate invite code
            const invite = await db
                .select()
                .from(inviteCodes)
                .where(
                    and(
                        eq(inviteCodes.code, code),
                        eq(inviteCodes.isUsed, false)
                    )
                )
                .get()

            if (!invite) {
                return c.json({ error: 'Invalid invite code' }, 400)
            }

            if (invite.expiresAt.getTime() < Date.now()) {
                return c.json({ error: 'Invite code has expired' }, 400)
            }

            // Check if email already exists
            const existingAdmin = await db
                .select()
                .from(admins)
                .where(eq(admins.email, email))
                .get()

            if (existingAdmin) {
                return c.json({ error: 'Email already registered' }, 400)
            }

            // Hash password using Web Crypto API
            const passwordHash = await hashPassword(password)

            // Create new admin
            const newAdmin = await db
                .insert(admins)
                .values({
                    email,
                    name,
                    passwordHash,
                    role: invite.role,
                    isActive: true,
                    invitedBy: invite.createdBy,
                })
                .returning()
                .get()

            // Mark invite as used
            await db
                .update(inviteCodes)
                .set({
                    isUsed: true,
                    usedBy: newAdmin.id,
                })
                .where(eq(inviteCodes.id, invite.id))

            return c.json({
                message: 'Registration successful',
                admin: {
                    id: newAdmin.id,
                    email: newAdmin.email,
                    name: newAdmin.name,
                    role: newAdmin.role,
                },
            }, 201)
        } catch (error) {
            console.error('Registration error:', error)
            return c.json({ error: 'Registration failed' }, 500)
        }
    },

    // Validate invite code
    validateInvite: async (c: HonoContext) => {
        try {
            const { code } = c.req.param()
            const db = drizzle(c.env.DB)

            const invite = await db
                .select({
                    role: inviteCodes.role,
                    email: inviteCodes.email,
                    isUsed: inviteCodes.isUsed,
                    expiresAt: inviteCodes.expiresAt,
                })
                .from(inviteCodes)
                .where(eq(inviteCodes.code, code))
                .get()

            if (!invite || invite.isUsed || invite.expiresAt.getTime() < Date.now()) {
                return c.json({ valid: false })
            }

            return c.json({
                valid: true,
                role: invite.role,
                email: invite.email,
            })
        } catch (error) {
            console.error('Validate invite error:', error)
            return c.json({ valid: false })
        }
    },

    // Get current admin info
    me: async (c: HonoContext) => {
        try {
            // Get admin ID from JWT (set by auth middleware)
            const adminId = c.get('adminId')

            if (!adminId) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const db = drizzle(c.env.DB)

            const admin = await db
                .select({
                    id: admins.id,
                    email: admins.email,
                    name: admins.name,
                    role: admins.role,
                    createdAt: admins.createdAt,
                })
                .from(admins)
                .where(and(
                    eq(admins.id, parseInt(adminId)),
                    eq(admins.isActive, true)
                ))
                .get()

            if (!admin) {
                return c.json({ error: 'Admin not found' }, 404)
            }

            return c.json({
                admin: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                    createdAt: admin.createdAt.toISOString(),
                },
            })
        } catch (error) {
            console.error('Get admin info error:', error)
            return c.json({ error: 'Failed to get admin info' }, 500)
        }
    },

    // Request password reset
    requestPasswordReset: async (c: HonoContext) => {
        try {
            const { email } = await c.req.json()
            const db = drizzle(c.env.DB)

            const admin = await db
                .select({
                    id: admins.id,
                    name: admins.name,
                    email: admins.email,
                    isActive: admins.isActive
                })
                .from(admins)
                .where(eq(admins.email, email))
                .get()

            // Always return success to prevent email enumeration
            const response = { message: 'If email exists, reset link has been sent' }

            if (!admin || !admin.isActive) {
                return c.json(response)
            }

            // Generate reset token
            const resetToken = crypto.randomUUID()
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

            // Store reset token in database
            await db.insert(passwordResetTokens).values({
                token: resetToken,
                adminId: admin.id,
                email: admin.email,
                expiresAt,
            })

            // Send email
            const emailService = new EmailService(c.env.RESEND_API_KEY)
            await emailService.sendPasswordResetEmail(
                admin.email,
                resetToken,
                c.env.FRONTEND_URL
            )

            return c.json(response)
        } catch (error) {
            console.error('Password reset request error:', error)
            return c.json({ error: 'Failed to process request' }, 500)
        }
    },

    // Reset password with token
    resetPassword: async (c: HonoContext) => {
        try {
            const { token, newPassword } = await c.req.json()
            const db = drizzle(c.env.DB)

            // Find and validate reset token
            const resetToken = await db
                .select()
                .from(passwordResetTokens)
                .where(
                    and(
                        eq(passwordResetTokens.token, token),
                        eq(passwordResetTokens.isUsed, false)
                    )
                )
                .get()

            if (!resetToken) {
                return c.json({ error: 'Invalid or expired reset token' }, 400)
            }

            if (resetToken.expiresAt.getTime() < Date.now()) {
                return c.json({ error: 'Reset token has expired' }, 400)
            }

            // Hash new password
            const passwordHash = await hashPassword(newPassword)

            // Update admin password
            await db
                .update(admins)
                .set({
                    passwordHash,
                    updatedAt: new Date()
                })
                .where(eq(admins.id, resetToken.adminId))

            // Mark token as used
            await db
                .update(passwordResetTokens)
                .set({ isUsed: true })
                .where(eq(passwordResetTokens.id, resetToken.id))

            return c.json({ message: 'Password reset successful' })
        } catch (error) {
            console.error('Password reset error:', error)
            return c.json({ error: 'Failed to reset password' }, 500)
        }
    },

    // Update profile
    updateProfile: async (c: HonoContext) => {
        try {
            const adminId = c.get('adminId')
            const { name, email, currentPassword, newPassword } = await c.req.json()

            if (!adminId) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const db = drizzle(c.env.DB)

            const admin = await db
                .select()
                .from(admins)
                .where(eq(admins.id, parseInt(adminId)))
                .get()

            if (!admin) {
                return c.json({ error: 'Admin not found' }, 404)
            }

            // Check if email is being changed and if it's already taken
            if (email && email !== admin.email) {
                const existingAdmin = await db
                    .select({ id: admins.id })
                    .from(admins)
                    .where(eq(admins.email, email))
                    .get()

                if (existingAdmin) {
                    return c.json({ error: 'Email already in use' }, 400)
                }
            }

            // If changing password, verify current password
            let passwordHash = admin.passwordHash
            if (newPassword) {
                if (!currentPassword) {
                    return c.json({ error: 'Current password required to change password' }, 400)
                }

                const isValidCurrentPassword = await verifyPassword(currentPassword, admin.passwordHash)
                if (!isValidCurrentPassword) {
                    return c.json({ error: 'Current password is incorrect' }, 400)
                }

                passwordHash = await hashPassword(newPassword)
            }

            // Update admin
            const updatedAdmin = await db
                .update(admins)
                .set({
                    name: name || admin.name,
                    email: email || admin.email,
                    passwordHash,
                    updatedAt: new Date(),
                })
                .where(eq(admins.id, parseInt(adminId)))
                .returning({
                    id: admins.id,
                    email: admins.email,
                    name: admins.name,
                    role: admins.role,
                })
                .get()

            return c.json({
                message: 'Profile updated successfully',
                admin: updatedAdmin,
            })
        } catch (error) {
            console.error('Update profile error:', error)
            return c.json({ error: 'Failed to update profile' }, 500)
        }
    },
}