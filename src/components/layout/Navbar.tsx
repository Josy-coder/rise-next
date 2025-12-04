'use client'

import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'

interface SiteSettings {
  title: string
  logo?: string
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

interface NavbarProps {
  siteSettings: SiteSettings
}

export default function Navbar({siteSettings}: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const isActive = (path: string) => {
    return pathname === path ? 'active fw-bold text-decoration-underline' : ''
  }

  // Sticky scroll behavior - replaces jQuery scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Topbar Start */}
      <motion.div
        className="container-fluid bg-secondary top-bar"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <div className="row align-items-center h-100">
          <div className="col-lg-4 text-center text-lg-start">
            <a href="/">
              {siteSettings.logo ? (
                <Image
                  src={siteSettings.logo}
                  alt={siteSettings.title}
                  width={200}
                  height={80}
                  style={{height: '80px', width: 'auto', objectFit: 'contain'}}
                  priority
                />
              ) : (
                <h1 className="display-5 text-primary m-0">{siteSettings.title}</h1>
              )}
            </a>
          </div>
          <div className="col-lg-8 d-none d-lg-block">
            <div className="row">
              <div className="col-lg-4">
                <div className="d-flex justify-content-end">
                  <div className="flex-shrink-0 btn-square bg-primary rounded">
                    <i className="fa fa-phone-alt text-dark"></i>
                  </div>
                  <div className="ms-2">
                    <h6 className="text-primary mb-0">Call Us</h6>
                    <span className="text-white">+250 787 973 747</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-end">
                  <div className="flex-shrink-0 btn-square rounded bg-primary">
                    <i className="fa fa-envelope-open text-dark"></i>
                  </div>
                  <div className="ms-2">
                    <h6 className="text-primary mb-0">Mail Us</h6>
                    <span className="text-white">
                      {siteSettings.contactEmail || 'info@rise-next.org'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="d-flex justify-content-end">
                  <div className="flex-shrink-0 btn-square bg-primary rounded">
                    <i className="fa fa-map-marker-alt text-dark"></i>
                  </div>
                  <div className="ms-2">
                    <h6 className="text-primary mb-0">Location</h6>
                    <span className="text-white">Kigali, Rwanda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <motion.div
        className="container-fluid bg-secondary px-0"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut', delay: 0.1}}
      >
        <motion.div
          className="nav-bar bg-secondary"
          animate={{
            position: isSticky ? 'fixed' : 'relative',
            top: isSticky ? 0 : 'auto',
            left: 0,
            right: 0,
            zIndex: 999,
            padding: isSticky ? '0' : '0 90px',
          }}
          transition={{duration: 0.3, ease: 'easeOut'}}
          style={{width: '100%'}}
        >
          <nav className="navbar navbar-expand-lg bg-primary rounded-top navbar-dark px-4 py-lg-0">
            <h4 className="d-lg-none m-0">{siteSettings.title}</h4>
            <button
              type="button"
              className="navbar-toggler bg-secondary rounded me-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon text-primary"></span>
            </button>

            {/* Desktop Menu */}
            <div className="collapse navbar-collapse d-none d-lg-flex">
              <div className="navbar-nav me-auto">
                <a href="/" className={`nav-item nav-link ${isActive('/')}`} data-prefetch="true">
                  Home
                </a>
                <a
                  href="/about"
                  className={`nav-item nav-link ${isActive('/about')}`}
                  data-prefetch="true"
                >
                  About
                </a>
                <a
                  href="/opportunities"
                  className={`nav-item nav-link ${isActive('/opportunities')}`}
                  data-prefetch="true"
                >
                  Opportunities
                </a>
                <a
                  href="/news"
                  className={`nav-item nav-link ${isActive('/news')}`}
                  data-prefetch="true"
                >
                  News
                </a>
                <a
                  href="/contact"
                  className={`nav-item nav-link ${isActive('/contact')}`}
                  data-prefetch="true"
                >
                  Contact
                </a>
              </div>
              <div className="d-none d-lg-flex ms-auto">
                <a href="/donate" className="btn btn-secondary rounded px-4 py-2">
                  Donate
                </a>
              </div>
            </div>

            {/* Mobile Menu - Animated with Framer Motion */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="navbar-collapse d-lg-none"
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                  style={{overflow: 'hidden'}}
                >
                  <motion.div
                    className="navbar-nav me-auto"
                    initial={{y: -20}}
                    animate={{y: 0}}
                    exit={{y: -20}}
                    transition={{duration: 0.3}}
                  >
                    <a
                      href="/"
                      className={`nav-item nav-link ${isActive('/')}`}
                      data-prefetch="true"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a
                      href="/about"
                      className={`nav-item nav-link ${isActive('/about')}`}
                      data-prefetch="true"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </a>
                    <a
                      href="/opportunities"
                      className={`nav-item nav-link ${isActive('/opportunities')}`}
                      data-prefetch="true"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Opportunities
                    </a>
                    <a
                      href="/news"
                      className={`nav-item nav-link ${isActive('/news')}`}
                      data-prefetch="true"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      News
                    </a>
                    <a
                      href="/contact"
                      className={`nav-item nav-link ${isActive('/contact')}`}
                      data-prefetch="true"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.div>
      </motion.div>
      {/* Navbar End */}
    </>
  )
}
