'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const values = [
  { icon: 'bi-heart-fill',        label: 'Paixão pela gastronomia', color: '#EC4899' },
  { icon: 'bi-patch-check-fill',  label: 'Ingredientes selecionados', color: '#8B5CF6' },
  { icon: 'bi-people-fill',       label: 'Equipe profissional',        color: '#F59E0B' },
  { icon: 'bi-award-fill',        label: 'Eventos memoráveis',         color: '#A3E635' },
]

export default function About() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="sobre"
      className="section-padding"
      style={{ background: '#070714' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                alt="Sheylacrepes — Buffet gourmet premium em evento"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top right, rgba(7,7,20,0.5) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:-right-8 glass rounded-2xl p-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
                >
                  <i className="bi bi-patch-heart-fill text-white text-2xl" />
                </div>
                <div>
                  <div
                    className="text-2xl font-black text-gradient-brand"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    500+
                  </div>
                  <div className="text-xs text-white/60 leading-tight">
                    Eventos realizados<br />com sucesso
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative glow */}
            <div
              className="absolute -top-10 -left-10 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(139,92,246,0.12)' }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-purple-light mb-4 block">
              Nossa história
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sobre a{' '}
              <span className="text-gradient">Sheylacrepes</span>
            </h2>

            <p className="text-base text-white/65 leading-relaxed mb-5">
              A <strong className="text-white/90">Sheylacrepes</strong> nasceu da paixão genuína pela
              gastronomia e pelo desejo de transformar cada evento em uma experiência inesquecível.
              Com mais de uma década de atuação no mercado de buffet premium, construímos uma
              trajetória marcada pela excelência culinária e pelo cuidado personalizado com cada cliente.
            </p>

            <p className="text-base text-white/65 leading-relaxed mb-5">
              Nossa equipe é formada por profissionais apaixonados, que colocam dedicação e criatividade
              em cada prato servido. Do preparo ao vivo de crepes sofisticados às feijoadas tradicionais
              e risotos cremosos, cada detalhe é pensado para encantar seu paladar e o de seus convidados.
            </p>

            <p className="text-base text-white/65 leading-relaxed mb-10">
              Atendemos São Paulo capital, interior e litoral, levando a mesma qualidade e sofisticação
              independente do local. Porque para a Sheylacrepes, cada evento merece o melhor.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${v.color}10`, border: `1px solid ${v.color}22` }}
                >
                  <i className={`${v.icon} text-base`} style={{ color: v.color }} />
                  <span className="text-xs font-medium text-white/80">{v.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#orcamento" className="btn-primary">
                <i className="bi bi-clipboard-check" />
                Solicitar Orçamento
              </a>
              <a
                href="https://wa.me/5511913672688"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <i className="bi bi-whatsapp" />
                Falar Conosco
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
