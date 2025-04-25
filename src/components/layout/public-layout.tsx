import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Opportunities', href: '/opportunities' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <header className="relative bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/" className="text-xl font-bold">
                                    RiseNext
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                                                ? 'border-b-2 border-primary text-gray-900'
                                                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Button asChild>
                                <Link href="/donate">Donate</Link>
                            </Button>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="inline-flex items-center justify-center rounded-md p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                                        router.pathname === item.href
                                            ? 'border-primary bg-primary-50 text-primary'
                                            : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <Button asChild className="w-full">
                                    <Link href="/donate">Donate</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="bg-gray-800 text-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-xl font-bold mb-4">RiseNext</h2>
                            <p className="text-gray-300 mb-4">
                                Empowering communities through education, innovation, and collaboration.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                            <ul className="space-y-2">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-300 hover:text-white">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Connect</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/apply" className="text-gray-300 hover:text-white">
                                        Apply
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/donate" className="text-gray-300 hover:text-white">
                                        Donate
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} RiseNext. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}