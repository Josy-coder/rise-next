'use client'

// Spinner utility
export const hideSpinner = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const spinner = document.getElementById('spinner')
      if (spinner) {
        spinner.classList.remove('show')
      }
    }, 1)
  }
}

// Sticky Navbar
export const initStickyNavbar = () => {
  if (typeof window === 'undefined') return

  const handleScroll = () => {
    const navBar = document.querySelector('.nav-bar')
    if (!navBar) return

    if (window.scrollY > 90) {
      navBar.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
      ;(navBar as HTMLElement).style.padding = '0'
    } else {
      navBar.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
      ;(navBar as HTMLElement).style.padding = '0px 90px'
    }
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}

// Back to top button
export const initBackToTop = () => {
  if (typeof window === 'undefined') return

  const handleScroll = () => {
    const backToTop = document.querySelector('.back-to-top')
    if (!backToTop) return

    if (window.scrollY > 300) {
      ;(backToTop as HTMLElement).style.display = 'flex'
    } else {
      ;(backToTop as HTMLElement).style.display = 'none'
    }
  }

  const handleClick = (e: Event) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  window.addEventListener('scroll', handleScroll)
  const backToTop = document.querySelector('.back-to-top')
  if (backToTop) {
    backToTop.addEventListener('click', handleClick)
  }

  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (backToTop) {
      backToTop.removeEventListener('click', handleClick)
    }
  }
}

// Counter animation
export const animateCounter = (element: HTMLElement, target: number, duration: number = 2000) => {
  const start = 0
  const increment = target / (duration / 10)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target.toString()
      clearInterval(timer)
    } else {
      element.textContent = Math.ceil(current).toString()
    }
  }, 10)
}

// Initialize counter on scroll
export const initCounterOnScroll = () => {
  if (typeof window === 'undefined') return

  const counters = document.querySelectorAll('[data-toggle="counter-up"]')
  
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement
        const target = parseInt(element.getAttribute('data-target') || element.textContent || '0')
        animateCounter(element, target)
        observer.unobserve(element)
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.8,
  })

  counters.forEach((counter) => observer.observe(counter))

  return () => {
    counters.forEach((counter) => observer.unobserve(counter))
  }
}

// Donation progress animation
export const initDonationProgress = () => {
  if (typeof window === 'undefined') return

  const progressBars = document.querySelectorAll('.donation-item .progress .progress-bar')
  
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target as HTMLElement
        const height = progressBar.getAttribute('aria-valuenow') || '0'
        progressBar.style.height = `${height}%`
        observer.unobserve(progressBar)
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.8,
  })

  progressBars.forEach((bar) => observer.observe(bar))

  return () => {
    progressBars.forEach((bar) => observer.unobserve(bar))
  }
}

// Video modal handler
export const initVideoModal = () => {
  if (typeof window === 'undefined') return

  let videoSrc = ''

  const handlePlayClick = (e: Event) => {
    const button = e.currentTarget as HTMLElement
    videoSrc = button.getAttribute('data-src') || ''
  }

  const handleModalShow = () => {
    const video = document.getElementById('video') as HTMLIFrameElement
    if (video && videoSrc) {
      video.src = `${videoSrc}?autoplay=1&modestbranding=1&showinfo=0`
    }
  }

  const handleModalHide = () => {
    const video = document.getElementById('video') as HTMLIFrameElement
    if (video && videoSrc) {
      video.src = videoSrc
    }
  }

  const playButtons = document.querySelectorAll('.btn-play')
  playButtons.forEach((button) => {
    button.addEventListener('click', handlePlayClick)
  })

  const videoModal = document.getElementById('videoModal')
  if (videoModal) {
    videoModal.addEventListener('shown.bs.modal', handleModalShow)
    videoModal.addEventListener('hide.bs.modal', handleModalHide)
  }

  return () => {
    playButtons.forEach((button) => {
      button.removeEventListener('click', handlePlayClick)
    })
    if (videoModal) {
      videoModal.removeEventListener('shown.bs.modal', handleModalShow)
      videoModal.removeEventListener('hide.bs.modal', handleModalHide)
    }
  }
}