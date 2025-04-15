// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('./lib/types/auth').Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}

	// Cloudflare bindings
	interface Env {
		DB: D1Database;
		MEDIA_BUCKET: R2Bucket;
		CACHE: KVNamespace;
	}
}

export {};