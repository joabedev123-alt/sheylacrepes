'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface PageBannerProps {
  title:       string
  titleAccent: string
  subtitle:    string
  icon:        string
  accentColor: string
  breadcrumb:  string
}

export default function PageBanner({
  title,
  titleAccent,
  subtitle,
  icon,
  accentColor,
  breadcrumb,
}: PageBannerProps) {
  return (
    <section
      className="relative pt-36 pb-16 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Radial glow behind title */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}20 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text)]/35 mb-8">
          <Link href="/" className="hover:text-[var(--color-text)]/60 transition-colors cursor-pointer">
            Início
          </Link>
          <i className="bi bi-chevron-right text-[10px]" />
          <span style={{ color: accentColor }}>{breadcrumb}</span>
        </div>

        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${accentColor}18`,
                border:     `1px solid ${accentColor}40`,
              }}
            >
              <i className={`bi ${icon} text-2xl`} style={{ color: accentColor }} />
            </div>

            <h1
              className="text-4xl sm:text-5xl font-black leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[var(--color-text)]">{title} </span>
              <span style={{ color: accentColor }}>{titleAccent}</span>
            </h1>
          </div>

          <p className="text-[var(--color-text)]/50 max-w-2xl text-base leading-relaxed pl-1">
            {subtitle}
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div
          className="mt-10 h-px w-24"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />
      </div>
    </section>
  )
}
