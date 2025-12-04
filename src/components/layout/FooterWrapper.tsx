import {sanityFetch} from '@/lib/sanity/client'
import {siteSettingsQuery} from '@/lib/sanity/queries'
import {revalidationTimes, tags} from '@/lib/sanity/config'
import Footer from './Footer'

interface SiteSettings {
  title: string
  contactEmail?: string
  contactPhone?: string
  location?: {
    addressLine1?: string
    addressLine2?: string
    city?: string
    country?: string
  }
  socialLinks?: {
    facebook?: string
    linkedin?: string
    instagram?: string
  }
}

export default async function FooterWrapper() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: [tags.siteSettings],
    revalidate: revalidationTimes.siteSettings,
  })

  return <Footer siteSettings={siteSettings} />
}
