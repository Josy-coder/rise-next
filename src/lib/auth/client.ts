import { createAuthClient } from 'better-auth/svelte';
import { oneTimeTokenClient } from 'better-auth/client/plugins';
import { browser } from '$app/environment';

// Create the auth client with necessary plugins
export const authClient = createAuthClient({
	// Base URL defaults to the current origin in the browser,
	// or the BETTER_AUTH_URL environment variable on the server
	baseURL: browser ? undefined : process.env.BETTER_AUTH_URL,

	plugins: [
		oneTimeTokenClient(),
	],

	// Set fetch options
	fetchOptions: {
		// Handle errors globally
		onError: async (context) => {
			const { error } = context;
			console.error('Auth error:', error);
		},
		// Store Bearer token when received
		onSuccess: (ctx) => {
			const authToken = ctx.response.headers.get("set-auth-token");
			if (authToken && browser) {
				localStorage.setItem("bearer_token", authToken);
			}
		},
		// Bearer token to API requests
		auth: {
			type: "Bearer",
			token: () => browser ? localStorage.getItem("bearer_token") || "" : ""
		}
	},
});


export const {
	signIn,
	signUp,
	signOut,
	useSession,
	getSession,
	oneTimeToken,
} = authClient;