'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function useUTMTracking() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utm_source = searchParams.get('utm_source')
    const utm_medium = searchParams.get('utm_medium')
    const utm_campaign = searchParams.get('utm_campaign')
    const utm_term = searchParams.get('utm_term')
    const utm_content = searchParams.get('utm_content')

    if (utm_source || utm_medium || utm_campaign) {
      const utmParams = {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        timestamp: new Date().toISOString(),
      }

      sessionStorage.setItem('utm_params', JSON.stringify(utmParams))

      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'utm_tracking', {
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
        })
      }
    }
  }, [searchParams])
}