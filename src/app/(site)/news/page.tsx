import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news, announcements, and events from RiseNext',
}

export default function NewsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">News & Updates</h1>
        <p className="text-lg mb-8">
          Stay informed about our latest announcements, articles, and upcoming events.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Placeholder cards */}
          <article className="border rounded-lg p-6 hover:shadow-lg transition">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded mb-4">
              Announcement
            </span>
            <h2 className="text-2xl font-semibold mb-2">Sample News Article</h2>
            <p className="text-gray-600 mb-4">
              News articles will appear here once content is added from the CMS.
            </p>
            <button className="text-blue-600 hover:underline">Read More �</button>
          </article>
        </div>
      </div>
    </>
  )
}
