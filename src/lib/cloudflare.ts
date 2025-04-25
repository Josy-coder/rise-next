/**
 * This file contains utilities for working with Cloudflare-specific features
 * in the context of a Next.js application.
 */

import { drizzle } from 'drizzle-orm/d1';
import { up } from '@auth/d1-adapter';
import * as schema from '@/db/schema';

// Type for Cloudflare bindings (injected by the Cloudflare worker runtime)
interface CloudflareEnv {
    DB: D1Database;
    R2_BUCKET: R2Bucket;
    KV: KVNamespace;
}

// Function to get the Cloudflare context from a Next.js API request
export function getCloudflareEnv(req: any): CloudflareEnv | null {
    // In Cloudflare Pages integration with Next.js, the Cloudflare bindings
    // are attached to the request object
    return req.cloudflare || null;
}

// Get a Drizzle-wrapped D1 client
export function getDbClient(env: CloudflareEnv) {
    if (!env || !env.DB) {
        throw new Error('Cloudflare D1 database binding not available');
    }

    return drizzle(env.DB, { schema });
}

// Get an R2 client
export function getR2Client(env: CloudflareEnv) {
    if (!env || !env.R2_BUCKET) {
        throw new Error('Cloudflare R2 bucket binding not available');
    }

    return env.R2_BUCKET;
}

// Get a KV client
export function getKvClient(env: CloudflareEnv) {
    if (!env || !env.KV) {
        throw new Error('Cloudflare KV namespace binding not available');
    }

    return env.KV;
}

// Initialize database (create tables if they don't exist)
export async function initializeDatabase(env: CloudflareEnv) {
    if (!env || !env.DB) {
        throw new Error('Cloudflare D1 database binding not available');
    }

    try {
        // Run auth.js D1 adapter migrations to create authentication tables
        await up(env.DB);
        return { success: true };
    } catch (error) {
        console.error('Database initialization error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

// Generate a unique public URL for an R2 object
export function getR2PublicUrl(key: string): string {
    const baseUrl = process.env.R2_PUBLIC_URL || '';
    if (!baseUrl) {
        throw new Error('R2_PUBLIC_URL environment variable is not set');
    }

    // Ensure the key is properly URL encoded
    const encodedKey = encodeURIComponent(key);
    return `${baseUrl}/${encodedKey}`;
}

// Helper function to generate an object key for R2 storage
export function generateR2Key(prefix: string, fileName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    return `${prefix}/${timestamp}_${randomString}_${sanitizedFileName}`;
}

// Helper to handle R2 file uploads
export async function uploadToR2(
    env: CloudflareEnv,
    file: File | Blob,
    prefix: string = 'uploads'
): Promise<{ success: boolean; key?: string; url?: string; error?: string }> {
    try {
        if (!env || !env.R2_BUCKET) {
            throw new Error('Cloudflare R2 bucket binding not available');
        }

        // Create a unique key for the file
        const fileName = 'name' in file ? file.name : 'unnamed-file';
        const key = generateR2Key(prefix, fileName);

        // Determine content type
        const contentType = file.type || 'application/octet-stream';

        // Upload to R2
        await env.R2_BUCKET.put(key, file, {
            httpMetadata: {
                contentType
            }
        });

        // Generate the public URL
        const url = getR2PublicUrl(key);

        return {
            success: true,
            key,
            url
        };
    } catch (error) {
        console.error('R2 upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

// Helper to delete a file from R2
export async function deleteFromR2(
    env: CloudflareEnv,
    key: string
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!env || !env.R2_BUCKET) {
            throw new Error('Cloudflare R2 bucket binding not available');
        }

        await env.R2_BUCKET.delete(key);

        return {
            success: true
        };
    } catch (error) {
        console.error('R2 delete error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

// Store a value in KV with optional expiration
export async function storeInKV(
    env: CloudflareEnv,
    key: string,
    value: string,
    expirationTtl?: number
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!env || !env.KV) {
            throw new Error('Cloudflare KV namespace binding not available');
        }

        const options = expirationTtl ? { expirationTtl } : undefined;
        await env.KV.put(key, value, options);

        return {
            success: true
        };
    } catch (error) {
        console.error('KV store error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

// Retrieve a value from KV
export async function getFromKV(
    env: CloudflareEnv,
    key: string
): Promise<{ success: boolean; value?: string; error?: string }> {
    try {
        if (!env || !env.KV) {
            throw new Error('Cloudflare KV namespace binding not available');
        }

        const value = await env.KV.get(key);

        return {
            success: true,
            value: value || undefined
        };
    } catch (error) {
        console.error('KV get error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

// Delete a value from KV
export async function deleteFromKV(
    env: CloudflareEnv,
    key: string
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!env || !env.KV) {
            throw new Error('Cloudflare KV namespace binding not available');
        }

        await env.KV.delete(key);

        return {
            success: true
        };
    } catch (error) {
        console.error('KV delete error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}