'use client'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

interface GalleryProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function Gallery({images, isOpen, onClose, initialIndex = 0}: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (!isOpen) return null

  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      style={{display: isOpen ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.9)'}}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content bg-transparent border-0">
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close btn-close-white ms-auto"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            {/* Main Image with Animation */}
            <div className="position-relative mb-4" style={{height: '70vh'}}>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="btn position-absolute start-0 top-50 translate-middle-y text-white"
                style={{zIndex: 10}}
                aria-label="Previous image"
              >
                <i className="fa fa-chevron-left fa-3x"></i>
              </button>

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{opacity: 0, x: 100}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -100}}
                  transition={{duration: 0.3}}
                  className="h-100 d-flex align-items-center justify-content-center"
                >
                  <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="img-fluid rounded"
                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="btn position-absolute end-0 top-50 translate-middle-y text-white"
                style={{zIndex: 10}}
                aria-label="Next image"
              >
                <i className="fa fa-chevron-right fa-3x"></i>
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  style={{width: '100px'}}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-fluid rounded ${
                      index === currentIndex
                        ? 'border border-3 border-primary'
                        : 'border border-2 border-secondary'
                    }`}
                    style={{
                      cursor: 'pointer',
                      objectFit: 'cover',
                      height: '70px',
                      opacity: index === currentIndex ? 1 : 0.6,
                      transition: 'all 0.3s',
                    }}
                    onClick={() => goToImage(index)}
                    onMouseEnter={(e) => {
                      if (index !== currentIndex) {
                        e.currentTarget.style.opacity = '0.8'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentIndex) {
                        e.currentTarget.style.opacity = '0.6'
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Image Counter */}
            <div className="text-center text-white mt-3">
              <span className="fs-5">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
