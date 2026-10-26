'use client'

import { useState } from 'react'
import Hero from '@/components/home/Hero'
import PourScaleSpotlight from '@/components/home/PourScaleSpotlight'
import InteractiveMenu from '@/components/home/InteractiveMenu'
import VibeBentoGrid from '@/components/home/VibeBentoGrid'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import DualConversionHub from '@/components/home/DualConversionHub'

export default function HomePage() {
  const [menuFilter, setMenuFilter] = useState<{
    category?: string
    temperature?: string
  }>({})

  const handleSelectMood = (mood: 'caffeine' | 'iced' | 'bites') => {
    if (mood === 'caffeine') {
      setMenuFilter({ category: 'Coffee & Chai', temperature: 'all' })
    } else if (mood === 'iced') {
      setMenuFilter({ category: 'All', temperature: 'iced' })
    } else if (mood === 'bites') {
      setMenuFilter({ category: 'Snacks', temperature: 'all' })
    }
  }

  return (
    <>
      {/* 7/5 Kinetic Craft Hero & Marquee Ticker */}
      <Hero onSelectMood={handleSelectMood} />

      {/* The 30ml / 60ml / 90ml Pour Scale Spotlight */}
      <PourScaleSpotlight />

      {/* Interactive Cafe Menu & Drink Customizer (on #FBEBDE Oat Cream) */}
      <InteractiveMenu initialFilter={menuFilter} />

      {/* The Third-Place Vibe & Work-From-Cafe Bento Grid */}
      <VibeBentoGrid />

      {/* Social Proof & Metrics */}
      <Stats />
      <Testimonials />

      {/* Dual-Mode Conversion Hub (Pre-Order Tray + Table Booking + Map) */}
      <DualConversionHub />
    </>
  )
}
