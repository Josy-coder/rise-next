import {sanityFetch} from '@/lib/sanity/client'
import {siteSettingsQuery} from '@/lib/sanity/queries'
import {revalidationTimes, tags} from '@/lib/sanity/config'
import Navbar from './Navbar'

interface SiteSettings {
  title: string
  logo?: string
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

export default async function NavbarWrapper() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: [tags.siteSettings],
    revalidate: revalidationTimes.siteSettings,
  })

  return <Navbar siteSettings={siteSettings} />
}
