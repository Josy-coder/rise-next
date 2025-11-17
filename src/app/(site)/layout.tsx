'use client'

import {useUTMTracking} from '@/hooks/useUTMTracking'

export default function SiteLayout({children}: {children: React.ReactNode}) {
  // Track UTM parameters
  useUTMTracking()

  return (
    <div className="min-h-screen">
      {/* Header/Navigation will go here */}
      <main>{children}</main>
      {/* Footer will go here */}
    </div>
  )
}
