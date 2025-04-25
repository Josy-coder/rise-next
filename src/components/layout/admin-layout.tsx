import { ReactNode, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    GraduationCap,
    Users,
    FormInput,
    FileImage,
    LogOut,
    Menu,
    X,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { data: session } = useSession({ required: true });
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Blog Posts", href: "/admin/posts", icon: FileText },
        { name: "Programs", href: "/admin/programs", icon: GraduationCap },
        { name: "Opportunities", href: "/admin/opportunities", icon: Briefcase },
        { name: "Applications", href: "/admin/applications", icon: FormInput },
        { name: "Form Builder", href: "/admin/forms", icon: FormInput },
        { name: "Applicants", href: "/admin/applicants", icon: Users },
        { name: "Media", href: "/admin/media", icon: FileImage },
    ];

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar toggle */}
            <div className="bg-white py-2 px-4 sm:px-6 lg:hidden flex items-center justify-between shadow-sm">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                <div className="flex items-center space-x-4">
                    <span className="font-semibold">RiseNext Admin</span>
                </div>
            </div>

            {/* Sidebar for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex flex-col w-full max-w-xs h-full bg-white">
                        <div className="h-0 flex-1 overflow-y-auto">
                            <nav className="px-2 py-4">
                                <div className="space-y-1">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                                                router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        >
                                            <item.icon
                                                className={`mr-4 h-5 w-5 ${
                                                    router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                                                        ? "text-gray-500"
                                                        : "text-gray-400 group-hover:text-gray-500"
                                                }`}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <Button variant="outline" onClick={handleSignOut} className="w-full">
                                <LogOut className="mr-2 h-5 w-5" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <h1 className="text-lg font-bold">RiseNext Admin</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2">
                            <div className="space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                            router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        <item.icon
                                            className={`mr-3 h-5 w-5 ${
                                                router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                                                    ? "text-gray-500"
                                                    : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center space-x-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                                                <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium text-gray-700">{session?.user?.name || "User"}</span>
                                                <span className="text-xs text-gray-500">{session?.user?.email}</span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-gray-500" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/settings">Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleSignOut}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col">
                <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
                    {/* Mobile top bar placeholder if needed */}
                </div>
                <main className="flex-1 pb-8">
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}