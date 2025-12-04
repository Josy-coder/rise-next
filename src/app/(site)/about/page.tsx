'use client'

export default function AboutPage() {
  return (
    <>
      {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.2s">
              <div className="about-img">
                <img
                  className="img-fluid w-100"
                  src="/charitize-img/about.jpg"
                  alt="About RiseNext"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="section-title bg-white text-start text-primary pe-3 fw-bold">
                About Us
              </p>
              <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.2s">
                Empowering Displaced Students Through Education
              </h1>
              <p className="mb-4 wow fadeIn" data-wow-delay="0.3s">
                RiseNext is a mentoring program created by Team Eagles (Amina Mkova, Obed Korusenge
                Nsanzimfura, Joselyto Charite Baho Kemana, and Nimco Ibrahim) that bridges the
                knowledge gap for forcibly displaced high school and university students to access
                higher education opportunities. We won the 2024 CIEE UNHCR Student Challenge.
              </p>
              <div className="row g-4 pt-2">
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                  <div className="h-100">
                    <h3>Our Mission</h3>
                    <p>
                      To empower forcibly displaced students by providing mentorship, resources, and
                      guidance to access higher education opportunities worldwide.
                    </p>
                    <p className="text-dark">
                      <i className="fa fa-check text-primary me-2"></i>Bridge the knowledge gap
                    </p>
                    <p className="text-dark">
                      <i className="fa fa-check text-primary me-2"></i>Provide mentorship & guidance
                    </p>
                    <p className="text-dark mb-0">
                      <i className="fa fa-check text-primary me-2"></i>Connect to opportunities
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                  <div className="h-100 bg-primary rounded p-4 text-center">
                    <p className="fs-5 text-dark">
                      Join us in creating pathways to higher education for displaced students around
                      the world.
                    </p>
                    <a className="btn btn-secondary rounded py-2 px-4" href="/contact">
                      Get Involved
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Cohorts Start */}
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeIn"
            data-wow-delay="0.1s"
            style={{maxWidth: '500px'}}
          >
            <h1 className="display-6 mb-4">Meet Our Mentee Cohorts</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="bg-white rounded h-100 p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="btn-lg-square bg-secondary rounded text-white flex-shrink-0">
                    <i className="fa fa-graduation-cap fa-2x"></i>
                  </div>
                  <div className="ps-3">
                    <h4 className="mb-0">Cohort 1</h4>
                    <span className="text-muted">September 2024</span>
                  </div>
                </div>
                <p className="mb-4">
                  Our inaugural cohort of 45 mentees from refugee camps across East Africa, focused
                  on college application guidance and scholarship opportunities.
                </p>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-dark">
                    <i className="fa fa-users text-secondary me-2"></i>45 Mentees
                  </span>
                </div>
                <div className="progress rounded mb-3" style={{height: '5px'}}>
                  <div
                    className="progress-bar bg-primary rounded-end"
                    role="progressbar"
                    style={{width: '100%'}}
                  ></div>
                </div>
                <span className="badge bg-success rounded">Completed</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="bg-white rounded h-100 p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="btn-lg-square bg-secondary rounded text-white flex-shrink-0">
                    <i className="fa fa-graduation-cap fa-2x"></i>
                  </div>
                  <div className="ps-3">
                    <h4 className="mb-0">Cohort 2</h4>
                    <span className="text-muted">January 2025</span>
                  </div>
                </div>
                <p className="mb-4">
                  Our second cohort expanded to 60 mentees with a focus on university transition
                  support and career development pathways.
                </p>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-dark">
                    <i className="fa fa-users text-secondary me-2"></i>60 Mentees
                  </span>
                </div>
                <div className="progress rounded mb-3" style={{height: '5px'}}>
                  <div
                    className="progress-bar bg-primary rounded-end"
                    role="progressbar"
                    style={{width: '75%'}}
                  ></div>
                </div>
                <span className="badge bg-primary text-dark rounded">Active</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="bg-white rounded h-100 p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="btn-lg-square bg-secondary rounded text-white flex-shrink-0">
                    <i className="fa fa-graduation-cap fa-2x"></i>
                  </div>
                  <div className="ps-3">
                    <h4 className="mb-0">Cohort 3</h4>
                    <span className="text-muted">May 2025</span>
                  </div>
                </div>
                <p className="mb-4">
                  Our upcoming cohort will support 75 mentees with enhanced programming including
                  skills training and internship connections.
                </p>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-dark">
                    <i className="fa fa-users text-secondary me-2"></i>75 Mentees
                  </span>
                </div>
                <div className="progress mb-3 rounded" style={{height: '5px'}}>
                  <div
                    className="progress-bar bg-secondary rounded-end"
                    role="progressbar"
                    style={{width: '25%'}}
                  ></div>
                </div>
                <span className="badge bg-dark text-primary rounded">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cohorts End */}

      {/* Video Start */}
      <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-11">
              <div className="h-100 py-5 d-flex align-items-center">
                <button
                  type="button"
                  className="btn-play"
                  data-bs-toggle="modal"
                  data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                  data-bs-target="#videoModal"
                >
                  <span></span>
                </button>
                <h3 className="ms-5 mb-0">
                  Together, we can build a world where everyone has the chance to thrive.
                </h3>
              </div>
            </div>
            <div className="d-none d-lg-block col-lg-1">
              <div className="h-100 w-100 bg-secondary d-flex align-items-center justify-content-center">
                <span className="text-white" style={{transform: 'rotate(-90deg)'}}>
                  Scroll Down
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video End */}

      {/* Video Modal Start */}
      <div
        className="modal fade"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  id="video"
                  allowFullScreen
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video Modal End */}

      {/* Team Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeIn"
            data-wow-delay="0.1s"
            style={{maxWidth: '500px'}}
          >
            <p className="section-title bg-white text-center text-primary px-3 fw-bold">Our Team</p>
            <h1 className="display-6 mb-4">Meet Our Founders - Team Eagles</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="team-item bg-light rounded d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img
                    className="img-fluid rounded mb-4"
                    src="/charitize-img/team-1.jpg"
                    alt="Amina Mkova"
                  />
                  <h3>Amina Mkova</h3>
                  <span>Co-Founder</span>
                </div>
                <div className="team-social bg-secondary rounded d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a
                    className="btn btn-square btn-primary rounded my-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <div className="team-item bg-light rounded d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img
                    className="img-fluid rounded mb-4"
                    src="/charitize-img/team-2.jpg"
                    alt="Obed Korusenge"
                  />
                  <h3>Obed Korusenge</h3>
                  <span>Co-Founder</span>
                </div>
                <div className="team-social bg-secondary rounded d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a
                    className="btn btn-square btn-primary rounded my-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <div className="team-item bg-light rounded d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img
                    className="img-fluid rounded mb-4"
                    src="/charitize-img/team-3.jpg"
                    alt="Joselyto Charite"
                  />
                  <h3>Joselyto Charite</h3>
                  <span>Co-Founder</span>
                </div>
                <div className="team-social bg-secondary rounded d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a
                    className="btn btn-square btn-primary rounded my-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <div className="team-item bg-light rounded d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img
                    className="img-fluid rounded mb-4"
                    src="/charitize-img/team-1.jpg"
                    alt="Nimco Ibrahim"
                  />
                  <h3>Nimco Ibrahim</h3>
                  <span>Co-Founder</span>
                </div>
                <div className="team-social bg-secondary rounded d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a
                    className="btn btn-square btn-primary rounded my-2"
                    href="https://www.linkedin.com/company/risenext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  )
}
