import type {Metadata} from 'next'
import Script from 'next/script'
import {GoogleAnalytics} from '@/lib/analytics'
import {sanityFetch} from '@/lib/sanity/client'
import {siteSettingsQuery} from '@/lib/sanity/queries'
import {revalidationTimes, tags} from '@/lib/sanity/config'

interface SiteSettings {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  favicon?: string
  googleAnalyticsId?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: [tags.siteSettings],
    revalidate: revalidationTimes.siteSettings,
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rise-next.org'

  return {
    title: {
      default: siteSettings?.title || 'RiseNext - Empowering Refugees Through Education',
      template: `%s | ${siteSettings?.title || 'RiseNext'}`,
    },
    description:
      siteSettings?.description ||
      'RiseNext is a mentoring program bridging the knowledge gap for forcibly displaced students to access higher education.',
    keywords: siteSettings?.keywords || [],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: siteSettings?.title || 'RiseNext',
      images: siteSettings?.ogImage
        ? [
            {
              url: siteSettings.ogImage,
              width: 1200,
              height: 630,
              alt: siteSettings?.title || 'RiseNext',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@risenext',
      creator: '@risenext',
    },
    icons: {
      icon: siteSettings?.favicon || '/favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: [tags.siteSettings],
    revalidate: revalidationTimes.siteSettings,
  })

  const gaId = siteSettings?.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Bootstrap Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* Charitize Libraries Stylesheet */}
        <link href="/lib/animate/animate.min.css" rel="stylesheet" />
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        {/* Charitize Bootstrap Stylesheet */}
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        {/* Charitize Template Stylesheet */}
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}

        {/* JavaScript Libraries - Load in sequence */}
        <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/lib/wow/wow.min.js" strategy="afterInteractive" />
        <Script src="/lib/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/lib/counterup/counterup.min.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
