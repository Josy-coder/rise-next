import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// Type for Cloudflare environment bindings
export interface Env {
    DB: D1Database;
    R2_BUCKET: R2Bucket;
    KV: KVNamespace;
}

// Get the D1 client for API routes
export const getDb = (env: Env) => {
    return drizzle(env.DB, { schema });
};

// Helper to generate unique IDs
export const generateId = (prefix: string = '') => {
    return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
};

// Create slug from title
export const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Export the schema for convenience
export { schema };