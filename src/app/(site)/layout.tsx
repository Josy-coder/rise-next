import {Suspense} from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import UTMTracker from '@/components/UTMTracker'

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Suspense fallback={null}>
        <UTMTracker />
      </Suspense>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
