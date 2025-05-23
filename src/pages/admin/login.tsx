import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loginUser } from '@/lib/stores/auth-store';

type LoginFormData = {
    email: string;
    password: string;
};

export default function AdminLogin() {
    const router = useRouter();
    const { redirect_url } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true);

        try {
            const result = await loginUser(data.email, data.password);

            if (!result.success) {
                throw new Error(result.error || 'Failed to login');
            }

            toast.success('Login successful');

            // Redirect to dashboard or the specified redirect URL
            const redirectTo = typeof redirect_url === 'string' ? redirect_url : '/admin/dashboard';
            router.push(redirectTo);

        } catch (error) {
            console.error('Login error:', error);
            toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Admin Login | RiseNext</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">RiseNext Admin</h1>
                        <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Login</CardTitle>
                            <CardDescription>
                                Enter your credentials to access the admin dashboard
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        disabled={isLoading}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            disabled={isLoading}
                                            {...register('password', {
                                                required: 'Password is required',
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link
                                            href="/admin/forgot-password"
                                            className="font-medium text-primary hover:text-primary/80"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                <div className="text-center text-sm text-gray-500">
                                    <span>Don&#39;t have an account?{' '}</span>
                                    <Link
                                        href="/admin/signup"
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}