'use client'

import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-bebas text-5xl md:text-[64px] text-white text-center mb-16">
          FIND US IN BHAGALPUR
        </h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border-2 border-yellow/20"
          >
            <iframe
              src="https://maps.google.com/maps?q=90ml+Drunkyard+Cafe+Bhagalpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="90ML Drunkyard Cafe Location"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-8">
              <h3 className="font-bebas text-3xl text-yellow mb-4">Visit Us</h3>
              <p className="font-poppins text-sm text-white/70 leading-relaxed mb-2">
                S.M College Rd, ChhotiKhanjarpur,<br />
                Khanjarpur, Bhagalpur,<br />
                Bihar 812001
              </p>
              <p className="font-poppins text-sm text-white/50 mt-4">
                🕐 Open Daily: 11 AM – 11 PM
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+917277143557"
                className="block w-full bg-yellow text-black font-poppins font-semibold uppercase tracking-wider px-6 py-4 rounded text-center hover:scale-105 hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 text-sm"
              >
                📞 Call Us Now
              </a>
              <a
                href="https://wa.me/917277143557"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] text-white font-poppins font-semibold uppercase tracking-wider px-6 py-4 rounded text-center hover:scale-105 transition-all duration-200 text-sm"
              >
                💬 WhatsApp Us
              </a>
              <a
                href="https://www.google.com/maps/place/90ml+Drunkyard+Cafe/@25.2585131,86.9885693,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-teal text-teal font-poppins font-semibold uppercase tracking-wider px-6 py-4 rounded text-center hover:bg-teal hover:text-black transition-all duration-200 text-sm"
              >
                📍 Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
