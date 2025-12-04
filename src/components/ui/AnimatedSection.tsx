'use client'

import {motion, useInView} from 'framer-motion'
import {useRef, ReactNode} from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})

  const animations = {
    fadeIn: {
      hidden: {opacity: 0},
      visible: {opacity: 1},
    },
    fadeInUp: {
      hidden: {opacity: 0, y: 50},
      visible: {opacity: 1, y: 0},
    },
    fadeInDown: {
      hidden: {opacity: 0, y: -50},
      visible: {opacity: 1, y: 0},
    },
    fadeInLeft: {
      hidden: {opacity: 0, x: -50},
      visible: {opacity: 1, x: 0},
    },
    fadeInRight: {
      hidden: {opacity: 0, x: 50},
      visible: {opacity: 1, x: 0},
    },
  }

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
