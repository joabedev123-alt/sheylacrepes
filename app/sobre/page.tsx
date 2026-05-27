import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a história da Sheylacrepes: mais de 10 anos de experiência em buffet gourmet. Atendemos São Paulo, interior e litoral com qualidade e sofisticação.',
}

export default function SobrePage() {
  return (
    <>
      <PageBanner
        title="Sobre a"
        titleAccent="Sheylacrepes"
        subtitle="Mais de 10 anos transformando eventos em experiências gastronômicas inesquecíveis."
        icon="bi-patch-heart-fill"
        accentColor="#F59E0B"
        breadcrumb="Sobre"
      />
      <About />
    </>
  )
}
