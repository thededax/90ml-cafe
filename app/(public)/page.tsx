import Hero from '@/components/home/Hero'
import CategoryCards from '@/components/home/CategoryCards'
import Bestsellers from '@/components/home/Bestsellers'
import Stats from '@/components/home/Stats'
import VibeGallery from '@/components/home/VibeGallery'
import OffersBanner from '@/components/home/OffersBanner'
import Testimonials from '@/components/home/Testimonials'
import PartyBooking from '@/components/home/PartyBooking'
import Location from '@/components/home/Location'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Bestsellers />
      <Stats />
      <VibeGallery />
      <OffersBanner />
      <Testimonials />
      <PartyBooking />
      <Location />
    </>
  )
}
