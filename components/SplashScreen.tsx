'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Esconde a tela de carregamento após 2.0 segundos
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    // Impede o scroll enquanto a splash screen estiver ativa
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F]"
        >
          {/* Logo animada */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Brilho atrás da logo */}
            <div className="absolute inset-0 bg-brand-wine/20 blur-[50px] rounded-full w-40 h-40 -z-10" />
            
            <img 
              src="/logo sheyla-Photoroom.png" 
              alt="Sheylacrepes Logo" 
              className="w-72 md:w-96 h-auto object-contain mb-6 drop-shadow-2xl"
            />
            
            {/* Texto inferior surgindo suavemente */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/70 tracking-[0.3em] uppercase text-xs md:text-sm font-light text-center"
            >
              Buffet Gourmet Premium
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
