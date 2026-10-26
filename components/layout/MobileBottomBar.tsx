'use client'

import { useTray } from '@/lib/tray-context'

export default function MobileBottomBar() {
  const { totalItems, totalAmount, setIsTrayOpen } = useTray()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex h-[62px] border-t border-latte/15 bg-espresso/95 backdrop-blur-lg">
      <a
        href="tel:+917277143557"
        className="flex-1 bg-roast-elevated text-oat-cream border-r border-latte/10 font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors hover:bg-roast-elevated/80"
        aria-label="Call Cafe"
      >
        <span className="text-sm">📞</span>
        <span>Call</span>
      </a>

      {totalItems > 0 ? (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="flex-[1.5] bg-crema text-card-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          aria-label="Open Order Tray"
        >
          <span>☕ Tray</span>
          <span className="bg-espresso text-kinetic-lime font-mono text-[11px] px-2 py-0.5 rounded-full font-bold tabular-nums">
            {totalItems} • ₹{totalAmount}
          </span>
        </button>
      ) : (
        <button
          onClick={() => {
            const el = document.getElementById('craft-menu')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex-[1.5] bg-crema text-card-white font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors hover:bg-crema-dark"
        >
          <span>☕ Craft Menu</span>
        </button>
      )}

      <a
        href="https://wa.me/917277143557"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#25D366] text-white font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors hover:bg-[#20ba59]"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span>Chat</span>
      </a>
    </div>
  )
}
