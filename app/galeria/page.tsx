import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import Gallery from '@/components/Gallery'

export const metadata: Metadata = {
  title: 'Galeria',
  description:
    'Galeria de fotos da Sheylacrepes: veja nossos eventos, pratos e especialidades. Buffet gourmet premium em São Paulo.',
}

export default function GaleriaPage() {
  return (
    <>
      <PageBanner
        title="Nossa"
        titleAccent="Galeria"
        subtitle="Momentos que marcam. Veja um pouco do que preparamos para eventos e celebrações especiais."
        icon="bi-images"
        accentColor="#A3E635"
        breadcrumb="Galeria"
      />
      <Gallery />
    </>
  )
}
