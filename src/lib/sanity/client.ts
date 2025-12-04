import {createClient} from 'next-sanity'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  ...(process.env.SANITY_API_READ_TOKEN && {token: process.env.SANITY_API_READ_TOKEN}),
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to fetch data with ISR/SSR support
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate,
}: {
  query: string
  params?: any
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  // In development, revalidate more frequently
  const defaultRevalidate = process.env.NODE_ENV === 'development' ? 30 : 3600

  return client.fetch<T>(query, params, {
    next: {
      revalidate: revalidate !== undefined ? revalidate : defaultRevalidate,
      tags,
    },
  })
}
