"use client"

import HeroCarousel from "@/components/sections/HeroCarousel"

export default function HomePage() {
  return (
    <>


      <HeroCarousel />

      {/* Video Start */}
      <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-11">
              <div className="h-100 py-5 d-flex align-items-center">
                <button
                  type="button"
                  className="btn-play rounded"
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
          <div className="modal-content rounded">
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
                  className="embed-responsive-item rounded-bottom"
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

      {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.2s">
              <div className="about-img">
                <img
                  className="img-fluid w-100 rounded"
                  src="/charitize-img/about.jpg"
                  alt="Image"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="section-title bg-white text-start text-primary pe-3 fw-bold">
                About Us
              </p>
              <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.2s">
                Join Hands, Change the World
              </h1>
              <p className="mb-4 wow fadeIn" data-wow-delay="0.3s">
                Every hand extended in kindness brings us closer to a world free from suffering. Be
                part of a global movement dedicated to building a future where equality and
                compassion thrive.
              </p>
              <div className="row g-4 pt-2">
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                  <div className="h-100">
                    <h3>Our Mission</h3>
                    <p>
                      Our mission is to uplift underprivileged communities by providing resources,
                      education, and tools for growth.
                    </p>
                    <p className="text-dark">
                      <i className="fa fa-check text-primary me-2"></i>No one should go to bed
                      hungry.
                    </p>
                    <p className="text-dark">
                      <i className="fa fa-check text-primary me-2"></i>We spread kindness and
                      support.
                    </p>
                    <p className="text-dark mb-0">
                      <i className="fa fa-check text-primary me-2"></i>We can change someone's life.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                  <div className="h-100 bg-primary p-4 text-center rounded">
                    <p className="fs-5 text-dark">
                      Through your donations, we spread kindness and support to children and
                      families.
                    </p>
                    <a className="btn btn-secondary rounded py-2 px-4" href="">
                      Donate Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Features Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="rounded overflow-hidden">
                <div className="row g-0">
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="text-center bg-primary py-5 px-4 h-100">
                      <i className="fa fa-users fa-3x text-secondary mb-3"></i>
                      <h1 className="display-5 mb-0" data-toggle="counter-up">
                        500
                      </h1>
                      <span className="text-dark">Team Members</span>
                    </div>
                  </div>
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                    <div className="text-center bg-secondary py-5 px-4 h-100">
                      <i className="fa fa-award fa-3x text-primary mb-3"></i>
                      <h1 className="display-5 text-white mb-0" data-toggle="counter-up">
                        70
                      </h1>
                      <span className="text-white">Award Winning</span>
                    </div>
                  </div>
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                    <div className="text-center bg-secondary py-5 px-4 h-100">
                      <i className="fa fa-list-check fa-3x text-primary mb-3"></i>
                      <h1 className="display-5 text-white mb-0" data-toggle="counter-up">
                        3000
                      </h1>
                      <span className="text-white">Total Projects</span>
                    </div>
                  </div>
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                    <div className="text-center bg-primary py-5 px-4 h-100">
                      <i className="fa fa-comments fa-3x text-secondary mb-3"></i>
                      <h1 className="display-5 mb-0" data-toggle="counter-up">
                        7000
                      </h1>
                      <span className="text-dark">Client's Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <p className="section-title bg-white text-start text-primary pe-3 fw-bold">Why Us!</p>
              <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.2s">
                Few Reasons Why People Choosing Us!
              </h1>
              <p className="mb-4 wow fadeIn" data-wow-delay="0.3s">
                We believe in creating opportunities and empowering communities through education,
                healthcare, and sustainable development. Your support helps us bring smiles, hope,
                and a brighter future to those in need.
              </p>
              <p className="text-dark wow fadeIn" data-wow-delay="0.4s">
                <i className="fa fa-check text-primary me-2"></i>Justo magna erat amet
              </p>
              <p className="text-dark wow fadeIn" data-wow-delay="0.5s">
                <i className="fa fa-check text-primary me-2"></i>Aliqu diam amet diam et eos
              </p>
              <p className="text-dark wow fadeIn" data-wow-delay="0.6s">
                <i className="fa fa-check text-primary me-2"></i>Clita erat ipsum et lorem et sit
              </p>
              <div className="d-flex mt-4 wow fadeIn" data-wow-delay="0.7s">
                <a className="btn btn-secondary rounded py-3 px-4" href="">
                  Join Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features End */}

      {/* Testimonial Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-12 col-lg-4 col-xl-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="testimonial-title">
                <h1 className="display-6 mb-4">What People Say About Our Activities.</h1>
                <p className="fs-5 mb-0">
                  We work to bring smiles, hope, and a brighter future to those in need.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              <div className="owl-carousel testimonial-carousel wow fadeIn" data-wow-delay="0.3s">
                <div className="testimonial-item">
                  <div className="row g-5 align-items-center">
                    <div className="col-md-6">
                      <div className="testimonial-img">
                        <img
                          className="img-fluid rounded"
                          src="/charitize-img/testimonial-1.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <p className="fs-5">
                          Education is the foundation of change. By funding schools, scholarships,
                          and training programs, we can help children and adults unlock their
                          potential for a better future.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-primary rounded text-white flex-shrink-0">
                            <i className="fa fa-quote-right fa-2x"></i>
                          </div>
                          <div className="ps-3">
                            <h5 className="mb-0">Alexander Bell</h5>
                            <span>CEO, Founder</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="row g-5 align-items-center">
                    <div className="col-md-6">
                      <div className="testimonial-img">
                        <img
                          className="img-fluid rounded"
                          src="/charitize-img/testimonial-2.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <p className="fs-5">
                          Every hand extended in kindness brings us closer to a world free from
                          suffering. Be part of a global movement dedicated to building a future
                          where equality and compassion thrive.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-primary rounded text-white flex-shrink-0">
                            <i className="fa fa-quote-right fa-2x"></i>
                          </div>
                          <div className="ps-3">
                            <h5 className="mb-0">Donald Pakura</h5>
                            <span>CEO, Founder</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="row g-5 align-items-center">
                    <div className="col-md-6">
                      <div className="testimonial-img">
                        <img
                          className="img-fluid rounded"
                          src="/charitize-img/testimonial-3.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <p className="fs-5">
                          Love and compassion have the power to heal. Through your donations and
                          volunteer work, we can spread kindness and support to children, families,
                          and communities struggling to find stability.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-primary rounded text-white flex-shrink-0">
                            <i className="fa fa-quote-right fa-2x"></i>
                          </div>
                          <div className="ps-3">
                            <h5 className="mb-0">Boris Johnson</h5>
                            <span>CEO, Founder</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  )
}
