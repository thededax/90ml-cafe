'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

const navItems = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/table-bookings', icon: '🪑', label: 'Table Bookings' },
  { href: '/admin/preorders', icon: '🍹', label: 'Pre-Orders' },
  { href: '/admin/party-bookings', icon: '🎉', label: 'Party Bookings' },
]

function AdminSidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0A0A0A] border border-white/10 rounded p-2"
        aria-label="Toggle sidebar"
      >
        <span className="block w-5 h-0.5 bg-yellow mb-1" />
        <span className="block w-5 h-0.5 bg-yellow mb-1" />
        <span className="block w-5 h-0.5 bg-yellow" />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-black border-r border-white/5 z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="relative h-10 w-32">
            <Image
              src="/logo.svg"
              alt="90ML"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-poppins text-sm transition-all ${
                  isActive
                    ? 'text-yellow border-l-2 border-yellow bg-yellow/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-poppins text-sm text-white/40 hover:text-red-400 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-black">
        <AdminSidebar />
        <div className="lg:ml-60 min-h-screen p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}
