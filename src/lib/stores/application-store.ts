import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Application status types
type ApplicationStatus = 'new' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';

// Application interface
interface Application {
    id: string;
    applicantName: string;
    opportunity: string;
    program: string;
    status: ApplicationStatus;
    submittedDate: string;
    lastUpdated: string;
    notes?: string;
}

// Auth token for application tracking
interface ApplicationAuthState {
    email: string | null;
    token: string | null;
    isVerified: boolean;
    applications: Application[];
    isLoading: boolean;

    // Actions
    setEmail: (email: string) => void;
    setToken: (token: string) => void;
    clearToken: () => void;
    setApplications: (applications: Application[]) => void;
    clearAll: () => void;
    setLoading: (loading: boolean) => void;
}

export const useApplicationStore = create<ApplicationAuthState>()(
    persist(
        (set) => ({
            email: null,
            token: null,
            isVerified: false,
            applications: [],
            isLoading: false,

            setEmail: (email: string) => set({
                email,
            }),

            setToken: (token: string) => set({
                token,
                isVerified: true,
            }),

            clearToken: () => set({
                token: null,
                isVerified: false,
                applications: [],
            }),

            setApplications: (applications: Application[]) => set({
                applications,
            }),

            clearAll: () => set({
                email: null,
                token: null,
                isVerified: false,
                applications: [],
            }),

            setLoading: (loading: boolean) => set({
                isLoading: loading,
            }),
        }),
        {
            name: 'rise-next-application-tracking',
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for temp access
            partialize: (state) => ({
                email: state.email,
                token: state.token,
                isVerified: state.isVerified,
            }),
        }
    )
);

/**
 * Request a verification code for the given email
 */
export async function requestVerificationCode(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        useApplicationStore.getState().setLoading(true);
        useApplicationStore.getState().setEmail(email);

        const response = await fetch('/api/auth/application-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'request_access',
                email,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to request verification code');
        }

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    } finally {
        useApplicationStore.getState().setLoading(false);
    }
}

/**
 * Verify the code and get access token
 */
export async function verifyCode(code: string): Promise<{ success: boolean; error?: string }> {
    try {
        useApplicationStore.getState().setLoading(true);

        const email = useApplicationStore.getState().email;

        if (!email) {
            throw new Error('Email not found. Please start over.');
        }

        const response = await fetch('/api/auth/application-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'verify_token',
                email,
                token: code,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Invalid verification code');
        }

        // Store the token for application access
        useApplicationStore.getState().setToken(data.accessToken);

        // Immediately fetch the applications
        await fetchApplications();

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    } finally {
        useApplicationStore.getState().setLoading(false);
    }
}

/**
 * Fetch applications for the authenticated applicant
 */
export async function fetchApplications(): Promise<{ success: boolean; error?: string }> {
    try {
        useApplicationStore.getState().setLoading(true);

        const token = useApplicationStore.getState().token;

        if (!token) {
            throw new Error('No access token. Please verify your identity first.');
        }

        // Pass token as query parameter instead of header
        const response = await fetch(`/api/applications/track?token=${encodeURIComponent(token)}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch applications');
        }

        useApplicationStore.getState().setApplications(data.applications);

        return { success: true };
    } catch (error) {
        // If token is invalid, clear it
        if (error instanceof Error &&
            (error.message.includes('unauthorized') ||
                error.message.includes('invalid token') ||
                error.message.includes('expired'))) {
            useApplicationStore.getState().clearToken();
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    } finally {
        useApplicationStore.getState().setLoading(false);
    }
}

/**
 * Clear all application tracking data
 */
export function clearApplicationTracking(): void {
    useApplicationStore.getState().clearAll();
}