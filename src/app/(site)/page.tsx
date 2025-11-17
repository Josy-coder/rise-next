import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to RiseNext',
}

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Welcome to RiseNext</h1>
        <p className="text-xl mb-8">
          Empowering forcibly displaced students through mentorship and education opportunities.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>Bridging the knowledge gap for high school and university students.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p>Join us as a mentor, volunteer, or apply for our programs.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
            <p>Stay updated with our latest achievements and announcements.</p>
          </div>
        </div>
      </div>
    </>
  )
}
