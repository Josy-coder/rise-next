import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {
    FileText,
    GraduationCap,
    Briefcase,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import AdminLayout from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface DashboardStat {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
    link: string;
}

interface DashboardProps {
    stats: {
        posts: DashboardStat;
        programs: DashboardStat;
        opportunities: DashboardStat;
        applications: DashboardStat;
        recent: {
            applicants: {
                id: string;
                name: string;
                email: string;
                date: string;
                opportunity: string;
            }[];
            applications: {
                id: string;
                applicant: string;
                program: string;
                status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
                date: string;
            }[];
        };
    };
}

// This is placeholder data for development
// In production, this would be fetched from the database
const placeholderStats: DashboardProps['stats'] = {
    posts: {
        title: 'Blog Posts',
        value: 12,
        description: '3 draft, 9 published',
        icon: FileText,
        link: '/admin/posts'
    },
    programs: {
        title: 'Programs',
        value: 5,
        description: '2 active, 3 upcoming',
        icon: GraduationCap,
        link: '/admin/programs'
    },
    opportunities: {
        title: 'Opportunities',
        value: 8,
        description: '5 active, 3 closed',
        icon: Briefcase,
        link: '/admin/opportunities'
    },
    applications: {
        title: 'Applications',
        value: 42,
        description: '15 new, 27 processed',
        icon: Users,
        link: '/admin/applications'
    },
    recent: {
        applicants: [
            {
                id: 'app_1',
                name: 'Jane Smith',
                email: 'jane@example.com',
                date: '2025-04-22',
                opportunity: 'Summer Volunteer Program'
            },
            {
                id: 'app_2',
                name: 'John Doe',
                email: 'john@example.com',
                date: '2025-04-21',
                opportunity: 'Youth Leadership Program'
            },
            {
                id: 'app_3',
                name: 'Alice Johnson',
                email: 'alice@example.com',
                date: '2025-04-20',
                opportunity: 'Community Outreach'
            },
            {
                id: 'app_4',
                name: 'Bob Brown',
                email: 'bob@example.com',
                date: '2025-04-19',
                opportunity: 'Digital Skills Workshop'
            },
        ],
        applications: [
            {
                id: 'app_1',
                applicant: 'Jane Smith',
                program: 'Summer Volunteer Program',
                status: 'new',
                date: '2025-04-22'
            },
            {
                id: 'app_2',
                applicant: 'John Doe',
                program: 'Youth Leadership Program',
                status: 'under_review',
                date: '2025-04-21'
            },
            {
                id: 'app_3',
                applicant: 'Alice Johnson',
                program: 'Community Outreach',
                status: 'accepted',
                date: '2025-04-20'
            },
            {
                id: 'app_4',
                applicant: 'Bob Brown',
                program: 'Digital Skills Workshop',
                status: 'rejected',
                date: '2025-04-19'
            },
        ]
    }
};

export default function Dashboard({ stats }: DashboardProps) {
    // Status icon mapping
    const statusIcons = {
        new: <Clock className="h-5 w-5 text-blue-500" />,
        under_review: <AlertCircle className="h-5 w-5 text-yellow-500" />,
        accepted: <CheckCircle className="h-5 w-5 text-green-500" />,
        rejected: <XCircle className="h-5 w-5 text-red-500" />,
        waitlisted: <Clock className="h-5 w-5 text-gray-500" />
    };

    return (
        <AdminLayout>
            <Head>
                <title>Admin Dashboard | RiseNext</title>
            </Head>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Button asChild>
                        <Link href="/admin/posts/new">
                            New Post
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/opportunities/new">
                            New Opportunity
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.values(stats).filter(stat => typeof stat === 'object' && 'title' in stat).map((stat: DashboardStat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                            <Button variant="link" asChild className="px-0 mt-1">
                                <Link href={stat.link}>
                                    View all
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6">
                <Tabs defaultValue="applications" className="w-full">
                    <TabsList>
                        <TabsTrigger value="applications">Recent Applications</TabsTrigger>
                        <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
                    </TabsList>
                    <TabsContent value="applications" className="border rounded-md p-4 mt-2">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Latest Applications</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {stats.recent.applications.map((application) => (
                                    <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            {statusIcons[application.status]}
                                            <div>
                                                <p className="font-medium">{application.applicant}</p>
                                                <p className="text-sm text-muted-foreground">{application.program}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-muted-foreground">{application.date}</span>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/applications/${application.id}`}>
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button variant="outline" asChild>
                                    <Link href="/admin/applications">
                                        View All Applications
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="applicants" className="border rounded-md p-4 mt-2">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Latest Applicants</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {stats.recent.applicants.map((applicant) => (
                                    <div key={applicant.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{applicant.name}</p>
                                            <p className="text-sm text-muted-foreground">{applicant.email}</p>
                                            <p className="text-xs text-muted-foreground">Applied for: {applicant.opportunity}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-muted-foreground">{applicant.date}</span>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/applicants/${applicant.id}`}>
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button variant="outline" asChild>
                                    <Link href="/admin/applicants">
                                        View All Applicants
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }

    // In production, we would fetch real data from the database here
    // For now, we'll use the placeholder data
    return {
        props: {
            stats: placeholderStats,
        },
    };
};