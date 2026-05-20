import Link from 'next/link'
import Image from 'next/image'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
]

const menuLinks = [
  { href: '/menu?cat=mocktails', label: 'Mocktails' },
  { href: '/menu?cat=shakes', label: 'Shakes' },
  { href: '/menu?cat=juices', label: 'Juices' },
  { href: '/menu?cat=snacks', label: 'Snacks' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="relative block h-12 w-40 mb-4">
              <Image
                src="/logo.svg"
                alt="90ML Drunkyard Cafe"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-poppins text-sm italic text-white/50 mb-6">
              &ldquo;Sip. Chill. Repeat.&rdquo;
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/90mldrunkyardcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bebas text-2xl text-yellow mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-poppins text-sm text-white/60 hover:text-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="font-poppins text-sm text-white/60 hover:text-yellow transition-colors"
                >
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-bebas text-2xl text-yellow mb-4">Our Menu</h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-poppins text-sm text-white/60 hover:text-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bebas text-2xl text-yellow mb-4">Contact Us</h3>
            <div className="space-y-3 font-poppins text-sm text-white/60">
              <p>S.M College Rd, ChhotiKhanjarpur,<br />Khanjarpur, Bhagalpur,<br />Bihar 812001</p>
              <a href="tel:+917277143557" className="block hover:text-yellow transition-colors">
                📞 +91 72771 43557
              </a>
              <a
                href="https://wa.me/917277143557"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-teal transition-colors"
              >
                💬 WhatsApp Us
              </a>
              <p>🕐 Open Daily: 11 AM – 11 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="font-poppins text-xs text-white/30">
            © 2025 90ML Drunkyard Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
