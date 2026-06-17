import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor:   '#070714',
  width:        'device-width',
  initialScale: 1,
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sheylacrepes.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    images: [
      {
        url: '/logo-sheyla.jpeg',
        width: 800,
        height: 800,
        alt: 'Logo Sheylacrepes',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo-sheyla.jpeg'],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
        className="antialiased"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {children}
      </body>
    </html>
  )
}
