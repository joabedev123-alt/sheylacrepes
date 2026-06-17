'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

const navLinks = [
  { href: '#inicio',         label: 'Início' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#cardapios',      label: 'Cardápios' },
  { href: '#sobre',          label: 'Sobre' },
  { href: '#contato',        label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#inicio')

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > lastY && y > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else          document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-28">

            {/* Logo */}
            <Link href="#inicio" onClick={() => handleNavClick('#inicio')} className="flex items-center cursor-pointer group">
              <img
                src="/logo sheyla-Photoroom.png"
                alt="Sheylacrepes"
                className="h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
              />
            </Link>

            {/* Desktop Nav — absolutamente centralizado */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg cursor-pointer
                    ${activeLink === link.href
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #C8A46B, #8B1E3F)' }}
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 z-50">
              <ThemeSwitch />
              
              {/* Mobile Hamburger */}
              <button
                className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 rounded-full block transition-colors ${scrolled || menuOpen ? 'bg-[var(--color-text)]' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className={`w-6 h-0.5 rounded-full block ${scrolled || menuOpen ? 'bg-[var(--color-text)]' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 rounded-full block ${scrolled || menuOpen ? 'bg-[var(--color-text)]' : 'bg-white'}`}
              />
            </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(var(--color-bg-rgb, 15, 15, 15),0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              <div className="text-center mb-4">
                <img
                  src="/logo sheyla-Photoroom.png"
                  alt="Sheylacrepes"
                  className="h-20 w-auto object-contain mx-auto"
                />
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-[var(--color-text)]/80 hover:text-[var(--color-text)] cursor-pointer transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
