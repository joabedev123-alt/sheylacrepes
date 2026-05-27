import type { Metadata } from 'next'
import PageBanner from '@/components/PageBanner'
import Contact from '@/components/Contact'
import QuoteForm from '@/components/QuoteForm'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a Sheylacrepes. Solicite orçamento para seu evento: WhatsApp, e-mail e formulário completo. Atendemos SP capital, interior e litoral.',
}

export default function ContatoPage() {
  return (
    <>
      <PageBanner
        title="Entre em"
        titleAccent="Contato"
        subtitle="Solicite seu orçamento personalizado e vamos tornar o seu evento inesquecível juntos."
        icon="bi-chat-heart-fill"
        accentColor="#A3E635"
        breadcrumb="Contato"
      />
      <Contact />
      <QuoteForm />
    </>
  )
}
