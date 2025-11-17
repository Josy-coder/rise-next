import type {Metadata} from 'next'
import {GoogleAnalytics} from '@/lib/analytics'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'RiseNext - Empowering Refugees Through Education',
    template: '%s | RiseNext',
  },
  description:
    'RiseNext is a mentoring program bridging the knowledge gap for forcibly displaced students to access higher education.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://risenext.org',
    siteName: 'RiseNext',
    images: [
      {
        url: 'https://risenext.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RiseNext',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@risenext',
    creator: '@risenext',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}
      </body>
    </html>
  )
}
