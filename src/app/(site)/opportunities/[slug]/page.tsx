import {Metadata} from 'next'

// Placeholder data - will be replaced with Sanity later
const placeholderOpportunity = {
  title: 'Volunteer Mentor for Displaced Students',
  type: 'Volunteering',
  location: 'Remote',
  employmentType: 'Volunteer',
  excerpt:
    'Help guide displaced high school and university students through the higher education application process.',
  description: `
    <p>RiseNext is seeking passionate and dedicated volunteer mentors to guide displaced high school and university students through their higher education journey. As a mentor, you will play a crucial role in helping students navigate the complex application process, identify opportunities, and build the skills they need to succeed.</p>

    <p>This is a remote volunteer position that offers flexibility while making a meaningful impact on the lives of young people who have been forcibly displaced from their homes.</p>
  `,
  responsibilities: `
    <ul>
      <li>Provide one-on-one mentorship to 2-3 students throughout the academic year</li>
      <li>Meet with mentees regularly (minimum 2 hours per month) via video call</li>
      <li>Guide students through university research and application processes</li>
      <li>Review and provide feedback on application essays and personal statements</li>
      <li>Help students identify scholarship opportunities and prepare applications</li>
      <li>Conduct mock interviews and provide professional development guidance</li>
      <li>Attend monthly mentor training and check-in sessions</li>
      <li>Maintain regular communication with RiseNext program coordinators</li>
    </ul>
  `,
  requirements: `
    <ul>
      <li>Bachelor's degree or higher (current university students in final year may apply)</li>
      <li>Experience with higher education application processes (personal or professional)</li>
      <li>Strong communication and interpersonal skills</li>
      <li>Cultural sensitivity and understanding of refugee/displacement issues</li>
      <li>Reliable internet connection for virtual meetings</li>
      <li>Commitment to at least one academic year (10 months)</li>
      <li>Fluency in English; additional languages (French, Swahili, Arabic) are a plus</li>
      <li>Patience, empathy, and genuine desire to support displaced youth</li>
    </ul>
  `,
  deadline: '2025-01-15',
  applicationFormUrl: 'https://forms.google.com/placeholder',
  publishedAt: '2024-12-01',
}

export const metadata: Metadata = {
  title: `${placeholderOpportunity.title} - RiseNext`,
  description: placeholderOpportunity.excerpt,
}

export default async function OpportunityDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug: _slug} = await params
  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-2">
          <h1 className="display-6 animated slideInDown">{placeholderOpportunity.title}</h1>
        </div>
      </div>
      {/* Page Header End */}

      {/* Opportunity Detail Start */}
      <div className="container-fluid py-3">
        <div className="container">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8 wow fadeIn" data-wow-delay="0.1s">
              {/* Overview */}
              <div className="mb-5">
                <h2 className="mb-4">Overview</h2>
                <div dangerouslySetInnerHTML={{__html: placeholderOpportunity.description}}></div>
              </div>

              {/* Responsibilities */}
              <div className="mb-5">
                <h2 className="mb-4">Responsibilities</h2>
                <div
                  dangerouslySetInnerHTML={{__html: placeholderOpportunity.responsibilities}}
                ></div>
              </div>

              {/* Requirements */}
              <div className="mb-5">
                <h2 className="mb-4">Requirements</h2>
                <div dangerouslySetInnerHTML={{__html: placeholderOpportunity.requirements}}></div>
              </div>

              {/* What We Offer */}
              <div className="mb-5">
                <h2 className="mb-4">What We Offer</h2>
                <ul>
                  <li>Comprehensive mentor training and ongoing support</li>
                  <li>Access to a community of passionate mentors worldwide</li>
                  <li>Monthly professional development workshops</li>
                  <li>Letter of recommendation upon successful completion</li>
                  <li>The opportunity to make a lasting impact on a student's life</li>
                  <li>Certificate of volunteer service</li>
                </ul>
              </div>

              {/* Application Process */}
              <div className="mb-5">
                <h2 className="mb-4">Application Process</h2>
                <ol>
                  <li>Submit your application through the form below</li>
                  <li>Complete a brief video interview with our team</li>
                  <li>Attend a mentor orientation session</li>
                  <li>Get matched with your mentee(s)</li>
                  <li>Begin your mentorship journey!</li>
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              {/* Quick Info Card */}
              <div className="bg-light rounded p-4 mb-4">
                <h4 className="mb-4">Quick Information</h4>
                <div className="d-flex align-items-center mb-3">
                  <i className="fa fa-briefcase text-secondary me-3"></i>
                  <div>
                    <small className="text-muted">Type</small>
                    <p className="mb-0 fw-bold">{placeholderOpportunity.type}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fa fa-map-marker-alt text-secondary me-3"></i>
                  <div>
                    <small className="text-muted">Location</small>
                    <p className="mb-0 fw-bold">{placeholderOpportunity.location}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fa fa-clock text-secondary me-3"></i>
                  <div>
                    <small className="text-muted">Employment Type</small>
                    <p className="mb-0 fw-bold">{placeholderOpportunity.employmentType}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fa fa-calendar text-secondary me-3"></i>
                  <div>
                    <small className="text-muted">Application Deadline</small>
                    <p className="mb-0 fw-bold">
                      {new Date(placeholderOpportunity.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa fa-calendar-check text-secondary me-3"></i>
                  <div>
                    <small className="text-muted">Posted</small>
                    <p className="mb-0 fw-bold">
                      {new Date(placeholderOpportunity.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="bg-secondary rounded p-4 mb-4 text-center">
                <h4 className="text-white mb-3">Ready to Apply?</h4>
                <p className="text-white mb-4">
                  Join us in making a difference in the lives of displaced students.
                </p>
                <a
                  href={placeholderOpportunity.applicationFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded py-3 px-5 w-100"
                >
                  Apply Now
                  <i className="fa fa-arrow-right ms-2"></i>
                </a>
              </div>

              {/* Share */}
              <div className="bg-light rounded p-4">
                <h5 className="mb-3">Share This Opportunity</h5>
                <div className="d-flex">
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href="https://www.instagram.com/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(placeholderOpportunity.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Opportunities */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <a href="/opportunities" className="btn btn-secondary rounded py-3 px-5">
                <i className="fa fa-arrow-left me-2"></i>
                Back to All Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Opportunity Detail End */}
    </>
  )
}
