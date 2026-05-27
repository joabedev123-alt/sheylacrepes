'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',               label: 'Início' },
  { href: '/especialidades', label: 'Especialidades' },
  { href: '/cardapios',      label: 'Cardápios' },
  { href: '/sobre',          label: 'Sobre' },
  { href: '/contato',        label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(7,7,20,0.88)] backdrop-blur-xl border-b border-[rgba(139,92,246,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300">
                <i className="bi bi-patch-heart-fill text-white text-lg" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl font-bold tracking-wider text-gradient"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sheylacrepes
                </span>
                <span className="text-[10px] text-purple-300/70 uppercase tracking-[0.2em] font-light">
                  Buffet Gourmet Premium
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg cursor-pointer
                      ${active ? 'text-brand-purple-light' : 'text-white/70 hover:text-white'}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #8B5CF6, #EC4899)' }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://www.instagram.com/sheylacrepes?igsh=cnNobjg3cTZjYnNy&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 hover:text-pink-300 hover:bg-white/10 hover:border-pink-400/40 transition-all duration-300 cursor-pointer"
                aria-label="Instagram da Sheylacrepes"
              >
                <i className="bi bi-instagram text-base" />
              </a>
              <a
                href="https://www.facebook.com/sheylacrepes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
                aria-label="Facebook da Sheylacrepes"
              >
                <i className="bi bi-facebook text-base" />
              </a>
              <a
                href="https://wa.me/5511913672688"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !px-4 !py-2.5 cursor-pointer"
                aria-label="Contato via WhatsApp"
              >
                <i className="bi bi-whatsapp" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-6 h-0.5 bg-white rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full block"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(7,7,20,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-7 px-8">
              <div className="text-center mb-2">
                <div
                  className="text-3xl font-bold text-gradient"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sheylacrepes
                </div>
                <div className="text-xs text-purple-300/60 uppercase tracking-widest mt-1">
                  Buffet Gourmet Premium
                </div>
              </div>

              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-semibold cursor-pointer transition-colors block text-center
                        ${active ? 'text-gradient' : 'text-white/80 hover:text-white'}`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.instagram.com/sheylacrepes?igsh=cnNobjg3cTZjYnNy&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 cursor-pointer"
                >
                  <i className="bi bi-instagram text-xl" />
                </a>
                <a
                  href="https://www.facebook.com/sheylacrepes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 cursor-pointer"
                >
                  <i className="bi bi-facebook text-xl" />
                </a>
                <a
                  href="https://wa.me/5511913672688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <i className="bi bi-whatsapp text-xl text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
