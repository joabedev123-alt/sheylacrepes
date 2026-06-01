'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const portfolioImages = [
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.56.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.57 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.57 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.57.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.58 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.58 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.58.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.59 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.59 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.10.59.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.00 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.00 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.00.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.01 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.01 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.01.jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.02 (1).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.02 (2).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.02 (3).jpeg",
  "/cardapio/WhatsApp Image 2026-05-29 at 10.11.02.jpeg",
]

export default function Portfolio() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-50px' })

  // Duplicamos as imagens para criar um efeito de scroll infinito sem "quebras"
  const repeatedImages = [...portfolioImages, ...portfolioImages, ...portfolioImages]

  return (
    <section id="portfolio" className="py-20 md:py-32 relative bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          ref={titleRef}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-light uppercase tracking-[0.4em] text-[#C8A46B] mb-4 block">
            Nossos Trabalhos
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Conheça o nosso <span className="text-gradient font-semibold">Portfólio</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto font-light tracking-wide">
            Momentos deliciosos e eventos inesquecíveis que preparamos com muito carinho e qualidade.
          </p>
          <div className="divider-gradient w-32 mx-auto mt-8" />
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden flex items-center group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 md:gap-6 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 60,
            repeat: Infinity,
          }}
        >
          {repeatedImages.map((src, index) => (
            <div
              key={index}
              className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden hover-glow cursor-pointer"
            >
              <Image
                src={src}
                alt={`Portfólio Sheyla Crepes ${index}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                sizes="(max-width: 768px) 256px, 320px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="bi bi-camera text-white/80 text-3xl transform hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
