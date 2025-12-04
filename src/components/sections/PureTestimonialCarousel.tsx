'use client'

import {useState, useEffect, useCallback} from 'react'
import './testimonial-carousel.css'

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

export default function PureTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 1000)
  }, [isAnimating])

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 1000)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)

    return () => clearInterval(timer)
  }, [handleNext])

  return (
    <div className="testimonial-carousel-wrapper">
      <div
        className={`testimonial-carousel-slide ${isAnimating ? 'animating' : ''}`}
        key={currentIndex}
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
      </div>

      {/* Navigation Buttons */}
      <div className="testimonial-nav">
        <button
          className="testimonial-prev"
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Previous testimonial"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="testimonial-next"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Next testimonial"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
