'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ContactChannel {
  icon: string
  title: string
  color: string
  desc: string
  links: { label: string; value: string; href: string; type: 'whatsapp' | 'tel' | 'email' | 'instagram' }[]
}

const contactChannels: ContactChannel[] = [
  {
    icon:  'bi-whatsapp',
    title: 'WhatsApp (Sheyla e Marcelo)',
    color: '#25D366',
    desc:  'Atendimento rápido e orçamentos de buffet',
    links: [
      { label: 'Sheyla', value: '(11) 91367-2688', href: 'https://wa.me/5511913672688', type: 'whatsapp' },
      { label: 'Marcelo', value: '(11) 94794-8423', href: 'https://wa.me/5511947948423', type: 'whatsapp' },
      { label: 'Atendimento', value: '(11) 91549-9514', href: 'https://wa.me/5511915499514', type: 'whatsapp' },
    ],
  },
  {
    icon:  'bi-telephone-fill',
    title: 'Telefones de Contato',
    color: '#38BDF8',
    desc:  'Atendimento direto e telefone fixo',
    links: [
      { label: 'Telefone Fixo', value: '(11) 2613-2554', href: 'tel:1126132554', type: 'tel' },
      { label: 'Celular', value: '(11) 96793-8117', href: 'tel:11967938117', type: 'tel' },
    ],
  },
  {
    icon:  'bi-envelope-fill',
    title: 'E-mail',
    color: '#C8A46B',
    desc:  'Para orçamentos formais e contratos',
    links: [
      { label: 'E-mail', value: 'Sheylacrepes@outlook.com', href: 'mailto:Sheylacrepes@outlook.com', type: 'email' },
    ],
  },
  {
    icon:  'bi-instagram',
    title: 'Instagram',
    color: '#8B1E3F',
    desc:  'Siga nosso perfil e acompanhe nosso trabalho',
    links: [
      { label: 'Instagram', value: '@sheylacrepes', href: 'https://www.instagram.com/sheylacrepes?igsh=cnNobjg3cTZjYnNy&utm_source=qr', type: 'instagram' },
    ],
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
          'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg) 100%)',
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
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold-light mb-4 block">
            Entre em contato
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vamos <span className="text-gradient">Conversar</span>?
          </h2>
          <p className="text-base text-[var(--color-text)]/50 max-w-md mx-auto font-light">
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
              className="text-xl font-bold text-[var(--color-text)]/80 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nossos Canais
            </h3>

            {contactChannels.map((channel) => (
              <div
                key={channel.title}
                className="flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: 'rgba(var(--color-bg-rgb), 0.5)',
                  border:     `1px solid rgba(200,164,107,0.15)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${channel.color}18`, border: `1px solid ${channel.color}33` }}
                >
                  <i className={`${channel.icon} text-2xl`} style={{ color: channel.color }} />
                </div>
                <div className="flex-1 w-full">
                  <div className="text-xs text-[var(--color-text)]/40 uppercase tracking-widest mb-1">
                    {channel.title}
                  </div>
                  <div className="text-xs text-[var(--color-text)]/45 mb-3">{channel.desc}</div>
                  <div className="flex flex-col gap-2">
                    {channel.links.map((link) => (
                      <a
                        key={link.value}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group/item"
                      >
                        <span className="text-xs font-semibold text-[var(--color-text)]/80">
                          {link.label}: <span className="text-[var(--color-text)] font-bold ml-1">{link.value}</span>
                        </span>
                        <span
                          className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 transition-all"
                          style={{
                            background: `${channel.color}22`,
                            color:       channel.color,
                            border:      `1px solid ${channel.color}44`,
                          }}
                        >
                          {link.type === 'whatsapp' ? (
                            <><i className="bi bi-whatsapp" /> Conectar</>
                          ) : link.type === 'tel' ? (
                            <><i className="bi bi-telephone-fill" /> Ligar</>
                          ) : link.type === 'email' ? (
                            <><i className="bi bi-envelope-fill" /> Enviar</>
                          ) : (
                            <><i className="bi bi-instagram" /> Acessar</>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Coverage Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3
              className="text-xl font-bold text-[var(--color-text)]/80 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Área de Atendimento
            </h3>

            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'rgba(var(--color-bg-rgb), 0.5)',
                border:     '1px solid rgba(200,164,107,0.15)',
              }}
            >
              {regions.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex items-center justify-between py-3 ${i < regions.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${r.icon} text-base`} style={{ color: r.included ? '#C8A46B' : '#6B7280' }} />
                    <span className={`text-sm ${r.included ? 'text-[var(--color-text)]/80' : 'text-[var(--color-text)]/40'}`}>
                      {r.name}
                    </span>
                  </div>
                  {r.included ? (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/30 font-medium">
                      <i className="bi bi-check-circle mr-1" />
                      Disponível
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[var(--color-text)]/40 border border-white/10">
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
                background: 'linear-gradient(135deg, rgba(200,164,107,0.12), rgba(139,30,63,0.12))',
                border:     '1px solid rgba(200,164,107,0.25)',
              }}
            >
              <i className="bi bi-geo-alt-fill text-3xl text-brand-gold-light mb-3 block" />
              <h4
                className="font-bold text-[var(--color-text)] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Seu evento não está na lista?
              </h4>
              <p className="text-xs text-[var(--color-text)]/50 mb-4">
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
