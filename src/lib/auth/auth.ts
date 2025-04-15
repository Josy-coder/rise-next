import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '$lib/db';
import { oneTimeToken } from 'better-auth/plugins/one-time-token';
import { openAPI } from 'better-auth/plugins';
import { bearer } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';

// Initialize Better Auth with Drizzle adapter
export function createAuth(platform: App.Platform) {
	const db = getDb(platform);

	return betterAuth({
		// Use Drizzle adapter with our D1 database
		database: drizzleAdapter(db, {
			provider: 'sqlite',
		}),

		// Configure email and password authentication
		emailAndPassword: {
			enabled: true,
			sendResetPassword: async ({ user, url, token }, request) => {
				// In a real application, you would send an email here
				console.log(`Reset password URL for ${user.email}: ${url}`);
			},
		},

		// Enable user management features
		user: {
			deleteUser: {
				enabled: true,
			},
			changeEmail: {
				enabled: true,
				sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
					// In a real application, you would send an email here
					console.log(`Email change verification URL for ${user.email}: ${url}`);
				},
			},
		},

		// Add email verification
		emailVerification: {
			sendVerificationEmail: async ({ user, url, token }, request) => {
				// In a real application, you would send an email here
				console.log(`Email verification URL for ${user.email}: ${url}`);
			},
		},

		// Add plugins
		plugins: [
			// Add Bearer token plugin for API authentication
			bearer(),

			// Add One-Time Token plugin for token-based verification
			oneTimeToken({
				expiresIn: 60, // 60 minutes
			}),

			// Add OpenAPI plugin for API documentation
			openAPI({
				path: '/api/docs', // The path where the OpenAPI reference will be served
			}),
		],

		// Add secret key from environment variables
		secret: env.BETTER_AUTH_SECRET,

		// Base URL for auth operations
		baseURL: env.BETTER_AUTH_URL,

		// App name for various displays
		appName: 'Nonprofit Website',
	});
}

// Export types for TypeScript
export type Auth = ReturnType<typeof createAuth>;