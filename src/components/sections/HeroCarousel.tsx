'use client'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import './hero-carousel.css'

const slides = [
  {
    id: 1,
    title: 'Together for a Better Tomorrow',
    description:
      'We believe in creating opportunities and empowering communities through education, healthcare, and sustainable development.',
    image: '/charitize-img/carousel-1.jpg',
  },
  {
    id: 2,
    title: 'Together, We Can End Hunger',
    description:
      'No one should go to bed hungry. Your support helps us bring smiles, hope, and a brighter future to those in need.',
    image: '/charitize-img/carousel-2.jpg',
  },
  {
    id: 3,
    title: 'Empowering Communities Through Education',
    description:
      'Education opens doors to opportunities. Join us in providing resources and mentorship to help students achieve their dreams.',
    image: '/charitize-img/carousel-1.jpg',
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <div className="container-fluid p-0">
      <div
        className="header-carousel-wrapper py-3"
        style={{position: 'relative', overflow: 'hidden'}}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[currentSlide].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {type: 'tween', duration: 1, ease: 'easeInOut'},
              opacity: {duration: 0.5},
            }}
            style={{
              position: 'absolute',
              width: '100%',
            }}
          >
            <div className="container py-3">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                  <div className="carousel-text">
                    <h1 className="display-4 text-uppercase mb-3">{slides[currentSlide].title}</h1>
                    <p className="fs-5 mb-5">{slides[currentSlide].description}</p>
                    <div className="d-flex">
                      <a className="btn btn-primary rounded py-3 px-4 me-3" href="">
                        Donate Now
                      </a>
                      <a className="btn btn-secondary rounded py-3 px-4" href="">
                        Join Us Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="carousel-img">
                    <img
                      className="w-100 rounded"
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Spacer to maintain height */}
        <div style={{visibility: 'hidden', pointerEvents: 'none'}}>
          <div className="container py-3">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <div className="carousel-text">
                  <h1 className="display-4 text-uppercase mb-3">Placeholder</h1>
                  <p className="fs-5 mb-5">Placeholder text for maintaining height</p>
                  <div className="d-flex">
                    <button className="btn btn-primary rounded py-3 px-4 me-3">Donate Now</button>
                    <button className="btn btn-secondary rounded py-3 px-4">Join Us Now</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="carousel-img">
                  <img className="w-100 rounded" src={slides[0].image} alt="Placeholder" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="owl-nav">
          <button className="owl-prev" onClick={handlePrev} aria-label="Previous slide">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="owl-next" onClick={handleNext} aria-label="Next slide">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
