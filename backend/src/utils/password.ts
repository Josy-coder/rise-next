/**
 * Password hashing utilities using Web Crypto API (Edge-compatible)
 * Uses PBKDF2 with SHA-256 for secure password hashing
 */

const ITERATIONS = 100000 // Recommended minimum for PBKDF2
const SALT_LENGTH = 32
const KEY_LENGTH = 32

/**
 * Generate a random salt
 */
function generateSalt(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
}

/**
 * Convert string to Uint8Array
 */
function stringToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str)
}

/**
 * Convert Uint8Array to hex string
 */
function uint8ArrayToHex(arr: Uint8Array): string {
    return Array.from(arr)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

/**
 * Convert hex string to Uint8Array
 */
function hexToUint8Array(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return bytes
}

/**
 * Derive key using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
    const passwordBuffer = stringToUint8Array(password)

    // Import password as key material
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits']
    )

    // Derive key using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: ITERATIONS,
            hash: 'SHA-256',
        },
        keyMaterial,
        KEY_LENGTH * 8 // bits
    )

    return new Uint8Array(derivedBits)
}

/**
 * Hash a password
 * Returns: salt:hash (both in hex)
 */
export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = generateSalt()
        const hash = await deriveKey(password, salt)

        const saltHex = uint8ArrayToHex(salt)
        const hashHex = uint8ArrayToHex(hash)

        return `${saltHex}:${hashHex}`
    } catch (error) {
        console.error('Password hashing error:', error)
        throw new Error('Failed to hash password')
    }
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    try {
        const [saltHex, hashHex] = storedHash.split(':')

        if (!saltHex || !hashHex) {
            throw new Error('Invalid hash format')
        }

        const salt = hexToUint8Array(saltHex)
        const expectedHash = hexToUint8Array(hashHex)

        const actualHash = await deriveKey(password, salt)

        // Constant-time comparison to prevent timing attacks
        if (expectedHash.length !== actualHash.length) {
            return false
        }

        let result = 0
        for (let i = 0; i < expectedHash.length; i++) {
            result |= expectedHash[i] ^ actualHash[i]
        }

        return result === 0
    } catch (error) {
        console.error('Password verification error:', error)
        return false
    }
}

/**
 * Generate a secure random token (for reset tokens, invite codes, etc.)
 */
export function generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const randomValues = crypto.getRandomValues(new Uint8Array(length))

    return Array.from(randomValues)
        .map(x => chars[x % chars.length])
        .join('')
}

/**
 * Generate a numeric code (for invite codes)
 */
export function generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed ambiguous chars
    const randomValues = crypto.getRandomValues(new Uint8Array(8))

    return Array.from(randomValues)
        .map(x => chars[x % chars.length])
        .join('')
}