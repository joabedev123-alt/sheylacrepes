import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Specialties from '@/components/Specialties'
import MenuSection from '@/components/MenuSection'
import Differentials from '@/components/Differentials'
import About from '@/components/About'
import QuoteForm from '@/components/QuoteForm'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import SplashScreen from '@/components/SplashScreen'
import Portfolio from '@/components/Portfolio'

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <main>
        <Hero />
        <About />
        <Specialties />
        <MenuSection />
        <Differentials />
        <Portfolio />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
