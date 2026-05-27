'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const differentials = [
  {
    icon:  'bi-geo-alt-fill',
    title: 'São Paulo Capital',
    desc:  'Atendemos toda a capital paulistana, de ponta a ponta, com pontualidade e excelência.',
    color: '#C8A46B',
  },
  {
    icon:  'bi-map-fill',
    title: 'Interior e Litoral',
    desc:  'Levamos nossa cozinha gourmet a qualquer cidade do interior e litoral de SP. Frete sob consulta.',
    color: '#8B1E3F',
  },
  {
    icon:  'bi-people-fill',
    title: 'Equipe Especializada',
    desc:  'Time de profissionais treinados e apaixonados por gastronomia, prontos para encantar seus convidados.',
    color: '#D9B97E',
  },
  {
    icon:  'bi-stars',
    title: 'Eventos Sofisticados',
    desc:  'Casamentos, aniversários, corporativos e confraternizações. Cada evento é único e memorável.',
    color: '#C8A46B',
  },
  {
    icon:  'bi-patch-check-fill',
    title: 'Ingredientes Premium',
    desc:  'Selecionamos os melhores ingredientes do mercado para garantir sabor e qualidade excepcionais.',
    color: '#C8A46B',
  },
  {
    icon:  'bi-box-seam-fill',
    title: 'Estrutura Completa',
    desc:  'Levamos toda a estrutura necessária: equipamentos, utensílios, decoração e muito mais.',
    color: '#8B1E3F',
  },
  {
    icon:  'bi-award-fill',
    title: 'Experiência Gourmet',
    desc:  'Mais de 10 anos transformando eventos comuns em experiências gastronômicas extraordinárias.',
    color: '#D9B97E',
  },
  {
    icon:  'bi-heart-fill',
    title: 'Atendimento Personalizado',
    desc:  'Cada cliente é único. Desenvolvemos propostas personalizadas para cada tipo de evento.',
    color: '#C8A46B',
  },
]

function DifferentialCard({ item, index }: { item: typeof differentials[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="group p-6 rounded-2xl card-glow cursor-default"
      style={{ background: 'rgba(21,21,46,0.5)', border: '1px solid rgba(200,164,107,0.15)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}
      >
        <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
      </div>
      <h3 className="font-bold text-base text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {item.title}
      </h3>
      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
      <div
        className="h-0.5 w-0 group-hover:w-full rounded-full mt-4 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Differentials() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true })

  return (
    <section
      id="diferenciais"
      className="section-padding"
      style={{
        background: '#0F0F0F',
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(200,164,107,0.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
            Por que nos escolher
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossos <span className="text-gradient">Diferenciais</span>
          </h2>
          <p className="text-base text-white/50 max-w-md mx-auto font-light">
            Comprometidos em entregar muito mais do que gastronomia — entregamos momentos.
          </p>
          <div className="divider-gradient w-24 mx-auto mt-8" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentials.map((item, i) => (
            <DifferentialCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
