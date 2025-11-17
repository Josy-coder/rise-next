import {Metadata} from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  return {
    title: `Opportunity: ${slug}`,
  }
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <div className="prose max-w-none">
          <p className="text-lg">Opportunity details for: {slug}</p>
          <p className="text-gray-600 mt-4">
            This is a placeholder page. Content will be loaded from Sanity CMS.
          </p>
        </div>
      </div>
    </>
  )
}
