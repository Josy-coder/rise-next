import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Donate - RiseNext | Support Displaced Students',
  description:
    'Support RiseNext in empowering displaced students to access higher education. Your donation makes a lasting impact.',
}

export default function DonatePage() {
  return (
    <>
      {/* Donate Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <p className="section-title bg-white text-start text-primary pe-3 fw-bold">
                Make a Difference
              </p>
              <h1 className="display-6 mb-4">Your Donation Changes Lives</h1>
              <p className="mb-4">
                RiseNext is dedicated to empowering forcibly displaced high school and university
                students to access higher education opportunities. Your generous donation helps us
                provide mentorship, resources, and guidance to students who have been displaced from
                their homes.
              </p>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-secondary rounded-circle">
                      <i className="fa fa-graduation-cap text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">Mentorship Programs</h5>
                      <span className="text-muted">One-on-one guidance</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-secondary rounded-circle">
                      <i className="fa fa-book text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">Educational Resources</h5>
                      <span className="text-muted">Study materials & tools</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-secondary rounded-circle">
                      <i className="fa fa-laptop text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">Workshops & Training</h5>
                      <span className="text-muted">Skills development</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-secondary rounded-circle">
                      <i className="fa fa-hands-helping text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">Application Support</h5>
                      <span className="text-muted">University applications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
              <div className="bg-secondary rounded-start rounded-end p-5">
                <h4 className="mb-4 fw-bold text-primary">Choose Your Donation Amount</h4>
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="btn-group w-100 rounded" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          name="amount"
                          id="amount25"
                          value="25"
                        />
                        <label className="btn btn-outline-primary rounded-start" htmlFor="amount25">
                          $25
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="amount"
                          id="amount50"
                          value="50"
                        />
                        <label className="btn btn-outline-primary" htmlFor="amount50">
                          $50
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="amount"
                          id="amount100"
                          value="100"
                        />
                        <label className="btn btn-outline-primary" htmlFor="amount100">
                          $100
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="amount"
                          id="amount250"
                          value="250"
                        />
                        <label className="btn btn-outline-primary rounded-end" htmlFor="amount250">
                          $250
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control rounded"
                          id="customAmount"
                          placeholder="Custom Amount"
                        />
                        <label htmlFor="customAmount">Custom Amount ($)</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input " type="checkbox" id="monthlyDonation" />
                        <label className="form-check-label text-white" htmlFor="monthlyDonation">
                          Make this a monthly donation
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control rounded"
                          id="firstName"
                          placeholder="First Name"
                        />
                        <label htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control rounded"
                          id="lastName"
                          placeholder="Last Name"
                        />
                        <label htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control rounded"
                          id="email"
                          placeholder="Email"
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary rounded py-3 px-5 w-100" type="submit">
                        Donate Now
                      </button>
                    </div>
                    <div className="col-12 text-center">
                      <small className="text-primary">
                        Your donation is secure and tax-deductible
                      </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Donate End */}

      {/* Other Ways to Help Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeIn" data-wow-delay="0.1s">
            <p className="section-title bg-white text-center text-primary px-3 fw-bold">
              Get Involved
            </p>
            <h1 className="display-6 mb-4">Other Ways to Support Us</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="service-item bg-light rounded h-100 p-5 text-center d-flex flex-column">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 mx-auto">
                  <i className="fa fa-user-friends fa-3x text-secondary p-4"></i>
                </div>
                <h4 className="mb-3">Become a Mentor</h4>
                <p className="mb-4 flex-grow-1">
                  Share your knowledge and experience by mentoring a displaced student through their
                  higher education journey.
                </p>
                <div className="mt-auto">
                  <a className="btn btn-secondary rounded py-2 px-4" href="/opportunities">
                    Learn More
                    <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <div className="service-item bg-light rounded h-100 p-5 text-center d-flex flex-column">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 mx-auto">
                  <i className="fa fa-handshake fa-3x text-secondary p-4"></i>
                </div>
                <h4 className="mb-3">Partner With Us</h4>
                <p className="mb-4 flex-grow-1">
                  Organizations and institutions can partner with RiseNext to expand opportunities
                  for displaced students.
                </p>
                <div className="mt-auto">
                  <a className="btn btn-secondary rounded py-2 px-4" href="/contact">
                    Get in Touch
                    <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="service-item bg-light rounded h-100 p-5 text-center d-flex flex-column">
                <div className="d-inline-flex align-items-center justify-content-center  rounded-circle mb-4 mx-auto">
                  <i className="fa fa-share-alt fa-3x text-secondary p-4"></i>
                </div>
                <h4 className="mb-3">Spread the Word</h4>
                <p className="mb-4 flex-grow-1">
                  Help us reach more students and supporters by sharing RiseNext on your social
                  media platforms.
                </p>
                <div className="mt-auto d-flex justify-content-center">
                  <a
                    className="btn btn-square btn-secondary rounded me-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    className="btn btn-square btn-secondary rounded me-2"
                    href="https://www.instagram.com/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Other Ways to Help End */}
    </>
  )
}
