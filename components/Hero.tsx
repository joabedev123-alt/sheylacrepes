'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  color: string
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  /* ── Canvas Particles ──────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#A78BFA', '#F472B6', '#A3E635', '#F59E0B', '#FFFFFF']

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.floor((canvas.width * canvas.height) / 18000)
    particlesRef.current = Array.from({ length: count }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 2.5 + 0.5,
      speedY:  -(Math.random() * 0.4 + 0.15),
      speedX:  (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      color:   colors[Math.floor(Math.random() * colors.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        p.y += p.speedY
        p.x += p.speedX
        p.opacity -= 0.0008

        if (p.y < -10 || p.opacity <= 0) {
          p.y       = canvas.height + 10
          p.x       = Math.random() * canvas.width
          p.opacity = Math.random() * 0.5 + 0.2
        }
      })
      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  /* ── GSAP parallax on scroll ─────────────────── */
  useEffect(() => {
    const hero = document.getElementById('hero-bg')
    if (!hero) return
    const onScroll = () => {
      const y = window.scrollY
      hero.style.transform = `translateY(${y * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#070714' }}
    >
      {/* Background image with parallax */}
      <div
        id="hero-bg"
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'brightness(0.35) saturate(1.1)',
          transform:          'scale(1.1)',
        }}
      />

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.14) 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(163,230,53,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-brand-purple/10 pointer-events-none"
        style={{ animation: 'rotateSlow 40s linear infinite' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-pink/8 pointer-events-none"
        style={{ animation: 'rotateSlow 28s linear infinite reverse' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass-light border-brand-purple/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
            Buffet Gourmet Premium · São Paulo
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          <span className="block text-white mb-1">Sabor,</span>
          <span className="block shimmer-text">sofisticação</span>
          <span className="block text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 font-bold italic">
            e experiências inesquecíveis.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Buffet premium especializado em{' '}
          <span className="text-brand-purple-light font-medium">Crepes</span>,{' '}
          <span className="text-brand-pink-light font-medium">Feijoadas</span>,{' '}
          <span className="text-brand-lime font-medium">Risotos</span>,{' '}
          Massas e Eventos Gourmet.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <a href="#orcamento" className="btn-primary text-base w-full sm:w-auto">
            <i className="bi bi-clipboard-check" />
            Solicitar Orçamento
          </a>
          <a
            href="https://linkfacil.me/sheylacrepes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base w-full sm:w-auto"
          >
            <i className="bi bi-journal-bookmark" />
            Ver Cardápio
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-8 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { value: '10+', label: 'Anos de experiência' },
            { value: '500+', label: 'Eventos realizados' },
            { value: '6',    label: 'Especialidades' },
            { value: '100%', label: 'Satisfação garantida' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-black text-gradient-brand"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/45 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Descobrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-brand-purple-light" />
        </motion.div>
      </motion.div>
    </section>
  )
}
