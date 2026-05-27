'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const items = [
  { icon: 'bi-egg-fried',        label: 'Crepes',      color: '#8B5CF6' },
  { icon: 'bi-fire',             label: 'Feijoada',    color: '#EC4899' },
  { icon: 'bi-award',            label: 'Risotos',     color: '#F59E0B' },
  { icon: 'bi-thermometer-high', label: 'Churrasco',   color: '#EF4444' },
  { icon: 'bi-stars',            label: 'Massas',      color: '#A3E635' },
  { icon: 'bi-gem',              label: 'Estrogonoff', color: '#EC4899' },
]

export default function HomeTeaser() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      style={{ background: '#070714', borderTop: '1px solid rgba(139,92,246,0.12)' }}
      className="py-16 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-purple-light mb-3 font-semibold">
            O que fazemos
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossas <span className="text-gradient">Especialidades</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3 py-5 px-2 rounded-2xl cursor-default"
              style={{
                background: 'rgba(21,21,46,0.5)',
                border:     `1px solid rgba(139,92,246,0.12)`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
              >
                <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
              </div>
              <span className="text-xs font-semibold text-white/70 text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Link href="/especialidades" className="btn-primary w-full sm:w-auto">
            <i className="bi bi-grid-3x3-gap-fill" />
            Ver Especialidades
          </Link>
          <Link href="/contato" className="btn-outline w-full sm:w-auto">
            <i className="bi bi-clipboard-check" />
            Solicitar Orçamento
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
