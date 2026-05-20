import { Bebas_Neue, Poppins } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: '90ML Drunkyard Cafe | Bhagalpur\'s #1 Youth Cafe',
  description: 'Premium mocktails, shakes, juices & snacks crafted for the vibes you deserve. Visit Bhagalpur\'s boldest youth cafe. Sip. Chill. Repeat.',
  keywords: ['90ml', 'drunkyard cafe', 'bhagalpur', 'mocktails', 'cafe', 'youth cafe', 'shakes', 'snacks'],
  openGraph: {
    title: '90ML Drunkyard Cafe',
    description: 'Bhagalpur\'s #1 Youth Cafe — Mocktails, Shakes, Snacks & Vibes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${poppins.variable}`}>
      <body className="bg-black text-white font-poppins antialiased">
        {children}
      </body>
    </html>
  )
}
