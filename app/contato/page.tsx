import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import QuoteForm from '@/components/QuoteForm'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a Sheylacrepes. Solicite orçamento para seu evento gourmet em São Paulo. Respondemos em até 24 horas.',
}

export default function ContatoPage() {
  return (
    <>
      <PageBanner
        title="Fale"
        titleAccent="Conosco"
        subtitle="Solicite seu orçamento personalizado. Respondemos em até 24 horas úteis."
        icon="bi-chat-heart-fill"
        accentColor="#EC4899"
        breadcrumb="Contato"
      />
      <QuoteForm />
      <Contact />
    </>
  )
}
