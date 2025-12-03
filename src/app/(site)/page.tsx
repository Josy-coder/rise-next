import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home - RiseNext | Empowering Displaced Students',
  description:
    'Together for a Better Tomorrow. We believe in creating opportunities and empowering communities through education, mentorship, and sustainable development.',
}

export default function HomePage() {
  return (
    <>
      {/* Spinner Start */}
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{width: '3rem', height: '3rem'}}
        ></div>
      </div>
      {/* Spinner End */}

      {/* Carousel Start */}
      <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
        <div className="owl-carousel header-carousel py-3">
          <div className="container py-3">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <div className="carousel-text">
                  <h1 className="display-4 text-uppercase mb-3">Together for a Better Tomorrow</h1>
                  <p className="fs-5 mb-5">
                    We believe in creating opportunities and empowering communities through
                    education, healthcare, and sustainable development.
                  </p>
                  <div className="d-flex">
                    <a className="btn btn-primary py-3 px-4 me-3" href="">
                      Donate Now
                    </a>
                    <a className="btn btn-secondary py-3 px-4" href="">
                      Join Us Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="carousel-img">
                  <img className="w-100" src="/charitize-img/carousel-1.jpg" alt="Image" />
                </div>
              </div>
            </div>
          </div>
          <div className="container py-3">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <div className="carousel-text">
                  <h1 className="display-4 text-uppercase mb-3">Together, We Can End Hunger</h1>
                  <p className="fs-5 mb-5">
                    No one should go to bed hungry. Your support helps us bring smiles, hope, and a
                    brighter future to those in need.
                  </p>
                  <div className="d-flex mt-4">
                    <a className="btn btn-primary py-3 px-4 me-3" href="">
                      Donate Now
                    </a>
                    <a className="btn btn-secondary py-3 px-4" href="">
                      Join Us Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="carousel-img">
                  <img className="w-100" src="/charitize-img/carousel-2.jpg" alt="Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}

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

      {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.2s">
              <div className="about-img">
                <img className="img-fluid w-100" src="/charitize-img/about.jpg" alt="Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="section-title bg-white text-start text-primary pe-3">About Us</p>
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
                  <div className="h-100 bg-primary p-4 text-center">
                    <p className="fs-5 text-dark">
                      Through your donations, we spread kindness and support to children and
                      families.
                    </p>
                    <a className="btn btn-secondary py-2 px-4" href="">
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
              <p className="section-title bg-white text-start text-primary pe-3">Why Us!</p>
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
                <a className="btn btn-primary py-3 px-4 me-3" href="">
                  Donate Now
                </a>
                <a className="btn btn-secondary py-3 px-4" href="">
                  Join Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features End */}

      {/* Donation Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeIn"
            data-wow-delay="0.1s"
            style={{maxWidth: '500px'}}
          >
            <p className="section-title bg-white text-center text-primary px-3">Donation</p>
            <h1 className="display-6 mb-4">Our Donation Causes Around the World</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="donation-item d-flex h-100 p-4">
                <div className="donation-progress d-flex flex-column flex-shrink-0 text-center me-4">
                  <h6 className="mb-0">Raised</h6>
                  <span className="mb-2">$8000</span>
                  <div className="progress d-flex align-items-end w-100 h-100 mb-2">
                    <div
                      className="progress-bar w-100 bg-secondary"
                      role="progressbar"
                      aria-valuenow={85}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="fs-4">85%</span>
                    </div>
                  </div>
                  <h6 className="mb-0">Goal</h6>
                  <span>$10000</span>
                </div>
                <div className="donation-detail">
                  <div className="position-relative mb-4">
                    <img className="img-fluid w-100" src="/charitize-img/donation-1.jpg" alt="" />
                    <a
                      href="#"
                      className="btn btn-sm btn-secondary px-3 position-absolute top-0 end-0"
                    >
                      Food
                    </a>
                  </div>
                  <a href="#" className="h3 d-inline-block">
                    Healthy Food
                  </a>
                  <p>
                    Through your donations and volunteer work, we spread kindness and support to
                    children.
                  </p>
                  <a href="#" className="btn btn-primary w-100 py-3">
                    <i className="fa fa-plus me-2"></i>Donate Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="donation-item d-flex h-100 p-4">
                <div className="donation-progress d-flex flex-column flex-shrink-0 text-center me-4">
                  <h6 className="mb-0">Raised</h6>
                  <span className="mb-2">$8000</span>
                  <div className="progress d-flex align-items-end w-100 h-100 mb-2">
                    <div
                      className="progress-bar w-100 bg-secondary"
                      role="progressbar"
                      aria-valuenow={95}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="fs-4">95%</span>
                    </div>
                  </div>
                  <h6 className="mb-0">Goal</h6>
                  <span>$10000</span>
                </div>
                <div className="donation-detail">
                  <div className="position-relative mb-4">
                    <img className="img-fluid w-100" src="/charitize-img/donation-2.jpg" alt="" />
                    <a
                      href="#"
                      className="btn btn-sm btn-secondary px-3 position-absolute top-0 end-0"
                    >
                      Health
                    </a>
                  </div>
                  <a href="#" className="h3 d-inline-block">
                    Water Treatment
                  </a>
                  <p>
                    Through your donations and volunteer work, we spread kindness and support to
                    children.
                  </p>
                  <a href="#" className="btn btn-primary w-100 py-3">
                    <i className="fa fa-plus me-2"></i>Donate Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="donation-item d-flex h-100 p-4">
                <div className="donation-progress d-flex flex-column flex-shrink-0 text-center me-4">
                  <h6 className="mb-0">Raised</h6>
                  <span className="mb-2">$8000</span>
                  <div className="progress d-flex align-items-end w-100 h-100 mb-2">
                    <div
                      className="progress-bar w-100 bg-secondary"
                      role="progressbar"
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="fs-4">75%</span>
                    </div>
                  </div>
                  <h6 className="mb-0">Goal</h6>
                  <span>$10000</span>
                </div>
                <div className="donation-detail">
                  <div className="position-relative mb-4">
                    <img className="img-fluid w-100" src="/charitize-img/donation-3.jpg" alt="" />
                    <a
                      href="#"
                      className="btn btn-sm btn-secondary px-3 position-absolute top-0 end-0"
                    >
                      Education
                    </a>
                  </div>
                  <a href="#" className="h3 d-inline-block">
                    Education Support
                  </a>
                  <p>
                    Through your donations and volunteer work, we spread kindness and support to
                    children.
                  </p>
                  <a href="#" className="btn btn-primary w-100 py-3">
                    <i className="fa fa-plus me-2"></i>Donate Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Donation End */}

      {/* Donate Start */}
      <div className="container-fluid donate py-5">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-7 donate-text bg-light py-5 wow fadeIn" data-wow-delay="0.1s">
              <div
                className="d-flex flex-column justify-content-center h-100 p-5 wow fadeIn"
                data-wow-delay="0.3s"
              >
                <h1 className="display-6 mb-4">Let's Donate to Needy People for Better Lives</h1>
                <p className="fs-5 mb-0">
                  Through your donations, we spread kindness and support to children, families, and
                  communities struggling to find stability.
                </p>
              </div>
            </div>
            <div
              className="col-lg-5 donate-form bg-primary py-5 text-center wow fadeIn"
              data-wow-delay="0.5s"
            >
              <div className="h-100 p-5">
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio1"
                          autoComplete="off"
                          defaultChecked
                        />
                        <label className="btn btn-light" htmlFor="btnradio1">
                          $10
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio2"
                          autoComplete="off"
                        />
                        <label className="btn btn-light" htmlFor="btnradio2">
                          $20
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio3"
                          autoComplete="off"
                        />
                        <label className="btn btn-light" htmlFor="btnradio3">
                          $30
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio4"
                          autoComplete="off"
                        />
                        <label className="btn btn-light" htmlFor="btnradio4">
                          $40
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio5"
                          autoComplete="off"
                        />
                        <label className="btn btn-light" htmlFor="btnradio5">
                          $50
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-secondary py-3 w-100" type="submit">
                        Donate Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Donate End */}

      {/* Team Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeIn"
            data-wow-delay="0.1s"
            style={{maxWidth: '500px'}}
          >
            <p className="section-title bg-white text-center text-primary px-3">Our Team</p>
            <h1 className="display-6 mb-4">Meet Our Dedicated Team Members</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="team-item d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img className="img-fluid mb-4" src="/charitize-img/team-1.jpg" alt="" />
                  <h3>Boris Johnson</h3>
                  <span>Founder & CEO</span>
                </div>
                <div className="team-social bg-light d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="team-item d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img className="img-fluid mb-4" src="/charitize-img/team-2.jpg" alt="" />
                  <h3>Donald Pakura</h3>
                  <span>Project Manager</span>
                </div>
                <div className="team-social bg-light d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="team-item d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img className="img-fluid mb-4" src="/charitize-img/team-3.jpg" alt="" />
                  <h3>Alexander Bell</h3>
                  <span>Volunteer</span>
                </div>
                <div className="team-social bg-light d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-square btn-primary my-2" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

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
                        <img className="img-fluid" src="/charitize-img/testimonial-1.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <div className="mb-2">
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                        </div>
                        <p className="fs-5">
                          Education is the foundation of change. By funding schools, scholarships,
                          and training programs, we can help children and adults unlock their
                          potential for a better future.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-light text-secondary flex-shrink-0">
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
                        <img className="img-fluid" src="/charitize-img/testimonial-2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <div className="mb-2">
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                        </div>
                        <p className="fs-5">
                          Every hand extended in kindness brings us closer to a world free from
                          suffering. Be part of a global movement dedicated to building a future
                          where equality and compassion thrive.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-light text-secondary flex-shrink-0">
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
                        <img className="img-fluid" src="/charitize-img/testimonial-3.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="testimonial-text pb-5 pb-md-0">
                        <div className="mb-2">
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                          <i className="fa fa-star text-primary"></i>
                        </div>
                        <p className="fs-5">
                          Love and compassion have the power to heal. Through your donations and
                          volunteer work, we can spread kindness and support to children, families,
                          and communities struggling to find stability.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="btn-lg-square bg-light text-secondary flex-shrink-0">
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
