import Link from 'next/link'

const quickLinks = [
  { href: '/',               label: 'Início' },
  { href: '/especialidades', label: 'Especialidades' },
  { href: '/cardapios',      label: 'Cardápios' },
  { href: '/sobre',          label: 'Sobre' },
  { href: '/contato',        label: 'Solicitar Orçamento' },
  { href: '/contato',        label: 'Contato' },
]

const specialtiesLinks = [
  { href: '/cardapios', label: 'Crepes' },
  { href: '/cardapios', label: 'Feijoada' },
  { href: '/cardapios', label: 'Risotos' },
  { href: '/cardapios', label: 'Churrasco' },
  { href: '/cardapios', label: 'Massas' },
  { href: '/cardapios', label: 'Estrogonoff' },
]

export default function Footer() {
  return (
    <footer
      style={{ background: '#04040E', borderTop: '1px solid rgba(139,92,246,0.15)' }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
              >
                <i className="bi bi-patch-heart-fill text-white text-lg" />
              </div>
              <div>
                <div
                  className="text-2xl font-black text-gradient"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sheylacrepes
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-purple-300/50 font-light">
                  Buffet Gourmet Premium
                </div>
              </div>
            </div>

            <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
              Transformando eventos comuns em experiências gastronômicas inesquecíveis desde 2013.
              Atendemos SP capital, interior e litoral.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sheylacrepes?igsh=cnNobjg3cTZjYnNy&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.25)' }}
                aria-label="Instagram"
              >
                <i className="bi bi-instagram text-pink-400" />
              </a>
              <a
                href="https://www.facebook.com/sheylacrepes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)' }}
                aria-label="Facebook"
              >
                <i className="bi bi-facebook text-blue-400" />
              </a>
              <a
                href="https://wa.me/5511913672688"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp text-green-400" />
              </a>
              <a
                href="mailto:Sheylacrepes@outlook.com"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
                aria-label="E-mail"
              >
                <i className="bi bi-envelope-fill text-purple-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-purple-light mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/80 transition-colors duration-200 flex items-center gap-2 cursor-pointer group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-brand-purple/50 group-hover:bg-brand-purple transition-colors flex-shrink-0"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties + Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-light mb-5">
              Especialidades
            </h4>
            <ul className="space-y-2.5 mb-8">
              {specialtiesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/80 transition-colors duration-200 flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-pink/50 group-hover:bg-brand-pink transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime mb-4">
              Contato
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <i className="bi bi-telephone text-brand-lime" />
                <span>(11) 91367-2688</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <i className="bi bi-envelope text-brand-lime" />
                <span>Sheyla.silva@live.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <i className="bi bi-geo-alt text-brand-lime" />
                <span>São Paulo, SP — Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/30 text-center sm:text-left">
              © {new Date().getFullYear()}{' '}
              <span className="text-gradient-brand font-semibold">Sheylacrepes</span>{' '}
              — Buffet Gourmet Premium. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-1 text-xs text-white/25">
              <span>Feito com</span>
              <i className="bi bi-heart-fill text-pink-500/60" />
              <span>para eventos inesquecíveis</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
