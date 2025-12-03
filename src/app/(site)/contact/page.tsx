import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - RiseNext | Get in Touch',
  description:
    'Contact RiseNext to learn more about our mentoring program for displaced students. Located in Kigali, Rwanda.',
}

export default function ContactPage() {
  return (
    <>

      {/* Contact Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
              <p className="section-title bg-white text-start text-primary pe-3 fw-bold">Contact</p>
              <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.2s">
                If You Have Any Query, Please Contact Us
              </h1>
            
              <div className="d-flex mb-3">
                <div className="flex-shrink-0 btn-lg-square rounded bg-primary">
                  <i className="fa fa-map-marker-alt text-dark"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-secondary">Office</h5>
                  <p className="mb-0">
                    KG 12 Ave, Kinyinya
                    <br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="flex-shrink-0 btn-lg-square rounded bg-primary">
                  <i className="fa fa-phone-alt text-dark"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-secondary">Mobile</h5>
                  <p className="mb-0">+250 787 973 747</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="flex-shrink-0 btn-lg-square rounded bg-primary">
                  <i className="fa fa-envelope-open text-dark"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-secondary">Email</h5>
                  <p className="mb-0">info@rise-next.org</p>
                </div>
              </div>
              <iframe
                className="w-100 mt-4"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127575.19291394578!2d29.918652!3d-1.970579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xe9391a68947d8e35!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890"
                frameBorder="0"
                style={{height: '350px', border: '0'}}
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
            <div className="col-lg-7 wow fadeIn" data-wow-delay="0.3s">
              <p className="mb-4">
                We're here to help displaced students access higher education opportunities. Reach
                out to us for mentorship, guidance, or to get involved with RiseNext.
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control rounded"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control rounded"
                        placeholder="Leave a message here"
                        id="message"
                        style={{height: '250px'}}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary rounded py-3 px-4" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-4">
                <h5 className="mb-3">Connect With Us</h5>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  )
}
