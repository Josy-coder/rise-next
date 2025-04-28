import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole } from '@/lib/auth';

interface User {
    id: string;
    email: string;
    name: string | null;
    image?: string | null;
    role: UserRole;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    login: (token: string, user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: (token: string, user: User) => set({
                token,
                user,
                isAuthenticated: true,
            }),

            logout: () => set({
                token: null,
                user: null,
                isAuthenticated: false,
            }),

            setUser: (user: User) => set({
                user,
            }),

            setLoading: (loading: boolean) => set({
                isLoading: loading,
            }),
        }),
        {
            name: 'rise-next-auth',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Helper functions for authentication

/**
 * Sends a login request to the server
 */
export async function loginUser(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Store the token and user data
        useAuthStore.getState().login(data.token, data.user);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Sends a logout request to the server
 */
export async function logoutUser(): Promise<void> {
    try {
        // Get the token before we clear it
        const token = useAuthStore.getState().token;

        // Clear the local auth state first
        useAuthStore.getState().logout();

        // Then inform the server (optional)
        if (token) {
            await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'logout',
                    token: token // Pass token in the request body
                }),
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
        // We still want to clear the local state even if the server request fails
        useAuthStore.getState().logout();
    }
}

/**
 * Fetches the current user data
 */
export async function fetchCurrentUser(): Promise<{ success: boolean; error?: string }> {
    try {
        const token = useAuthStore.getState().token;

        if (!token) {
            useAuthStore.getState().logout();
            return { success: false, error: 'No authentication token found' };
        }

        useAuthStore.getState().setLoading(true);

        // Pass token as query parameter instead of header
        const response = await fetch(`/api/auth/me?token=${encodeURIComponent(token)}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user data');
        }

        useAuthStore.getState().setUser(data.user);

        return { success: true };
    } catch (error) {
        // If we get an authentication error, log the user out
        if (error instanceof Error &&
            (error.message.includes('unauthorized') ||
                error.message.includes('invalid token') ||
                error.message.includes('expired'))) {
            useAuthStore.getState().logout();
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    } finally {
        useAuthStore.getState().setLoading(false);
    }
}

/**
 * Check if the current user has the required role
 */
export function hasRequiredRole(requiredRole: UserRole): boolean {
    const { user } = useAuthStore.getState();

    if (!user) return false;

    const userRole = user.role;

    if (requiredRole === 'admin') {
        return userRole === 'admin';
    } else if (requiredRole === 'editor') {
        return userRole === 'admin' || userRole === 'editor';
    } else if (requiredRole === 'viewer') {
        return userRole === 'admin' || userRole === 'editor' || userRole === 'viewer';
    }

    return false;
}