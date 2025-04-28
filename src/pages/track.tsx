import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Mail, ArrowRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type EmailFormData = {
    email: string;
};

type VerificationFormData = {
    verificationCode: string;
};

interface ApplicationStatus {
    id: string;
    applicantName: string;
    program: string;
    opportunity: string;
    status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
    submittedDate: string;
    lastUpdated: string;
    notes?: string;
}

export default function ApplicationTracker() {
    const router = useRouter();
    const [step, setStep] = useState<'email' | 'verification' | 'status'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [applications, setApplications] = useState<ApplicationStatus[]>([]);

    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: { errors: emailErrors } } = useForm<EmailFormData>();
    const { register: registerVerification, handleSubmit: handleSubmitVerification, formState: { errors: verificationErrors } } = useForm<VerificationFormData>();

    async function onSubmitEmail(data: EmailFormData) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/application-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'request_access',
                    email: data.email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to process request');
            }

            setEmail(data.email);
            setStep('verification');
            toast.success('Verification code sent! Please check your email.');

        } catch (error) {
            console.error('Application access request error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to send verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    async function onSubmitVerification(data: VerificationFormData) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/application-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'verify_token',
                    email,
                    token: data.verificationCode,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to verify code');
            }

            // Fetch applications with the access token
            const applicationsResponse = await fetch('/api/applications/track', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${result.accessToken}`,
                },
            });

            const applicationsResult = await applicationsResponse.json();

            if (!applicationsResponse.ok) {
                throw new Error(applicationsResult.error || 'Failed to fetch applications');
            }

            setApplications(applicationsResult.applications);
            setStep('status');

        } catch (error) {
            console.error('Verification error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to verify code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Helper function to get status icon
    const getStatusIcon = (status: ApplicationStatus['status']) => {
        switch (status) {
            case 'new':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'under_review':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'accepted':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'rejected':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'waitlisted':
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    // Helper function to format status text
    const formatStatus = (status: ApplicationStatus['status']) => {
        switch (status) {
            case 'new':
                return 'New Application';
            case 'under_review':
                return 'Under Review';
            case 'accepted':
                return 'Accepted';
            case 'rejected':
                return 'Not Selected';
            case 'waitlisted':
                return 'Waitlisted';
        }
    };

    return (
        <>
            <Head>
                <title>Track Your Application | RiseNext</title>
                <meta name="description" content="Check the status of your application to RiseNext programs and opportunities" />
            </Head>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold text-gray-900">RiseNext</h1>
                            <Button variant="outline" onClick={() => router.push('/')}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
                            <p className="mt-2 text-gray-600">
                                Track the status of your application to our programs and opportunities
                            </p>
                        </div>

                        {/* Step 1: Email */}
                        {step === 'email' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Track Your Application</CardTitle>
                                    <CardDescription>
                                        Enter the email address you used to apply
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="pl-10"
                                                    autoComplete="email"
                                                    disabled={isLoading}
                                                    {...registerEmail('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'Invalid email address',
                                                        },
                                                    })}
                                                />
                                            </div>
                                            {emailErrors.email && (
                                                <p className="text-sm text-red-500">{emailErrors.email.message}</p>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
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
                                                <>
                                                    Continue
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        )}

                        {/* Step 2: Verification */}
                        {step === 'verification' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Enter Verification Code</CardTitle>
                                    <CardDescription>
                                        We&#39;ve sent a verification code to {email}
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleSubmitVerification(onSubmitVerification)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="verificationCode">Verification Code</Label>
                                            <Input
                                                id="verificationCode"
                                                placeholder="Enter 6-digit code"
                                                className="text-center text-lg tracking-widest"
                                                maxLength={6}
                                                disabled={isLoading}
                                                {...registerVerification('verificationCode', {
                                                    required: 'Verification code is required',
                                                    pattern: {
                                                        value: /^[0-9]{6}$/,
                                                        message: 'Please enter a valid 6-digit code',
                                                    },
                                                })}
                                            />
                                            {verificationErrors.verificationCode && (
                                                <p className="text-sm text-red-500">{verificationErrors.verificationCode.message}</p>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            <p>Didn&#39;t receive a code? Check your spam folder or <button
                                                type="button"
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => setStep('email')}
                                            >
                                                try another email address
                                            </button></p>
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                'View Applications'
                                            )}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        )}

                        {/* Step 3: Application Status */}
                        {step === 'status' && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Applications</CardTitle>
                                        <CardDescription>
                                            View the status of all your applications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {applications.length === 0 ? (
                                            <div className="text-center py-6">
                                                <p className="text-gray-500">No applications found for this email address.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {applications.map((app) => (
                                                    <div key={app.id} className="border rounded-lg overflow-hidden">
                                                        <div className="bg-gray-50 p-4 border-b">
                                                            <div className="flex justify-between items-center">
                                                                <h3 className="text-lg font-medium text-gray-900">
                                                                    {app.opportunity || app.program}
                                                                </h3>
                                                                <div className="flex items-center space-x-2">
                                                                    {getStatusIcon(app.status)}
                                                                    <span className={`text-sm font-medium ${
                                                                        app.status === 'accepted' ? 'text-green-700' :
                                                                            app.status === 'rejected' ? 'text-red-700' :
                                                                                app.status === 'under_review' ? 'text-yellow-700' :
                                                                                    app.status === 'waitlisted' ? 'text-gray-700' :
                                                                                        'text-blue-700'
                                                                    }`}>
                                    {formatStatus(app.status)}
                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-4 space-y-4">
                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                <div>
                                                                    <p className="text-gray-500">Applicant</p>
                                                                    <p className="font-medium">{app.applicantName}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-500">Submitted On</p>
                                                                    <p className="font-medium">{app.submittedDate}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-500">Last Updated</p>
                                                                    <p className="font-medium">{app.lastUpdated}</p>
                                                                </div>
                                                            </div>

                                                            {app.notes && (
                                                                <div className="mt-4">
                                                                    <p className="text-gray-500 text-sm">Notes</p>
                                                                    <p className="mt-1 text-gray-700">{app.notes}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            onClick={() => setStep('email')}
                                        >
                                            Check Another Email
                                        </Button>
                                        <Button onClick={() => router.push('/')}>
                                            Return to Home
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}