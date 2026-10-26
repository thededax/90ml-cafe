import Link from 'next/link'
import Image from 'next/image'

const quickLinks = [
  { href: '/#the-90ml-pour', label: 'The 90ml Pour' },
  { href: '/#craft-menu', label: 'Craft Menu' },
  { href: '/#work-and-vibe', label: 'Work & Vibe' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#order-reserve', label: 'Order / Reserve' },
  { href: '/gallery', label: 'Cafe Gallery' },
  { href: '/about', label: 'Our Story' },
]

const menuCategories = [
  { href: '/menu', label: 'Specialty Coffee & Chai' },
  { href: '/menu', label: 'Handcrafted Mocktails' },
  { href: '/menu', label: 'Artisanal Shakes' },
  { href: '/menu', label: 'Fresh Cold-Pressed Juices' },
  { href: '/menu', label: 'Loaded Nachos & Fries' },
  { href: '/menu', label: 'Student & Squad Combos' },
]

export default function Footer() {
  return (
    <footer className="bg-espresso text-on-dark border-t border-latte/15 pb-20 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-latte/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block relative h-11 w-40">
              <Image
                src="/logo.svg"
                alt="90ML Cafe"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-sans text-xs sm:text-sm text-latte/80 leading-relaxed max-w-sm">
              Bhagalpur&apos;s premier third-wave coffee roastery, mocktail bar, and remote work hangout. Measured to exact 90ml craft standards.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/90mldrunkyardcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-roast-elevated border border-latte/20 flex items-center justify-center text-oat-cream hover:text-kinetic-lime hover:border-kinetic-lime transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/917277143557"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-roast-elevated border border-latte/20 flex items-center justify-center text-oat-cream hover:text-teal hover:border-teal transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <span className="font-mono text-[11px] text-latte/60">
                @90mldrunkyardcafe
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold text-oat-cream uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-latte/70 hover:text-kinetic-lime transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Craft Menu Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-base font-bold text-oat-cream uppercase tracking-wider">
              Craft Menu
            </h4>
            <ul className="space-y-2">
              {menuCategories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="font-sans text-xs text-latte/70 hover:text-kinetic-lime transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold text-oat-cream uppercase tracking-wider">
              Cafe Hours & Location
            </h4>
            <div className="space-y-2 font-sans text-xs text-latte/75">
              <p>
                S.M College Rd, ChhotiKhanjarpur, Bhagalpur, Bihar 812001
              </p>
              <p className="font-mono text-kinetic-lime">
                🕐 Daily: 11:00 AM – 11:00 PM
              </p>
              <div className="pt-1">
                <a
                  href="tel:+917277143557"
                  className="font-mono text-oat-cream hover:text-kinetic-lime block"
                >
                  📞 +91 72771 43557
                </a>
                <a
                  href="tel:+919155480461"
                  className="font-mono text-latte/60 hover:text-kinetic-lime block"
                >
                  📞 +91 91554 80461
                </a>
              </div>
              <p className="font-mono text-[11px] text-teal">
                💻 Free 100Mbps Wi-Fi & Plug Points
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Amenities */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-latte/50">
          <p>© {new Date().getFullYear()} 90ml Cafe (90ML Drunkyard Cafe). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Specialty Pours</span>
            <span>•</span>
            <span>Third Place Hangout</span>
            <span>•</span>
            <span>Bhagalpur, Bihar</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
