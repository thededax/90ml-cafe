'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 5000, suffix: '+', label: 'Happy Customers' },
  { number: 4.7, suffix: '★', label: 'Google Rating', isDecimal: true },
  { number: 20, suffix: '+', label: 'Signature Drinks' },
  { number: 2, suffix: '+ Yrs', label: "Bhagalpur's Fav Spot" },
]

function CountUp({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
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
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
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
    <div ref={ref} className="text-center px-8 py-4">
      <div className="font-bebas text-5xl md:text-7xl text-yellow">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="font-poppins text-[13px] text-white/50 uppercase tracking-[3px] mt-2">
        {stats.find(s => s.number === target)?.label}
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="bg-black border-y border-yellow/10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.08]">
          {stats.map((stat) => (
            <CountUp
              key={stat.label}
              target={stat.number}
              suffix={stat.suffix}
              isDecimal={stat.isDecimal}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
