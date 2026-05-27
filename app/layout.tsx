import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor:   '#070714',
  width:        'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title:       'Sheylacrepes — Buffet Gourmet Premium',
  description: 'Buffet premium especializado em Crepes, Feijoadas, Risotos, Massas e Eventos Gourmet. Atendemos São Paulo capital, interior e litoral. Solicite seu orçamento!',
  keywords:    'buffet gourmet, crepes, feijoada, risoto, massas, churrasco, eventos, São Paulo, buffet premium',
  authors:     [{ name: 'Sheylacrepes' }],
  icons: {
    icon:  '/logo sheyla-Photoroom.png',
    apple: '/logo sheyla-Photoroom.png',
  },
  openGraph: {
    title:       'Sheylacrepes — Buffet Gourmet Premium',
    description: 'Sabor, sofisticação e experiências inesquecíveis. Buffet especializado em Crepes e muito mais.',
    type:        'website',
    locale:      'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-brand-dark text-white antialiased"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {children}
      </body>
    </html>
  )
}
