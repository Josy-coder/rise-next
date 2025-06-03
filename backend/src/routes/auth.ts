import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { authController } from '../controllers/auth.controller'
import type { Bindings } from '../index'

const auth = new OpenAPIHono<{ Bindings: Bindings }>()

// Login route
const loginRoute = createRoute({
    method: 'post',
    path: '/login',
    tags: ['Authentication'],
    summary: 'Admin login',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        email: z.string().email().openapi({ example: 'admin@nonprofit.org' }),
                        password: z.string().min(6).openapi({ example: 'password123' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        token: z.string(),
                        admin: z.object({
                            id: z.number(),
                            email: z.string(),
                            name: z.string(),
                            role: z.enum(['super_admin', 'admin', 'editor']),
                        }),
                    }),
                },
            },
            description: 'Login successful',
        },
        401: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Invalid credentials',
        },
    },
})

// Register with invite code route
const registerRoute = createRoute({
    method: 'post',
    path: '/register',
    tags: ['Authentication'],
    summary: 'Register new admin with invite code',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        code: z.string().openapi({ example: 'ABC123XYZ' }),
                        name: z.string().min(2).openapi({ example: 'John Doe' }),
                        email: z.string().email().openapi({ example: 'john@nonprofit.org' }),
                        password: z.string().min(6).openapi({ example: 'securepassword' }),
                    }),
                },
            },
        },
    },
    responses: {
        201: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                        admin: z.object({
                            id: z.number(),
                            email: z.string(),
                            name: z.string(),
                            role: z.enum(['admin', 'editor']),
                        }),
                    }),
                },
            },
            description: 'Registration successful',
        },
        400: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Invalid invite code or registration data',
        },
    },
})

// Validate invite code route
const validateInviteRoute = createRoute({
    method: 'get',
    path: '/validate-invite/{code}',
    tags: ['Authentication'],
    summary: 'Validate invite code',
    request: {
        params: z.object({
            code: z.string(),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        valid: z.boolean(),
                        role: z.enum(['admin', 'editor']).optional(),
                        email: z.string().optional(),
                    }),
                },
            },
            description: 'Invite code validation result',
        },
    },
})

// Me route (get current admin info)
const meRoute = createRoute({
    method: 'get',
    path: '/me',
    tags: ['Authentication'],
    summary: 'Get current admin info',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        admin: z.object({
                            id: z.number(),
                            email: z.string(),
                            name: z.string(),
                            role: z.enum(['super_admin', 'admin', 'editor']),
                            createdAt: z.string(),
                        }),
                    }),
                },
            },
            description: 'Current admin info',
        },
        401: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Unauthorized',
        },
    },
})

// Request password reset route
const requestPasswordResetRoute = createRoute({
    method: 'post',
    path: '/request-reset',
    tags: ['Authentication'],
    summary: 'Request password reset',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        email: z.string().email().openapi({ example: 'admin@nonprofit.org' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
            description: 'Reset request processed',
        },
    },
})

// Reset password route
const resetPasswordRoute = createRoute({
    method: 'post',
    path: '/reset-password',
    tags: ['Authentication'],
    summary: 'Reset password with token',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        token: z.string().openapi({ example: 'reset-token-uuid' }),
                        newPassword: z.string().min(6).openapi({ example: 'newpassword123' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
            description: 'Password reset successful',
        },
        400: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Invalid or expired token',
        },
    },
})

// Update profile route
const updateProfileRoute = createRoute({
    method: 'put',
    path: '/profile',
    tags: ['Authentication'],
    summary: 'Update admin profile',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string().min(2).optional(),
                        email: z.string().email().optional(),
                        currentPassword: z.string().optional(),
                        newPassword: z.string().min(6).optional(),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                        admin: z.object({
                            id: z.number(),
                            email: z.string(),
                            name: z.string(),
                            role: z.enum(['super_admin', 'admin', 'editor']),
                        }),
                    }),
                },
            },
            description: 'Profile updated successfully',
        },
        400: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Invalid data or current password incorrect',
        },
        401: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Unauthorized',
        },
    },
})

auth.openapi(loginRoute, authController.login)
auth.openapi(registerRoute, authController.register)
auth.openapi(validateInviteRoute, authController.validateInvite)
auth.openapi(meRoute, authController.me)
auth.openapi(requestPasswordResetRoute, authController.requestPasswordReset)
auth.openapi(resetPasswordRoute, authController.resetPassword)
auth.openapi(updateProfileRoute, authController.updateProfile)

export default auth