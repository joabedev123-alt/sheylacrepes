'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const values = [
  { icon: 'bi-heart-fill',        label: 'Paixão pela gastronomia', color: '#8B1E3F' },
  { icon: 'bi-patch-check-fill',  label: 'Ingredientes selecionados', color: '#C8A46B' },
  { icon: 'bi-people-fill',       label: 'Equipe profissional',        color: '#D9B97E' },
  { icon: 'bi-award-fill',        label: 'Eventos memoráveis',         color: '#C8A46B' },
]

export default function About() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="sobre"
      className="section-padding relative bg-gradient-to-b from-transparent to-[var(--color-bg)]/30"
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
                    'linear-gradient(to top right, rgba(var(--color-bg-rgb), 0.5) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:-right-8 glass rounded-2xl p-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ border: '1px solid rgba(200,164,107,0.3)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C8A46B, #8B1E3F)' }}
                >
                  <i className="bi bi-patch-heart-fill text-[var(--color-text)] text-2xl" />
                </div>
                <div>
                  <div
                    className="text-2xl font-semibold text-gradient-brand"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    500+
                  </div>
                  <div className="text-[10px] text-[var(--color-text)]/60 leading-tight uppercase tracking-widest font-light mt-1">
                    Celebrações<br />Realizadas
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative glow */}
            <div
              className="absolute -top-10 -left-10 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(200,164,107,0.12)' }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="text-[10px] font-light uppercase tracking-[0.4em] text-purple-300 mb-4 block">
              Essência & Legado
            </span>
            <h2
              className="text-3xl md:text-4xl font-normal text-[var(--color-text)] mb-6 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Arte de Receber com <br />
              <span className="text-gradient font-semibold">Exclusividade</span>
            </h2>

            <p className="text-sm md:text-base text-[var(--color-text)]/60 leading-relaxed mb-5 font-light tracking-wide">
              A <strong className="text-[var(--color-text)]/80 font-normal">Sheylacrepes</strong> transcende o conceito tradicional de buffet. Nascemos da paixão genuína pela alta gastronomia e do desejo de eternizar momentos. Com mais de uma década de dedicação ao mercado premium, tecemos uma trajetória pautada pela excelência e pelo cuidado artesanal em cada detalhe.
            </p>

            <p className="text-sm md:text-base text-[var(--color-text)]/60 leading-relaxed mb-5 font-light tracking-wide">
              Nossa curadoria gastronômica é conduzida por profissionais exímios, que harmonizam técnica e criatividade. Do preparo ao vivo de crepes requintados à releitura de clássicos como feijoadas e risotos, cada criação é concebida para despertar os sentidos e surpreender seus convidados.
            </p>

            <p className="text-sm md:text-base text-[var(--color-text)]/60 leading-relaxed mb-10 font-light tracking-wide">
              Com atuação em São Paulo capital, interior e litoral, garantimos o mesmo rigor estético e gustativo em qualquer cenário. Afinal, a sua celebração merece a assinatura de um serviço impecável.
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
                  <span className="text-xs font-medium text-[var(--color-text)]/80">{v.label}</span>
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
