import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about RiseNext's mission, vision, and team",
}

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 ">About RiseNext</h1>
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              RiseNext was created by Team Eagles and won the 2024 CIEE UNHCR Student Challenge.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Mission & Vision</h2>
            <p className="text-lg mb-4">
              We bridge the knowledge gap for forcibly displaced high school and university
              students to access higher education opportunities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
            <p className="text-lg mb-4">Team members and committee information coming soon...</p>
          </section>
        </div>
      </div>
    </>
  )
}
