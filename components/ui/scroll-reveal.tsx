'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.5,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)'
      case 'down':
        return 'translateY(-30px)'
      case 'left':
        return 'translateX(30px)'
      case 'right':
        return 'translateX(-30px)'
      default:
        return 'translateY(30px)'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// Staggered reveal for lists
interface StaggerRevealProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  staggerDelay?: number
}

export function StaggerReveal({
  children,
  className,
  itemClassName,
  staggerDelay = 0.1,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * staggerDelay}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
