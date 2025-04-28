export const runtime = 'experimental-edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { getCloudflareEnv, getDbClient } from '@/lib/cloudflare';
import { eq, and, gt } from 'drizzle-orm';
import * as schema from '@/db/schema';


interface Opportunity {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featuredImage: string | null;
    status: "draft" | "published" | "archived" | "closed";
    metaTitle: string | null;
    metaDescription: string | null;
    location: string | null;
    type: "full-time" | "part-time" | "volunteer" | "internship" | null;
    deadline: Date | null;
    formId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface Program {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featuredImage: string | null;
    status: "draft" | "published" | "archived";
    metaTitle: string | null;
    metaDescription: string | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

interface ApplicationNote {
    id: string;
    applicationId: string;
    userId: string;
    content: string;
    createdAt: Date;
}

interface Application {
    id: string;
    opportunityId: string | null;
    programId: string | null;
    formId: string;
    applicantId: string | null;
    data: string;
    status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
    createdAt: Date;
    updatedAt: Date;
    opportunity?: Opportunity;
    program?: Program;
    notes: ApplicationNote[];
}

interface FormattedApplication {
    id: string;
    applicantName: string;
    opportunity: string;
    program: string;
    status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
    submittedDate: string;
    lastUpdated: string;
    notes?: string;
}

/**
 * API endpoint to get application status for a verified applicant
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get token from query parameter
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            return res.status(401).json({ error: 'No authentication token provided' });
        }

        // Get Cloudflare environment
        const env = getCloudflareEnv(req);
        if (!env) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get database client
        const db = getDbClient(env);

        // Verify token
        const verificationToken = await db.query.verificationTokens.findFirst({
            where: and(
                eq(schema.verificationTokens.token, token),
                eq(schema.verificationTokens.type, 'application_auth'),
                gt(schema.verificationTokens.expires, new Date().getTime())
            ),
        });

        if (!verificationToken) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Get applicant by email
        const email = verificationToken.identifier;
        const applicant = await db.query.applicants.findFirst({
            where: eq(schema.applicants.email, email),
        });

        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Get all applications for this applicant
        const applications = await db.query.applications.findMany({
            where: eq(schema.applications.applicantId, applicant.id),
            with: {
                opportunity: true,
                program: true,
                notes: {
                    orderBy: (notes: { createdAt: any; }, {desc}: any) => [desc(notes.createdAt)],
                    limit: 1,
                },
            },
            orderBy: (applications, { desc }) => [desc(applications.createdAt)],
        }) as Application[];

        // Format response data
        const formattedApplications: FormattedApplication[] = applications.map(app => {
            const opportunityTitle = app.opportunity?.title || '';
            const programTitle = app.program?.title || '';

            // Get most recent note if any
            const latestNote = app.notes.length > 0 ? app.notes[0].content : undefined;

            return {
                id: app.id,
                applicantName: applicant.name || email,
                opportunity: opportunityTitle,
                program: programTitle,
                status: app.status,
                submittedDate: formatDate(app.createdAt),
                lastUpdated: formatDate(app.updatedAt),
                notes: latestNote,
            };
        });

        return res.status(200).json({
            success: true,
            applications: formattedApplications,
        });

    } catch (error) {
        console.error('Application tracking error:', error);
        return res.status(500).json({
            error: 'Failed to retrieve applications',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Format a date in a user-friendly format
 */
function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}