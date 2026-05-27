'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface PageBannerProps {
  title: string
  titleAccent?: string
  subtitle: string
  icon: string
  accentColor?: string
  breadcrumb: string
}

export default function PageBanner({
  title,
  titleAccent,
  subtitle,
  icon,
  accentColor = '#8B5CF6',
  breadcrumb,
}: PageBannerProps) {
  return (
    <section
      className="relative pt-32 pb-16 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${accentColor}18 0%, transparent 65%), #070714`,
      }}
    >
      {/* Decorative bg rings */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${accentColor}0A` }}
      />

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)` }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 text-xs text-white/35 mb-6 font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="hover:text-white/60 transition-colors cursor-pointer">
            Início
          </Link>
          <i className="bi bi-chevron-right text-[10px]" />
          <span style={{ color: accentColor }}>{breadcrumb}</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${accentColor}18`,
              border:     `1px solid ${accentColor}33`,
              boxShadow:  `0 0 30px ${accentColor}18`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <i className={`${icon} text-3xl`} style={{ color: accentColor }} />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}{' '}
              {titleAccent && (
                <span
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, #EC4899)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {titleAccent}
                </span>
              )}
            </h1>
            <p className="text-base text-white/50 font-light max-w-xl">{subtitle}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
