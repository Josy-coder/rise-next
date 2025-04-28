import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ResetPasswordFormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
    const password = watch('password');

    // Verify the token when the component mounts
    useEffect(() => {
        async function verifyToken() {
            if (!token) return;

            setIsLoading(true);

            try {
                const response = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'verify_token',
                        token,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Invalid or expired token');
                }

                setIsValidToken(true);

            } catch (error) {
                console.error('Token verification error:', error);
                setIsValidToken(false);
                toast.error('Invalid or expired reset link. Please request a new one.');
            } finally {
                setIsLoading(false);
            }
        }

        if (token) {
            verifyToken();
        }
    }, [token]);

    async function onSubmit(data: ResetPasswordFormData) {
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsResetting(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'reset_password',
                    token: token as string,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to reset password');
            }

            setIsSuccess(true);
            toast.success('Password reset successfully');

            // Redirect to login after a short delay
            setTimeout(() => {
                router.push('/admin/login');
            }, 3000);

        } catch (error) {
            console.error('Password reset error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to reset password. Please try again.');
        } finally {
            setIsResetting(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (isValidToken === false) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Invalid Reset Link</AlertTitle>
                        <AlertDescription>
                            The password reset link is invalid or has expired.
                        </AlertDescription>
                    </Alert>

                    <div className="text-center mt-6">
                        <Button asChild variant="secondary">
                            <Link href="/admin/forgot-password">
                                Request a new reset link
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Reset Password | RiseNext Admin</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">RiseNext Admin</h1>
                        <p className="text-gray-600 mt-2">Create a new password</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Reset Your Password</CardTitle>
                            <CardDescription>
                                Choose a new password for your account
                            </CardDescription>
                        </CardHeader>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                autoComplete="new-password"
                                                disabled={isResetting}
                                                {...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                                                    },
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

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            disabled={isResetting}
                                            {...register('confirmPassword', {
                                                required: 'Please confirm your password',
                                                validate: value => value === password || 'Passwords do not match',
                                            })}
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isResetting}
                                    >
                                        {isResetting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Resetting...
                                            </>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        ) : (
                            <CardContent className="space-y-6">
                                <div className="rounded-md bg-green-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">
                                                Password reset successful!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500">
                                    Your password has been reset successfully. You will be redirected to the login page shortly.
                                </p>

                                <div className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/admin/login">
                                            Return to Login
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}