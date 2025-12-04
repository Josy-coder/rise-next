import Link from 'next/link'
import {Metadata} from 'next'

export const runtime = "edge"

export const metadata: Metadata = {
  title: '404 - Page Not Found | RiseNext',
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <>

      {/* 404 Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
              <h1 className="display-1">404</h1>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="mb-4">
                We're sorry, the page you have looked for does not exist on our website! Maybe go
                to our home page or try exploring our opportunities and news.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link className="btn btn-primary rounded py-3 px-4" href="/">
                  Go Back To Home
                </Link>
                <Link className="btn btn-secondary rounded py-3 px-4" href="/opportunities">
                  View Opportunities
                </Link>
                <Link className="btn btn-secondary rounded py-3 px-4" href="/contact">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 404 End */}

    </>
  )
}
