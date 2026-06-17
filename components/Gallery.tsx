'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem {
  id:       number
  src:      string
  thumb:    string
  alt:      string
  category: string
}

const photos: GalleryItem[] = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=70', alt: 'Crepe gourmet recheado',       category: 'Crepes'    },
  { id: 2,  src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=70', alt: 'Crepe doce com morango',       category: 'Crepes'    },
  { id: 3,  src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=70', alt: 'Mesa de buffet premium',       category: 'Eventos'   },
  { id: 4,  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70', alt: 'Jantar gourmet elegante',      category: 'Eventos'   },
  { id: 5,  src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=70', alt: 'Feijoada tradicional',          category: 'Feijoada'  },
  { id: 6,  src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=70', alt: 'Prato gourmet elaborado',     category: 'Feijoada'  },
  { id: 7,  src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=70', alt: 'Risoto cremoso trufado',      category: 'Risotos'   },
  { id: 8,  src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=70', alt: 'Massa artesanal ao molho',    category: 'Massas'    },
  { id: 9,  src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=70', alt: 'Churrasco premium na brasa',   category: 'Churrasco' },
  { id: 10, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=70', alt: 'Corte de carne grelhada',      category: 'Churrasco' },
  { id: 11, src: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=600&q=70', alt: 'Decoração de evento social',  category: 'Eventos'   },
  { id: 12, src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=70', alt: 'Sobremesas variadas buffet',   category: 'Crepes'    },
  { id: 13, src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&q=70', alt: 'Massas frescas caseiras',     category: 'Massas'    },
  { id: 14, src: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=70', alt: 'Risoto de cogumelos frescos', category: 'Risotos'   },
  { id: 15, src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=70', alt: 'Buffet corporativo elegante',  category: 'Eventos'   },
]

const categories = ['Todos', 'Crepes', 'Feijoada', 'Risotos', 'Massas', 'Churrasco', 'Eventos']

export default function Gallery() {
  const [active, setActive]       = useState('Todos')
  const [lightbox, setLightbox]   = useState<GalleryItem | null>(null)

  const filtered = active === 'Todos' ? photos : photos.filter((p) => p.category === active)

  const openLightbox  = (item: GalleryItem) => setLightbox(item)
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const navigate = useCallback((dir: 1 | -1) => {
    if (!lightbox) return
    const idx  = filtered.findIndex((p) => p.id === lightbox.id)
    const next = filtered[(idx + dir + filtered.length) % filtered.length]
    setLightbox(next)
  }, [lightbox, filtered])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, navigate, closeLightbox])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                active === cat
                  ? 'bg-brand-gold text-[var(--color-text)] shadow-[0_0_16px_rgba(200,164,107,0.4)]'
                  : 'bg-white/5 text-[var(--color-text)]/60 hover:bg-white/10 hover:text-[var(--color-text)] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-xl relative"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.thumb}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <i className="bi bi-zoom-in text-[var(--color-text)] text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-[var(--color-text)]/80 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-[var(--color-text)] hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={closeLightbox}
              aria-label="Fechar"
            >
              <i className="bi bi-x-lg" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-[var(--color-text)] hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              aria-label="Anterior"
            >
              <i className="bi bi-chevron-left" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox.id}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-[var(--color-text)] hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
              aria-label="Próxima"
            >
              <i className="bi bi-chevron-right" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[var(--color-text)]/70 text-sm">{lightbox.alt}</p>
              <p className="text-[var(--color-text)]/40 text-xs mt-1">
                {filtered.findIndex((p) => p.id === lightbox.id) + 1} / {filtered.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
