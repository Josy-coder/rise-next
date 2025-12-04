'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import Gallery from '@/components/ui/Gallery'

const galleryImages = [
  '/charitize-img/gallery-1.jpg',
  '/charitize-img/gallery-2.jpg',
  '/charitize-img/gallery-3.jpg',
  '/charitize-img/gallery-4.jpg',
  '/charitize-img/gallery-5.jpg',
  '/charitize-img/gallery-6.jpg',
]

interface SiteSettings {
  title: string
  contactEmail?: string
  contactPhone?: string
  location?: {
    addressLine1?: string
    addressLine2?: string
    city?: string
    country?: string
  }
  socialLinks?: {
    facebook?: string
    linkedin?: string
    instagram?: string
  }
}

interface FooterProps {
  siteSettings: SiteSettings
}

export default function Footer({siteSettings}: FooterProps) {
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setShowGalleryModal(true)
  }

  const closeGallery = () => {
    setShowGalleryModal(false)
  }

  return (
    <>
      {/* Newsletter Start */}
      <div className="container-fluid bg-primary py-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-6 mb-4">Subscribe the Newsletter</h1>
              <div className="position-relative w-100 mb-2">
                <input
                  className="form-control rounded border-0 w-100 ps-4 pe-5"
                  type="text"
                  placeholder="Enter Your Email"
                  style={{height: '60px'}}
                />
                <button
                  type="button"
                  className="btn btn-lg-square shadow-none position-absolute top-0 end-0 mt-2 me-2"
                >
                  <i className="fa fa-paper-plane text-dark fs-4"></i>
                </button>
              </div>
              <p className="mb-0 text-dark">Don't worry, we won't spam you with emails.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Newsletter End */}

      {/* Footer Start */}
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-5 py-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Our Office</h4>
              <p className="mb-2 d-flex align-items-start">
                <i className="fa fa-map-marker-alt me-3"></i>
                <span>
                  <span>KG 12 Ave, Kinyinya</span>
                  <br />
                  <span>Kigali, Rwanda</span>
                </span>
              </p>

              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+250 787 973 747
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>
                {siteSettings.contactEmail || 'info@rise-next.org'}
              </p>
              <div className="d-flex pt-3">
                {siteSettings.socialLinks?.linkedin && (
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={siteSettings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                )}
                {siteSettings.socialLinks?.instagram && (
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={siteSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {siteSettings.socialLinks?.facebook && (
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={siteSettings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <Link className="btn btn-link" href="/about">
                About Us
              </Link>
              <Link className="btn btn-link" href="/contact">
                Contact Us
              </Link>
              <Link className="btn btn-link" href="/opportunities">
                Our Programs
              </Link>
              <Link className="btn btn-link" href="/news">
                Terms & Condition
              </Link>
              <Link className="btn btn-link" href="/contact">
                Support
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Business Hours</h4>
              <p className="mb-1">Monday - Friday</p>
              <h6 className="text-light">09:00 am - 05:00 pm</h6>
              <p className="mb-1">Saturday - Sunday</p>
              <h6 className="text-light">Closed</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Gallery</h4>
              <div className="row g-2">
                {galleryImages.map((image, index) => (
                  <div key={index} className="col-4">
                    <Image
                      className="img-fluid w-100 rounded"
                      src={image}
                      alt=""
                      width={100}
                      height={100}
                      style={{cursor: 'pointer', objectFit: 'cover'}}
                      onClick={() => openGallery(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="copyright pt-5">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{' '}
                <a className="fw-semi-bold" href="#">
                  RiseNext
                </a>
                , All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                Designed with ❤️ for displaced students
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary rounded btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>

      {/* Gallery Modal */}
      <Gallery
        images={galleryImages}
        isOpen={showGalleryModal}
        onClose={closeGallery}
        initialIndex={selectedImageIndex}
      />
    </>
  )
}
