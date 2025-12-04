'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote:
      'Education is the foundation of change. By funding schools, scholarships, and training programs, we can help children and adults unlock their potential for a better future.',
    name: 'Alexander Bell',
    position: 'CEO, Founder',
    image: '/charitize-img/testimonial-1.jpg',
  },
  {
    id: 2,
    quote:
      'Every hand extended in kindness brings us closer to a world free from suffering. Be part of a global movement dedicated to building a future where equality and compassion thrive.',
    name: 'Donald Pakura',
    position: 'CEO, Founder',
    image: '/charitize-img/testimonial-2.jpg',
  },
  {
    id: 3,
    quote:
      'Love and compassion have the power to heal. Through your donations and volunteer work, we can spread kindness and support to children, families, and communities struggling to find stability.',
    name: 'Boris Johnson',
    position: 'CEO, Founder',
    image: '/charitize-img/testimonial-3.jpg',
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="position-relative">
      <motion.div
        key={currentIndex}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1, ease: 'easeInOut'}}
      >
        <div className="testimonial-item">
          <div className="row g-5 align-items-center">
            <div className="col-md-6">
              <div className="testimonial-img">
                <img
                  className="img-fluid rounded"
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial-text pb-5 pb-md-0">
                <p className="fs-5">{testimonials[currentIndex].quote}</p>
                <div className="d-flex align-items-center">
                  <div className="btn-lg-square bg-primary rounded text-white flex-shrink-0">
                    <i className="fa fa-quote-right fa-2x"></i>
                  </div>
                  <div className="ps-3">
                    <h5 className="mb-0">{testimonials[currentIndex].name}</h5>
                    <span>{testimonials[currentIndex].position}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '1.5rem',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 100,
        }}
      >
        <button
          onClick={goToPrev}
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '0.5rem',
            background: 'var(--bs-secondary)',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            transition: '0.5s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bs-white)'
            e.currentTarget.style.color = 'var(--bs-secondary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bs-secondary)'
            e.currentTarget.style.color = 'white'
          }}
          aria-label="Previous testimonial"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          onClick={goToNext}
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '0.5rem',
            background: 'var(--bs-secondary)',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            transition: '0.5s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bs-white)'
            e.currentTarget.style.color = 'var(--bs-secondary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bs-secondary)'
            e.currentTarget.style.color = 'white'
          }}
          aria-label="Next testimonial"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
