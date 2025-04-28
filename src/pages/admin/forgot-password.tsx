import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Loader2, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ForgotPasswordFormData = {
    email: string;
};

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

    async function onSubmit(data: ForgotPasswordFormData) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'request_reset',
                    email: data.email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to process request');
            }

            setIsEmailSent(true);

        } catch (error) {
            console.error('Password reset request error:', error);
            // We don't reveal if the email exists for security reasons
            // Just show a success message even if there's an error
            setIsEmailSent(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Forgot Password | RiseNext Admin</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">RiseNext Admin</h1>
                        <p className="text-gray-600 mt-2">Password Reset</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Reset Your Password</CardTitle>
                            <CardDescription>
                                {isEmailSent
                                    ? "Check your email for reset instructions"
                                    : "Enter your email to receive a password reset link"}
                            </CardDescription>
                        </CardHeader>

                        {!isEmailSent ? (
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
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </Button>

                                    <div className="text-center text-sm text-gray-500">
                                        <Link
                                            href="/admin/login"
                                            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            <ArrowLeft className="mr-1 h-4 w-4" />
                                            Back to Sign In
                                        </Link>
                                    </div>
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
                                                Password reset link sent!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        We&#39;ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        If you don&#39;t receive an email within a few minutes, please check your spam folder or try again.
                                    </p>
                                </div>

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