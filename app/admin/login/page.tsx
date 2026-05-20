'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-[#0A0A0A] border border-yellow/20 rounded-xl p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-12 w-40">
            <Image
              src="/logo.svg"
              alt="90ML Drunkyard Cafe"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="font-bebas text-5xl text-yellow text-center mb-8">
          ADMIN ACCESS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-poppins text-sm text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 focus:border-yellow/60 focus:outline-none transition-colors"
              placeholder="admin@90mlcafe.com"
              required
            />
          </div>

          <div>
            <label className="block font-poppins text-sm text-white/70 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 focus:border-yellow/60 focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 font-poppins text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow text-black font-poppins font-bold uppercase tracking-wider py-4 rounded hover:scale-[1.02] hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
