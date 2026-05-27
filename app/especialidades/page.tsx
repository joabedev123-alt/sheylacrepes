import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import Specialties from '@/components/Specialties'
import Differentials from '@/components/Differentials'

export const metadata: Metadata = {
  title: 'Especialidades',
  description:
    'Conheça todas as especialidades da Sheylacrepes: Crepes, Feijoada, Risotos, Churrasco, Massas e Estrogonoff. Buffet gourmet premium em São Paulo.',
}

export default function EspecialidadesPage() {
  return (
    <>
      <PageBanner
        title="Nossas"
        titleAccent="Especialidades"
        subtitle="Uma culinária pensada para impressionar. Escolha a especialidade e encante seus convidados."
        icon="bi-grid-3x3-gap-fill"
        accentColor="#8B5CF6"
        breadcrumb="Especialidades"
      />
      <Specialties />
      <Differentials />
    </>
  )
}
