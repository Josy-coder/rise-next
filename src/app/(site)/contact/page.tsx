import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the RiseNext team',
}

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-8">
          Have questions? Want to get involved? Reach out to us!
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Email: contact@risenext.org</p>
              <p className="text-gray-600">Social media links coming soon...</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={5}
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
