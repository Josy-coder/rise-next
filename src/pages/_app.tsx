import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import Head from 'next/head';

// Import Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({
                              Component,
                              pageProps: { session, ...pageProps }
                            }: AppProps) {
  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>RiseNext | Nonprofit Website</title>
        </Head>
        <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <main className={`${inter.variable} font-sans`}>
              <Component {...pageProps} />
              <Toaster position="top-right" richColors />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </>
  );
}