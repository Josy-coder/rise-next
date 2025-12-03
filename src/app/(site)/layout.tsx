import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import UTMTracker from '@/components/UTMTracker'

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <UTMTracker />
      <div className="min-h-screen flex flex-col">
        <NavbarWrapper />
        <main className="flex-grow">{children}</main>
        <FooterWrapper />
      </div>
    </>
  )
}
