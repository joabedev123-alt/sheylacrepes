'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

type Specialty = {
  id: string;
  title: string;
  icon: string;
  desc: string;
  image: string;
  color: string;
  badge: string;
  link?: string;
};

const specialties: Specialty[] = [
  {
    id:    'crepes',
    title: 'Crepes',
    icon:  'bi-egg-fried',
    desc:  'Crepes salgados e doces preparados ao vivo com ingredientes selecionados. Da tradição francesa ao toque gourmet brasileiro.',
    image: '/crapes.jpeg',
    color: '#C8A46B',
    badge: 'Especialidade principal',
    link:  'https://linkfacil.me/sheylacrepes/ci/crepes-YMzpkNO6',
  },
  {
    id:    'feijoada',
    title: 'Feijoada',
    icon:  'bi-fire',
    desc:  'Feijoada completa e autêntica, com todos os acompanhamentos tradicionais e um toque de sofisticação gourmet.',
    image: '/feijoada.jpg',
    color: '#8B1E3F',
    badge: 'Sabor da tradição',
    link:  'https://linkfacil.me/sheylacrepes/ci/feijoada-XI4C5T09',
  },
  {
    id:    'risotos',
    title: 'Risotos',
    icon:  'bi-award',
    desc:  'Risotos cremosos preparados ao vivo com ingredientes premium. Do funghi trufado ao camarão gratinado.',
    image: '/risoto.jpeg',
    color: '#D9B97E',
    badge: 'Preparo ao vivo',
    link:  'https://linkfacil.me/sheylacrepes/ci/risoto-s3QfzhXd',
  },
  {
    id:    'churrasco',
    title: 'Churrasco',
    icon:  'bi-thermometer-high',
    desc:  'Carnes nobres selecionadas, temperadas com nossa marinada exclusiva e assadas no ponto perfeito para seu evento.',
    image: '/churasco.png',
    color: '#A8844A',
    badge: 'Carnes premium',
    link:  'https://linkfacil.me/sheylacrepes/ci/churrasco-G2JQsHe4',
  },
  {
    id:    'massas',
    title: 'Massas',
    icon:  'bi-stars',
    desc:  'Massas artesanais frescas com molhos especiais italianos. Penne, farfalle, rigatoni, ravioli e muito mais.',
    image: '/massas.png',
    color: '#C8A46B',
    badge: 'Culinária italiana',
    link:  'https://linkfacil.me/sheylacrepes/ci/massas-7aJVq1n5',
  },
  {
    id:    'estrogonoff',
    title: 'Estrogonoff',
    icon:  'bi-gem',
    desc:  'Estrogonoff cremoso e sofisticado, preparado com cortes nobres e temperos especiais que conquistam todos os paladares.',
    image: '/strogonoff.png',
    color: '#8B1E3F',
    badge: 'Receita especial',
    link:  'https://linkfacil.me/sheylacrepes/ci/estrogonoff-AxUrWWxB',
  },
]

function SpecialtyCard({ item, index }: { item: Specialty; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleCardClick = () => {
    if (item.link) {
      window.open(item.link, '_blank');
    } else {
      const event = new CustomEvent('openMenuTab', { detail: item.id });
      window.dispatchEvent(event);
      document.getElementById('cardapios')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleCardClick}
      className="relative group rounded-2xl overflow-hidden cursor-pointer h-80 card-glow"
      style={{ background: '#0F0F0F' }}
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
          className="text-[9px] font-light uppercase tracking-widest px-3 py-1 rounded-full"
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
          className="text-2xl font-medium text-white mb-2 group-hover:text-gradient transition-all"
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
    <section id="especialidades" className="section-padding relative bg-gradient-to-b from-[#0F0F0F]/30 to-[#0F0F0F]/10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-light uppercase tracking-[0.4em] text-purple-300 mb-4 block">
            Experiência Gastronômica
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Curadoria de{' '}
            <span className="text-gradient font-semibold">Sabores</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto font-light tracking-wide">
            Um repertório elaborado para surpreender os paladares mais exigentes.
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
