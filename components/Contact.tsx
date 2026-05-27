'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactItems = [
  {
    icon:  'bi-whatsapp',
    title: 'WhatsApp',
    value: '(11) 91367-2688',
    href:  'https://wa.me/5511913672688',
    color: '#25D366',
    desc:  'Atendimento rápido via WhatsApp',
    cta:   'Enviar Mensagem',
  },
  {
    icon:  'bi-envelope-fill',
    title: 'E-mail',
    value: 'Sheyla.silva@live.com',
    href:  'mailto:Sheyla.silva@live.com',
    color: '#8B5CF6',
    desc:  'Para orçamentos e informações detalhadas',
    cta:   'Enviar E-mail',
  },
  {
    icon:  'bi-instagram',
    title: 'Instagram',
    value: '@sheylacrepes',
    href:  'https://www.instagram.com/sheylacrepes?igsh=cnNobjg3cTZjYnNy&utm_source=qr',
    color: '#EC4899',
    desc:  'Veja fotos dos nossos eventos',
    cta:   'Seguir',
  },
]

const regions = [
  { name: 'São Paulo Capital', icon: 'bi-building', included: true },
  { name: 'Grande São Paulo',   icon: 'bi-geo-alt',  included: true },
  { name: 'Interior de SP',    icon: 'bi-map',       included: true },
  { name: 'Litoral Paulista',  icon: 'bi-water',     included: true },
  { name: 'Outros Estados',    icon: 'bi-globe',     included: false, note: 'Sob consulta' },
]

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true })

  return (
    <section
      id="contato"
      className="section-padding"
      style={{
        background:
          'linear-gradient(180deg, #070714 0%, #0E0E24 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-purple-light mb-4 block">
            Entre em contato
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vamos <span className="text-gradient">Conversar</span>?
          </h2>
          <p className="text-base text-white/50 max-w-md mx-auto font-light">
            Estamos prontos para tornar o seu evento inesquecível. Entre em contato agora!
          </p>
          <div className="divider-gradient w-24 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              className="text-xl font-bold text-white/80 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nossos Canais
            </h3>

            {contactItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 cursor-pointer hover:translate-x-1"
                style={{
                  background: 'rgba(21,21,46,0.5)',
                  border:     `1px solid rgba(139,92,246,0.15)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}
                >
                  <i className={`${item.icon} text-2xl`} style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-0.5">
                    {item.title}
                  </div>
                  <div className="font-semibold text-white group-hover:text-gradient transition-all">
                    {item.value}
                  </div>
                  <div className="text-xs text-white/45 mt-0.5">{item.desc}</div>
                </div>
                <div
                  className="text-xs font-semibold px-3 py-1.5 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-x-2 sm:group-hover:translate-x-0 flex-shrink-0"
                  style={{
                    background: `${item.color}22`,
                    color:       item.color,
                    border:      `1px solid ${item.color}44`,
                  }}
                >
                  <span className="hidden sm:inline">{item.cta}</span>
                  <i className="bi bi-arrow-right sm:ml-1.5" />
                </div>
              </a>
            ))}
          </motion.div>

          {/* Coverage Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3
              className="text-xl font-bold text-white/80 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Área de Atendimento
            </h3>

            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'rgba(21,21,46,0.5)',
                border:     '1px solid rgba(139,92,246,0.15)',
              }}
            >
              {regions.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex items-center justify-between py-3 ${i < regions.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${r.icon} text-base`} style={{ color: r.included ? '#A3E635' : '#6B7280' }} />
                    <span className={`text-sm ${r.included ? 'text-white/80' : 'text-white/40'}`}>
                      {r.name}
                    </span>
                  </div>
                  {r.included ? (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/30 font-medium">
                      <i className="bi bi-check-circle mr-1" />
                      Disponível
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                      {r.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.12))',
                border:     '1px solid rgba(139,92,246,0.25)',
              }}
            >
              <i className="bi bi-geo-alt-fill text-3xl text-brand-purple-light mb-3 block" />
              <h4
                className="font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Seu evento não está na lista?
              </h4>
              <p className="text-xs text-white/50 mb-4">
                Entre em contato! Avaliamos sua localização e oferecemos a melhor proposta.
              </p>
              <a
                href="https://wa.me/5511913672688"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <i className="bi bi-whatsapp" />
                Consultar Disponibilidade
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
