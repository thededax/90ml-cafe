'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 5000, suffix: '+', label: 'Happy Guests', sub: 'Since opening in Bhagalpur' },
  { number: 4.7, suffix: '★', label: 'Google Rating', isDecimal: true, sub: 'From 400+ reviews' },
  { number: 30, suffix: '+', label: 'Craft Drinks & Bites', sub: 'Pours, shakes & snacks' },
  { number: 2, suffix: '+ Yrs', label: "Neighborhood Third Place", sub: 'SM College Road' },
]

function CountUp({
  target,
  suffix,
  isDecimal,
  label,
  sub,
}: {
  target: number
  suffix: string
  isDecimal?: boolean
  label: string
  sub: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const steps = 50
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, isDecimal])

  return (
    <div ref={ref} className="text-center px-4 sm:px-6 py-6 sm:py-8 space-y-1">
      <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold text-kinetic-lime tabular-nums tracking-tight">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="font-sans text-xs sm:text-sm font-bold text-oat-cream uppercase tracking-wider">
        {label}
      </div>
      <div className="font-sans text-[11px] text-latte/60">
        {sub}
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="bg-roast-elevated border-y border-latte/15 py-8 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-latte/10">
          {stats.map((stat) => (
            <CountUp
              key={stat.label}
              target={stat.number}
              suffix={stat.suffix}
              isDecimal={stat.isDecimal}
              label={stat.label}
              sub={stat.sub}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
