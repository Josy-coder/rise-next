declare global {
    // Cloudflare Workers runtime
    interface D1Database {
        prepare: (query: string) => D1PreparedStatement;
        dump: () => Promise<ArrayBuffer>;
        batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
        exec: (query: string) => Promise<D1Result>;
    }

    interface D1PreparedStatement {
        bind: (...values: any[]) => D1PreparedStatement;
        first: <T = any>(colName?: string) => Promise<T>;
        run: <T = any>() => Promise<D1Result<T>>;
        all: <T = any>() => Promise<D1Result<T>>;
        raw: <T = any>() => Promise<T[]>;
    }

    interface D1Result<T = any> {
        results?: T[];
        success: boolean;
        meta: object;
        error?: string;
    }

    interface R2Bucket {
        head: (key: string) => Promise<R2Object | null>;
        get: (key: string, options?: R2GetOptions) => Promise<R2ObjectBody | null>;
        put: (key: string, value: ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob, options?: R2PutOptions) => Promise<R2Object>;
        delete: (key: string) => Promise<void>;
        list: (options?: R2ListOptions) => Promise<R2Objects>;
    }

    interface R2Object {
        key: string;
        version: string;
        size: number;
        etag: string;
        httpEtag: string;
        checksums: R2Checksums;
        uploaded: Date;
        httpMetadata?: R2HttpMetadata;
        customMetadata?: Record<string, string>;
        range?: R2Range;
    }

    interface R2ObjectBody extends R2Object {
        body: ReadableStream;
        bodyUsed: boolean;
        arrayBuffer: () => Promise<ArrayBuffer>;
        text: () => Promise<string>;
        json: <T>() => Promise<T>;
        blob: () => Promise<Blob>;
    }

    interface R2GetOptions {
        onlyIf?: R2Conditional;
        range?: R2Range;
    }

    interface R2PutOptions {
        httpMetadata?: R2HttpMetadata;
        customMetadata?: Record<string, string>;
        md5?: ArrayBuffer;
        sha1?: ArrayBuffer;
        sha256?: ArrayBuffer;
        sha384?: ArrayBuffer;
        sha512?: ArrayBuffer;
    }

    interface R2Conditional {
        etagMatches?: string;
        etagDoesNotMatch?: string;
        uploadedBefore?: Date;
        uploadedAfter?: Date;
        secondsGranularity?: boolean;
    }

    interface R2Range {
        offset: number;
        length?: number;
        suffix?: number;
    }

    interface R2Checksums {
        md5?: ArrayBuffer;
        sha1?: ArrayBuffer;
        sha256?: ArrayBuffer;
        sha384?: ArrayBuffer;
        sha512?: ArrayBuffer;
    }

    interface R2HttpMetadata {
        contentType: string;
        contentLanguage?: string;
        contentDisposition?: string;
        contentEncoding?: string;
        cacheControl?: string;
        cacheExpiry?: Date;
    }

    interface R2ListOptions {
        limit?: number;
        prefix?: string;
        cursor?: string;
        delimiter?: string;
        startAfter?: string;
        include?: R2ListInclude[];
    }

    interface R2ListInclude {
        httpMetadata: boolean;
        customMetadata: boolean;
    }

    interface R2Objects {
        objects: R2Object[];
        truncated: boolean;
        cursor?: string;
        delimitedPrefixes: string[];
    }

    interface KVNamespace {
        get: (key: string, options?: KVNamespaceGetOptions) => Promise<string | null>;
        getWithMetadata: <Metadata = unknown>(key: string, options?: KVNamespaceGetOptions) => Promise<{ value: string | null; metadata: Metadata | null }>;
        put: (key: string, value: string | ReadableStream | ArrayBuffer, options?: KVNamespacePutOptions) => Promise<void>;
        delete: (key: string) => Promise<void>;
        list: (options?: KVNamespaceListOptions) => Promise<KVNamespaceListResult>;
    }

    interface KVNamespaceGetOptions {
        type?: 'text' | 'json' | 'arrayBuffer' | 'stream';
        cacheTtl?: number;
    }

    interface KVNamespacePutOptions {
        expiration?: number;
        expirationTtl?: number;
        metadata?: any;
    }

    interface KVNamespaceListOptions {
        prefix?: string;
        limit?: number;
        cursor?: string;
    }

    interface KVNamespaceListResult {
        keys: KVNamespaceListKey[];
        list_complete: boolean;
        cursor?: string;
    }

    interface KVNamespaceListKey {
        name: string;
        expiration?: number;
        metadata?: any;
    }

    // Augment Next.js API request to include Cloudflare env
    namespace NodeJS {
        interface ProcessEnv {
            CLOUDFLARE_ACCOUNT_ID?: string;
            CLOUDFLARE_DATABASE_ID?: string;
            CLOUDFLARE_D1_TOKEN?: string;
            R2_ACCOUNT_ID?: string;
            R2_ACCESS_KEY_ID?: string;
            R2_SECRET_ACCESS_KEY?: string;
            R2_BUCKET_NAME?: string;
            R2_PUBLIC_URL?: string;
            KV_NAMESPACE_ID?: string;
            NEXTAUTH_URL?: string;
            NEXTAUTH_SECRET?: string;
            EMAIL_SERVER_HOST?: string;
            EMAIL_SERVER_PORT?: string;
            EMAIL_SERVER_USER?: string;
            EMAIL_SERVER_PASSWORD?: string;
            EMAIL_FROM?: string;
            ADMIN_EMAILS?: string;
            GEMINI_API_KEY?: string;
            NEXT_PUBLIC_SITE_URL?: string;
            NEXT_PUBLIC_SITE_NAME?: string;
        }
    }
}

// No default export
export {};