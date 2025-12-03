import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Opportunities - RiseNext | Career, Volunteering & Cohort Applications',
  description:
    'Explore career opportunities, volunteering positions, and cohort applications at RiseNext. Join us in empowering displaced students.',
}

// Placeholder data - will be replaced with Sanity later
const placeholderOpportunities = [
  {
    slug: 'volunteer-mentor-displaced-students',
    title: 'Volunteer Mentor for Displaced Students',
    type: 'Volunteering',
    location: 'Remote',
    employmentType: 'Volunteer',
    excerpt:
      'Help guide displaced high school and university students through the higher education application process.',
    deadline: '2025-01-15',
    isActive: true,
  },
  {
    slug: 'student-success-coordinator',
    title: 'Student Success Coordinator',
    type: 'Career',
    location: 'Kigali, Rwanda',
    employmentType: 'Full-time',
    excerpt:
      'Join our team to coordinate programs and support services for displaced students seeking higher education.',
    deadline: '2025-01-20',
    isActive: true,
  },
  {
    slug: 'risenext-mentee-cohort-2025',
    title: 'RiseNext Mentee Cohort 2025',
    type: 'Cohort Application',
    location: 'Rwanda & East Africa',
    employmentType: 'Program',
    excerpt:
      'Are you a displaced high school or university student? Apply to join our 2025 mentorship cohort.',
    deadline: '2025-02-01',
    isActive: true,
  },
  {
    slug: 'communications-marketing-volunteer',
    title: 'Communications & Marketing Volunteer',
    type: 'Volunteering',
    location: 'Remote',
    employmentType: 'Volunteer',
    excerpt:
      'Help us spread the word about RiseNext through social media, content creation, and community engagement.',
    deadline: '2025-01-25',
    isActive: true,
  },
  {
    slug: 'partnership-development-manager',
    title: 'Partnership Development Manager',
    type: 'Career',
    location: 'Hybrid - Kigali',
    employmentType: 'Part-time',
    excerpt:
      'Build strategic partnerships with universities, NGOs, and organizations to expand opportunities for our students.',
    deadline: '2025-02-10',
    isActive: true,
  },
  {
    slug: 'workshop-facilitator',
    title: 'Workshop Facilitator',
    type: 'Volunteering',
    location: 'Kigali, Rwanda',
    employmentType: 'Volunteer',
    excerpt:
      'Lead skills-building workshops in areas like essay writing, interview preparation, and academic planning.',
    deadline: '2025-01-30',
    isActive: true,
  },
]

export default function OpportunitiesPage() {
  return (
    <>
      {/* Opportunities Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeIn" data-wow-delay="0.1s">
            <p className="section-title bg-white text-center text-primary px-3 fw-bold">Get Involved</p>
            <h1 className="display-6 mb-4">Current Opportunities</h1>
            <p className="mb-0">
              Whether you're looking to make a difference as a volunteer, seeking a career with
              purpose, or a displaced student ready to take the next step in your education journey,
              we have opportunities for you.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="row mb-4 wow fadeIn" data-wow-delay="0.2s">
            <div className="col-12 ">
              <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-4">
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2 active" href="#">
                    <i className="fa fa-briefcase fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Show All</small>
                      <h6 className="mt-n1 mb-0">All Opportunities</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-handshake fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Volunteering</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-user-tie fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Careers</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-graduation-cap fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Student Cohorts</h6>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="row g-4">
            {placeholderOpportunities.map((opportunity, index) => (
              <div
                key={opportunity.slug}
                className="col-lg-4 col-md-6 wow fadeIn"
                data-wow-delay={`${0.1 + index * 0.1}s`}
              >
                <div className="service-item bg-light h-100 p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center mb-0">
                      <i
                        className={`fa ${
                          opportunity.type === 'Career'
                            ? 'fa-user-tie'
                            : opportunity.type === 'Volunteering'
                              ? 'fa-handshake'
                              : 'fa-graduation-cap'
                        } fa-2x text-secondary p-3`}
                      ></i>
                    </div>
                    <span className="badge bg-primary text-dark  text-uppercase">{opportunity.type}</span>
                  </div>
                  <h5 className="mb-3">{opportunity.title}</h5>
                  <p className="mb-3">{opportunity.excerpt}</p>
                  <div className="mb-3">
                    <small className="text-body">
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {opportunity.location}
                    </small>
                    <br />
                    <small className="text-body">
                      <i className="fa fa-clock text-primary me-2"></i>
                      {opportunity.employmentType}
                    </small>
                    <br />
                    <small className="text-body">
                      <i className="fa fa-calendar text-primary me-2"></i>
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </small>
                  </div>
                  <a
                    className="btn btn-secondary py-2 px-4"
                    href={`/opportunities/${opportunity.slug}`}
                  >
                    View Details
                    <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Opportunities End */}

      {/* Call to Action Start */}
      <div
        className="container-fluid bg-secondary text-white py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center">
          <h2 className="display-6 text-white mb-4">Don't See What You're Looking For?</h2>
          <p className="mb-4">
            We're always looking for passionate individuals to join our mission. Reach out to us to
            discuss other ways you can contribute to empowering displaced students.
          </p>
          <a href="/contact" className="btn btn-primary py-3 px-5">
            Get In Touch
          </a>
        </div>
      </div>
      {/* Call to Action End */}
    </>
  )
}
