import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { callbackUrl } = router.query;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password');
                setIsLoading(false);
                return;
            }

            // Redirect to dashboard or callbackUrl
            const redirectUrl = callbackUrl
                ? decodeURIComponent(callbackUrl as string)
                : '/admin/dashboard';

            router.push(redirectUrl);
        } catch (error) {
            console.log(error);
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Admin Login | RiseNext</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="rounded-md bg-red-50 p-3 text-red-600">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/admin/forgot-password"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => signIn('email', { email, callbackUrl: callbackUrl as string || '/admin/dashboard' })}
                            className="w-full"
                        >
                            Sign in with Email Link
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    // If user is already logged in, redirect to dashboard
    if (session) {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}