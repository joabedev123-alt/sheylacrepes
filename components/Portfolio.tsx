'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const portfolioImages = [
  "/cardapio/foto-01.jpeg",
  "/cardapio/foto-02.jpeg",
  "/cardapio/foto-03.jpeg",
  "/cardapio/foto-04.jpeg",
  "/cardapio/foto-05.jpeg",
  "/cardapio/foto-06.jpeg",
  "/cardapio/foto-07.jpeg",
  "/cardapio/foto-08.jpeg",
  "/cardapio/foto-09.jpeg",
  "/cardapio/foto-10.jpeg",
  "/cardapio/foto-11.jpeg",
  "/cardapio/foto-12.jpeg",
  "/cardapio/foto-13.jpeg",
  "/cardapio/foto-14.jpeg",
  "/cardapio/foto-15.jpeg",
  "/cardapio/foto-16.jpeg",
  "/cardapio/foto-17.jpeg",
  "/cardapio/foto-18.jpeg",
  "/cardapio/foto-19.jpeg",
  "/cardapio/foto-20.jpeg",
]

export default function Portfolio() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-50px' })

  // Duplicamos as imagens para criar um efeito de scroll infinito sem "quebras"
  const repeatedImages = [...portfolioImages, ...portfolioImages, ...portfolioImages]

  return (
    <section id="portfolio" className="py-20 md:py-32 relative bg-gradient-to-b from-[var(--color-bg)] to-[#0A0A0A] overflow-hidden">
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
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-[var(--color-text)] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Conheça o nosso <span className="text-gradient font-semibold">Portfólio</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-text)]/50 max-w-xl mx-auto font-light tracking-wide">
            Momentos deliciosos e eventos inesquecíveis que preparamos com muito carinho e qualidade.
          </p>
          <div className="divider-gradient w-32 mx-auto mt-8" />
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden flex items-center group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

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
                <i className="bi bi-camera text-[var(--color-text)]/80 text-3xl transform hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
