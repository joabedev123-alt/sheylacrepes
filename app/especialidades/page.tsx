import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import Specialties from '@/components/Specialties'
import Differentials from '@/components/Differentials'

export const metadata: Metadata = {
  title: 'Especialidades',
  description:
    'Conheça todas as especialidades da Sheylacrepes: Crepes, Feijoada, Risotos, Churrasco, Massas e Estrogonoff. Buffet gourmet premium para seu evento.',
}

export default function EspecialidadesPage() {
  return (
    <>
      <PageBanner
        title="Nossas"
        titleAccent="Especialidades"
        subtitle="Seis especialidades gourmet cuidadosamente preparadas para transformar seu evento em uma experiência gastronômica inesquecível."
        icon="bi-stars"
        accentColor="#8B5CF6"
        breadcrumb="Especialidades"
      />
      <Specialties />
      <Differentials />
    </>
  )
}
