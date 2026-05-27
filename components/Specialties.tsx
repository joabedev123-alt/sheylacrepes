'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const specialties = [
  {
    id:    'crepes',
    title: 'Crepes',
    icon:  'bi-egg-fried',
    desc:  'Crepes salgados e doces preparados ao vivo com ingredientes selecionados. Da tradição francesa ao toque gourmet brasileiro.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80',
    color: '#8B5CF6',
    badge: 'Especialidade principal',
  },
  {
    id:    'feijoada',
    title: 'Feijoada',
    icon:  'bi-fire',
    desc:  'Feijoada completa e autêntica, com todos os acompanhamentos tradicionais e um toque de sofisticação gourmet.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    color: '#EC4899',
    badge: 'Sabor da tradição',
  },
  {
    id:    'risotos',
    title: 'Risotos',
    icon:  'bi-award',
    desc:  'Risotos cremosos preparados ao vivo com ingredientes premium. Do funghi trufado ao camarão gratinado.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    color: '#F59E0B',
    badge: 'Preparo ao vivo',
  },
  {
    id:    'churrasco',
    title: 'Churrasco',
    icon:  'bi-thermometer-high',
    desc:  'Carnes nobres selecionadas, temperadas com nossa marinada exclusiva e assadas no ponto perfeito para seu evento.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
    color: '#EF4444',
    badge: 'Carnes premium',
  },
  {
    id:    'massas',
    title: 'Massas',
    icon:  'bi-stars',
    desc:  'Massas artesanais frescas com molhos especiais italianos. Penne, farfalle, rigatoni, ravioli e muito mais.',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
    color: '#A3E635',
    badge: 'Culinária italiana',
  },
  {
    id:    'estrogonoff',
    title: 'Estrogonoff',
    icon:  'bi-gem',
    desc:  'Estrogonoff cremoso e sofisticado, preparado com cortes nobres e temperos especiais que conquistam todos os paladares.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    color: '#EC4899',
    badge: 'Receita especial',
  },
]

function SpecialtyCard({ item, index }: { item: typeof specialties[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative group rounded-2xl overflow-hidden cursor-pointer h-80 card-glow"
      style={{ background: '#15152E' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, rgba(7,7,20,0.97) 0%, rgba(7,7,20,0.6) 50%, rgba(7,7,20,0.15) 100%)`,
        }}
      />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, ${item.color}33 0%, transparent 60%)`,
        }}
      />

      {/* Badge */}
      <div className="absolute top-4 left-4">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: `${item.color}22`,
            color:       item.color,
            border:      `1px solid ${item.color}44`,
          }}
        >
          {item.badge}
        </span>
      </div>

      {/* Icon */}
      <div
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
        style={{ background: `${item.color}22`, border: `1px solid ${item.color}55` }}
      >
        <i className={`${item.icon} text-sm`} style={{ color: item.color }} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 line-clamp-3">
          {item.desc}
        </p>

        <div
          className="mt-4 flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75"
          style={{ color: item.color }}
        >
          <span>Ver cardápio</span>
          <i className="bi bi-arrow-right" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Specialties() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true })

  return (
    <section id="especialidades" className="section-padding" style={{ background: '#0A0A1E' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-purple-light mb-4 block">
            O que oferecemos
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossas{' '}
            <span className="text-gradient">Especialidades</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-light">
            Uma culinária pensada para impressionar.
          </p>
          <div className="divider-gradient w-32 mx-auto mt-8" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((item, i) => (
            <SpecialtyCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://linkfacil.me/sheylacrepes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <i className="bi bi-journal-bookmark-fill" />
            Ver Cardápio Completo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
