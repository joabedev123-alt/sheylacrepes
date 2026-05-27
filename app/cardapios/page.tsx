import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import MenuSection from '@/components/MenuSection'

export const metadata: Metadata = {
  title: 'Cardápios',
  description:
    'Cardápio completo da Sheylacrepes: Crepes salgados e doces, Feijoada, Risotos, Churrasco e Massas. Preços e condições para seu evento.',
}

export default function CardapiosPage() {
  return (
    <>
      <PageBanner
        title="Nossos"
        titleAccent="Cardápios"
        subtitle="Explore o cardápio completo de cada especialidade e monte o buffet perfeito para o seu evento."
        icon="bi-journal-bookmark-fill"
        accentColor="#EC4899"
        breadcrumb="Cardápios"
      />
      <MenuSection />
    </>
  )
}
