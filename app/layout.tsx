import { Bebas_Neue, Poppins, Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { TrayProvider } from '@/lib/tray-context'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const fraunces = Fraunces({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '90ml Cafe | Specialty Pours, Bold Shots & The Neighborhood Third Place',
  description: 'Experience 90ml Cafe in Bhagalpur: 30ml Solo, 60ml Doppio & 90ml Signature House Pours, artisanal cold brews, handcrafted mocktails, comfort bites, high-speed Wi-Fi & work desks.',
  keywords: ['90ml Cafe', '90ML Drunkyard Cafe', 'Specialty Coffee Bhagalpur', 'Coffee Shop Bhagalpur', 'Work from Cafe', 'Mocktails', 'Shakes', 'Student Cafe Bihar'],
  openGraph: {
    title: '90ml Cafe | Craft Pours & Neighborhood Third Place',
    description: 'Measured to perfection: 30ml Solo, 60ml Doppio, 90ml Signature Pour. Specialty coffee, mocktails, work desks with power outlets & evening hangouts in Bhagalpur.',
    type: 'website',
    url: 'https://90mlcafe.netlify.app/',
  },
}

const cafeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: '90ml Cafe (90ML Drunkyard Cafe)',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80',
  telephone: '+917277143557',
  servesCuisine: ['Specialty Coffee', 'Mocktails', 'Cafe Bites', 'Artisanal Shakes'],
  priceRange: '₹25 - ₹599',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S.M College Rd, Chhoti Khanjarpur',
    addressLocality: 'Bhagalpur',
    addressRegion: 'Bihar',
    postalCode: '812001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2585131,
    longitude: 86.9885693,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '23:00',
    },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Plug Points at Desks', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Board Games', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor & AC Seating', value: true },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${poppins.variable} ${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema) }}
        />
      </head>
      <body className="bg-espresso text-on-dark font-sans antialiased selection:bg-kinetic-lime selection:text-espresso">
        <TrayProvider>
          {children}
        </TrayProvider>
      </body>
    </html>
  )
}
