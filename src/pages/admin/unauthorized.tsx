import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from 'lucide-react';
import { User } from "@/lib/auth";

export default function Unauthorized() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/auth/me');

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    async function handleSignOut() {
        try {
            await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'logout',
                }),
            });

            window.location.href = '/admin/login';
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Unauthorized | RiseNext Admin</title>
            </Head>
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Access Denied</h2>
                    <p className="mt-2 text-gray-600">
                        {user?.email
                            ? `Your account (${user.email}) doesn't have permission to access the admin area.`
                            : "You don't have permission to access the admin area."}
                    </p>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-500">
                        If you believe this is an error, please contact the site administrator to request appropriate permissions.
                    </p>
                    <div className="flex flex-col space-y-3">
                        <Button asChild variant="outline">
                            <Link href="/">Return to Homepage</Link>
                        </Button>
                        <Button variant="outline" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}