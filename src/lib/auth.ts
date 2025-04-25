import { NextAuthOptions } from 'next-auth';
import { D1Adapter } from "@auth/d1-adapter";
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import bcrypt from 'bcryptjs';

// Extend the Session and JWT types to include our custom fields
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        }
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

/**
 * NextAuth configuration
 * This sets up authentication for the application
 */
export const authOptions = (env: any): NextAuthOptions => ({
    // Use the D1Adapter directly
    adapter: D1Adapter(env.DB),

    // Configure authentication providers
    providers: [
        // Credentials provider for email/password
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Use D1 adapter to query user
                const db = env.DB;
                const stmt = db.prepare('SELECT * FROM users WHERE email = ?').bind(credentials.email);
                const user = await stmt.first();

                if (!user) return null;

                // Verify password
                const isValidPassword = await bcrypt.compare(credentials.password, user.password || '');
                if (!isValidPassword) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
        }),

        // Email provider for passwordless login and password reset
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],

    // Callbacks for customizing authentication behavior
    callbacks: {
        // Add user role to the session
        async session({ session, token }) {
            if (session.user && token.sub) {
                // Use D1 to get the user's role
                const db = env.DB;
                const stmt = db.prepare('SELECT role FROM users WHERE id = ?').bind(token.sub);
                const user = await stmt.first();

                if (user) {
                    session.user.id = token.sub;
                    session.user.role = user.role as string;
                }
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        // Control who can sign in
        async signIn({ user, account }) {
            const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

            if (user?.email) {
                return adminEmails.includes(user.email);
            }

            if (account?.provider === 'email') {
                return adminEmails.includes(user?.email ?? '');
            }

            return false;
        }

    },

    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },

    session: {
        strategy: 'jwt',
    },

    // Secret for JWT encryption
    secret: process.env.NEXTAUTH_SECRET,
});

/**
 * Checks if the current user has the required role
 */
export const hasRole = async (session: any, requiredRole: string): Promise<boolean> => {
    if (!session?.user) return false;

    const userRole = session.user.role;

    // Simple role hierarchy: admin > editor > viewer
    if (requiredRole === 'admin') {
        return userRole === 'admin';
    } else if (requiredRole === 'editor') {
        return userRole === 'admin' || userRole === 'editor';
    } else if (requiredRole === 'viewer') {
        return userRole === 'admin' || userRole === 'editor' || userRole === 'viewer';
    }

    return false;
};