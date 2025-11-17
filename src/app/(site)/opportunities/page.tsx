import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Opportunities',
  description: 'Browse career, volunteer, and cohort opportunities',
}

export default function OpportunitiesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Opportunities</h1>
        <p className="text-lg mb-8">
          Discover career opportunities, volunteer positions, and cohort applications.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded mb-4">
              Career
            </span>
            <h2 className="text-2xl font-semibold mb-2">Sample Opportunity</h2>
            <p className="text-gray-600 mb-4">
              Opportunity descriptions will appear here once content is added.
            </p>
            <button className="text-blue-600 hover:underline">Learn More �</button>
          </div>
        </div>
      </div>
    </>
  )
}
