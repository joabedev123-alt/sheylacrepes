'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Data ─────────────────────────────────────────── */

const menuData = {
  crepes: {
    icon:  'bi-egg-fried',
    color: '#C8A46B',
    price: 'R$ 65,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Crianças até 6 anos não pagam', 'Frete sob consulta'],
    sections: [
      {
        title: 'Entrada',
        items: [
          { name: 'Petiscos', desc: 'Seleção de petiscos artesanais' },
          { name: 'Saladas', desc: 'Mix de folhas frescas e tomate-cereja' },
          { name: 'Folhagens', desc: 'Rúcula, alface americana, agrião' },
          { name: 'Molhos variados', desc: 'Azeite temperado, vinagrete, mostarda mel' },
        ],
      },
      {
        title: 'Crepes Salgados',
        items: [
          { name: 'Quatro Queijos', desc: 'Mussarela, gorgonzola, parmesão, provolone' },
          { name: 'Frango ao Catupiry', desc: 'Frango desfiado temperado com catupiry original' },
          { name: 'Queijo com Presunto', desc: 'Mussarela e presunto italiano defumado' },
          { name: 'Palmito com Ervas', desc: 'Palmito pupunha com mix de ervas frescas' },
          { name: 'Queijo, Tomate e Manjericão', desc: 'Inspirado no clássico caprese italiano' },
          { name: 'Camarão com Catupiry', desc: 'Camarão refogado ao alho e catupiry cremoso' },
          { name: 'Calabresa com Queijo e Cebola', desc: 'Calabresa artesanal com mussarela e cebola caramelizada' },
          { name: 'Caipira', desc: 'Frango caipira com queijo minas e milho verde' },
          { name: 'Milho com Queijo', desc: 'Milho verde cremoso com mussarela derretida' },
          { name: 'Brócolis com Queijo', desc: 'Brócolis ao alho com mussarela gratinada' },
        ],
      },
      {
        title: 'Acompanhamentos',
        items: [
          { name: 'Molho de Tomate', desc: 'Molho artesanal com tomates frescos e manjericão' },
          { name: 'Molho de Queijos', desc: 'Blend cremoso de queijos especiais' },
          { name: 'Queijo Ralado', desc: 'Parmesão ralado na hora' },
        ],
      },
      {
        title: 'Crepes Doces',
        items: [
          { name: 'Crepe Suzette', desc: 'Clássico francês com caramelo de laranja flambado' },
          { name: 'Banana com Doce de Leite', desc: 'Banana nanica com doce de leite artesanal e canela' },
          { name: 'Creme de Avelã', desc: 'Nutella premium com morango fresco picado' },
          { name: 'Prestígio', desc: 'Chocolate belga com coco fresco ralado' },
          { name: 'Romeu e Julieta', desc: 'Queijo minas fresco com goiabada cascão' },
          { name: 'Cartola', desc: 'Banana com queijo, canela e açúcar cristal' },
          { name: 'Brigadeiro', desc: 'Brigadeiro artesanal com granulado belga' },
          { name: 'Frutas com Chantilly', desc: 'Mix de frutas da estação com chantilly artesanal' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Coca Cola', desc: '350ml gelada' },
          { name: 'Guaraná', desc: '350ml gelado' },
          { name: 'Água', desc: 'Mineral sem gás' },
          { name: 'Sucos Cortesia', desc: 'Laranja, limão ou maracujá' },
        ],
      },
    ],
  },
  feijoada: {
    icon:  'bi-fire',
    color: '#8B1E3F',
    price: 'R$ 120,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Serviço completo incluso', 'Frete sob consulta'],
    sections: [
      {
        title: 'Entradas',
        items: [
          { name: 'Bolinho de Bacalhau', desc: 'Bolinhos crocantes com recheio de bacalhau desfiado' },
          { name: 'Coxinha Artesanal', desc: 'Coxinha de frango com catupiry, massa artesanal' },
          { name: 'Mini Quiche', desc: 'Quiche de queijo com ervas finas' },
          { name: 'Pão de Alho', desc: 'Pão artesanal com manteiga temperada' },
        ],
      },
      {
        title: 'Buffet Principal',
        items: [
          { name: 'Feijoada Completa', desc: 'Feijão preto com carnes nobres: linguiça, costelinha, lombo' },
          { name: 'Costela Suína', desc: 'Costela assada lentamente até desmanchar' },
          { name: 'Linguiça Artesanal', desc: 'Linguiça toscana e calabresa defumada' },
          { name: 'Rabo e Pé de Porco', desc: 'Tradicional para os mais autênticos' },
          { name: 'Orelha e Charque', desc: 'Defumados selecionados de primeira qualidade' },
        ],
      },
      {
        title: 'Guarnições',
        items: [
          { name: 'Arroz Branco Soltinho', desc: 'Arroz agulhinha de primeira' },
          { name: 'Couve Refogada', desc: 'Couve manteiga finamente fatiada com alho' },
          { name: 'Farofa Artesanal', desc: 'Farofa especial com bacon, cebola e temperos' },
          { name: 'Laranja Fatiada', desc: 'Laranja pêra para equilibrar o sabor' },
          { name: 'Torresmo Crocante', desc: 'Torresmo artesanal levemente salgado' },
        ],
      },
      {
        title: 'Saladas',
        items: [
          { name: 'Mix de Folhas', desc: 'Alface, rúcula, espinafre baby' },
          { name: 'Vinagrete', desc: 'Tomate, pimentão e cebola ao vinagre' },
          { name: 'Palmito ao Azeite', desc: 'Palmito pupunha com azeite extravirgem' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Pudim de Leite', desc: 'Pudim cremoso tradicional de leite condensado' },
          { name: 'Doce de Abóbora', desc: 'Doce de abóbora com coco em calda' },
          { name: 'Manjar Branco', desc: 'Manjar de coco com calda de ameixas' },
          { name: 'Quindim', desc: 'Quindim de coco artesanal' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Caipirinha de Limão', desc: 'Cachaça artesanal com limão tahiti' },
          { name: 'Refrigerantes', desc: 'Coca, Guaraná, Soda' },
          { name: 'Água Mineral', desc: 'Com e sem gás' },
          { name: 'Suco de Laranja', desc: 'Natural espremido na hora' },
        ],
      },
    ],
  },
  risotos: {
    icon:  'bi-award',
    color: '#D9B97E',
    price: 'R$ 100,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Equipamentos inclusos', 'Frete sob consulta'],
    sections: [
      {
        title: 'Sabores de Risoto',
        items: [
          { name: 'Funghi Trufado', desc: 'Cogumelos porcini secos com toque de trufa negra e parmesão' },
          { name: 'Camarão Gratinado', desc: 'Camarão ao alho com creme de queijo gratinado' },
          { name: 'Queijo Trufado', desc: 'Blend de queijos com óleo de trufa premium' },
          { name: 'Frango com Açafrão', desc: 'Frango desfiado com açafrão legítimo e ervas finas' },
          { name: 'Primavera', desc: 'Legumes frescos da estação, levinho e colorido' },
          { name: 'Linguiça com Queijo', desc: 'Linguiça artesanal com queijo coalho e pimenta rosa' },
        ],
      },
      {
        title: 'Entradas',
        items: [
          { name: 'Bruschetta Artesanal', desc: 'Pão italiano com tomate, manjericão e azeite' },
          { name: 'Salada Caesar', desc: 'Alface romana, croutons, parmesão e molho caesar' },
          { name: 'Carpaccio de Abobrinha', desc: 'Abobrinha fatiada fina com limão e alcaparras' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Tiramisù', desc: 'Clássico italiano com mascarpone e café expresso' },
          { name: 'Panna Cotta', desc: 'Com calda de frutas vermelhas ou caramelo' },
          { name: 'Gelato Artesanal', desc: 'Sabores da estação, cremoso e artesanal' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Vinho Branco Seco', desc: 'Harmonização perfeita com risotos' },
          { name: 'Água com Gás', desc: 'Importada premium' },
          { name: 'Refrigerantes', desc: 'Linha completa' },
          { name: 'Suco Natural', desc: 'Laranja, limão ou maracujá' },
        ],
      },
    ],
  },
  churrasco: {
    icon:  'bi-thermometer-high',
    color: '#A8844A',
    price: 'R$ 120,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Churrasqueiro incluso', 'Frete sob consulta'],
    sections: [
      {
        title: 'Carnes Premium',
        items: [
          { name: 'Picanha Maturada', desc: 'Picanha especial maturada no sal grosso, no ponto certo' },
          { name: 'Fraldinha', desc: 'Corte nobre, macia e suculenta com marinada especial' },
          { name: 'Costela Gaúcha', desc: 'Costela assada no bafo por horas, desmancha na boca' },
          { name: 'Linguiça Artesanal', desc: 'Toscana e calabresa, feitas por churrasqueiro gaúcho' },
          { name: 'Frango Marinado', desc: 'Coxa, sobrecoxa e asa marinados em ervas e limão' },
          { name: 'Alcatra Nobre', desc: 'Corte especial com tempero seco e azeite' },
        ],
      },
      {
        title: 'Entradas',
        items: [
          { name: 'Pão de Alho Artesanal', desc: 'Pão italiano com manteiga de alho e ervas' },
          { name: 'Vinagrete Especial', desc: 'Tomate, pimentão, cebola e coentro' },
          { name: 'Queijo Coalho Grelhado', desc: 'Com orégano e mel de abelha' },
          { name: 'Pimentão Recheado', desc: 'Recheado com carne moída e queijo' },
        ],
      },
      {
        title: 'Guarnições',
        items: [
          { name: 'Arroz à Grega', desc: 'Arroz com legumes frescos e temperos especiais' },
          { name: 'Maionese Temperada', desc: 'Maionese artesanal com cenoura, ervilha e azeitona' },
          { name: 'Farofa de Bacon', desc: 'Farofa artesanal crocante com bacon e cebola' },
          { name: 'Salada Verde', desc: 'Mix de folhas com vinagrete artesanal' },
          { name: 'Mandioca Frita', desc: 'Aipim crocante frito na hora' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Pudim de Leite', desc: 'Receita artesanal de leite condensado' },
          { name: 'Abacaxi Grelhado', desc: 'Com canela, açúcar e sorvete de creme' },
          { name: 'Brigadeiro Gourmet', desc: 'Brigadeiro artesanal em formatos especiais' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Cerveja Artesanal', desc: 'Lager, IPA e Weizen sob consulta' },
          { name: 'Caipirinha', desc: 'Limão, morango ou maracujá' },
          { name: 'Refrigerantes', desc: 'Linha completa gelada' },
          { name: 'Água Mineral', desc: 'Geladinha sem parar' },
        ],
      },
    ],
  },
  massas: {
    icon:  'bi-stars',
    color: '#C8A46B',
    price: 'R$ 100,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Macarronada inclusa', 'Frete sob consulta'],
    sections: [
      {
        title: 'Massas Secas',
        items: [
          { name: 'Penne Rigate', desc: 'Canelado especial, perfeito com molhos encorpados' },
          { name: 'Farfalle', desc: 'Borboleta italiana, levinha e sofisticada' },
          { name: 'Rigatoni', desc: 'Tubo largo com ranhuras que guardam o molho' },
          { name: 'Espaguete', desc: 'O clássico eterno, al dente na medida certa' },
          { name: 'Fusilli', desc: 'Espiral que abraça cada molho com sabor' },
        ],
      },
      {
        title: 'Massas Recheadas',
        items: [
          { name: 'Ravioli de Ricota', desc: 'Recheado com ricota, espinafre e noz-moscada' },
          { name: 'Tortellini de Frango', desc: 'Mini pasta recheada com frango e ervas' },
          { name: 'Nhoque de Batata', desc: 'Nhoque artesanal com molho ao sugo' },
          { name: 'Capelletti de Carne', desc: 'Recheado com carne assada e parmesão' },
        ],
      },
      {
        title: 'Molhos Especiais',
        items: [
          { name: 'Bolonhesa', desc: 'Carne moída com tomate italiano San Marzano' },
          { name: 'Carbonara', desc: 'Guanciale, ovo, parmesão e pimenta-do-reino' },
          { name: 'Pesto Genovese', desc: 'Manjericão fresco, pinholi e azeite extravirgem' },
          { name: 'Pomodoro', desc: 'Tomate fresco, alho e manjericão simples e perfeito' },
          { name: 'Funghi', desc: 'Cogumelos variados com creme fresco e azeite trufado' },
          { name: 'Alfredo', desc: 'Manteiga, nata e parmesão para os amantes de creme' },
        ],
      },
      {
        title: 'Saladas',
        items: [
          { name: 'Mix de Folhas Frescas', desc: 'Com tomate-cereja, azeitona e vinagrete de mostarda' },
          { name: 'Caprese', desc: 'Tomate, mozzarella de búfala, manjericão e azeite' },
          { name: 'Caesar Salad', desc: 'Alface romana, croutons, parmesão e molho caesar' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Tiramisù Clássico', desc: 'Mascarpone, café expresso e cacau em pó' },
          { name: 'Panna Cotta', desc: 'Com geleia de frutas vermelhas ou caramelo' },
          { name: 'Cannoli Siciliano', desc: 'Massa crocante com creme de ricota e pistache' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Vinho Tinto', desc: 'Harmonização com massas ao sugo e bolonhesa' },
          { name: 'Vinho Branco', desc: 'Ideal para massas ao creme e pesto' },
          { name: 'Água com Gás Italiana', desc: 'San Pellegrino ou similar' },
          { name: 'Refrigerantes', desc: 'Linha completa' },
        ],
      },
    ],
  },
  strogonoff: {
    icon:  'bi-bowl-hot',
    color: '#C8A46B',
    price: 'R$ 100,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Preparo ao vivo', 'Frete sob consulta'],
    sections: [
      {
        title: 'Strogonoff',
        items: [
          { name: 'Strogonoff de Frango', desc: 'Frango desfiado ao creme de leite com champignon e ketchup artesanal' },
          { name: 'Strogonoff de Carne', desc: 'Filé mignon em tiras ao molho cremoso com champignon' },
          { name: 'Strogonoff de Camarão', desc: 'Camarão ao molho rosé cremoso com champignon fresco' },
        ],
      },
      {
        title: 'Acompanhamentos',
        items: [
          { name: 'Arroz Branco', desc: 'Arroz soltinho temperado na manteiga' },
          { name: 'Batata Palha Artesanal', desc: 'Batata palha crocante frita na hora' },
          { name: 'Arroz à Grega', desc: 'Arroz com legumes frescos e temperos especiais' },
        ],
      },
      {
        title: 'Entradas',
        items: [
          { name: 'Salada Verde', desc: 'Mix de folhas frescas com tomate-cereja e vinagrete' },
          { name: 'Pão de Alho', desc: 'Pão italiano com manteiga de alho e ervas frescas' },
          { name: 'Caldo de Mandioca', desc: 'Caldo cremoso com mandioca e temperos especiais' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Pudim de Leite', desc: 'Receita artesanal de leite condensado' },
          { name: 'Brigadeiro Gourmet', desc: 'Brigadeiro artesanal em formatos especiais' },
          { name: 'Mousse de Maracujá', desc: 'Mousse leve com calda de maracujá fresco' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Refrigerantes', desc: 'Linha completa gelada' },
          { name: 'Suco Natural', desc: 'Laranja, limão ou maracujá' },
          { name: 'Água Mineral', desc: 'Com e sem gás bem gelada' },
        ],
      },
    ],
  },
}

type MenuKey = keyof typeof menuData

const tabs: { key: MenuKey; label: string; icon: string }[] = [
  { key: 'crepes',     label: 'Crepes',     icon: 'bi-egg-fried' },
  { key: 'feijoada',   label: 'Feijoada',   icon: 'bi-fire' },
  { key: 'risotos',    label: 'Risotos',    icon: 'bi-award' },
  { key: 'churrasco',  label: 'Churrasco',  icon: 'bi-thermometer-high' },
  { key: 'massas',     label: 'Massas',     icon: 'bi-stars' },
  { key: 'strogonoff', label: 'Strogonoff', icon: 'bi-bowl-hot' },
]

/* ── Accordion Item ───────────────────────────────── */
function AccordionSection({
  section,
  accent,
}: {
  section: (typeof menuData.crepes.sections)[0]
  accent: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl overflow-hidden mb-3" style={{ background: 'rgba(21,21,46,0.6)', border: `1px solid ${open ? accent + '44' : 'rgba(200,164,107,0.15)'}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group transition-colors"
        style={{ background: open ? `${accent}0D` : 'transparent' }}
      >
        <span
          className="font-semibold text-sm uppercase tracking-widest transition-colors"
          style={{ color: open ? accent : '#C4B5FD' }}
        >
          {section.title}
        </span>
        <motion.i
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bi bi-chevron-down text-sm"
          style={{ color: open ? accent : '#6B7280' }}
        />
      </button>

      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="px-5 pb-5 pt-1">
          <div className="divider-gradient mb-4 opacity-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-white/5"
              >
                <div className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                <div>
                  <div className="text-sm font-semibold text-white/90">{item.name}</div>
                  <div className="text-xs text-white/45 mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ───────────────────────────────── */
export default function MenuSection() {
  const [active, setActive] = useState<MenuKey>('crepes')
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true })

  const current = menuData[active]

  useEffect(() => {
    const handleOpenTab = (e: Event) => {
      const customEvent = e as CustomEvent<MenuKey>;
      if (customEvent.detail && menuData[customEvent.detail]) {
        setActive(customEvent.detail);
      }
    };
    window.addEventListener('openMenuTab', handleOpenTab);
    return () => window.removeEventListener('openMenuTab', handleOpenTab);
  }, []);

  return (
    <section id="cardapios" className="section-padding" style={{ background: '#0F0F0F' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cream mb-4 block">
            Menu completo
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossos <span className="text-gradient-accent">Cardápios</span>
          </h2>
          <p className="text-base text-white/50 max-w-md mx-auto font-light">
            Selecione a especialidade e explore o cardápio completo.
          </p>
          <div className="divider-gradient w-24 mx-auto mt-8" />
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const data = menuData[tab.key]
            const isActive = active === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${data.color}33, ${data.color}18)` : 'rgba(21,21,46,0.6)',
                  border:     `1px solid ${isActive ? data.color + '66' : 'rgba(200,164,107,0.2)'}`,
                  color:      isActive ? data.color : '#9CA3AF',
                  boxShadow:  isActive ? `0 0 20px ${data.color}22` : 'none',
                }}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Price & Info Bar */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl mb-6"
              style={{
                background: `linear-gradient(135deg, ${current.color}18, ${current.color}0A)`,
                border:     `1px solid ${current.color}33`,
              }}
            >
              <div className="flex items-center gap-3">
                <i className={`${current.icon} text-2xl`} style={{ color: current.color }} />
                <div>
                  <div
                    className="text-xl font-black"
                    style={{ color: current.color, fontFamily: "'Playfair Display', serif" }}
                  >
                    {current.price}
                  </div>
                  <div className="text-xs text-white/40">por pessoa</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.info.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${current.color}18`,
                      color:       current.color,
                      border:      `1px solid ${current.color}33`,
                    }}
                  >
                    <i className="bi bi-check-circle mr-1.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Accordion Sections */}
            {current.sections.map((section) => (
              <AccordionSection key={section.title} section={section} accent={current.color} />
            ))}

            {/* CTA */}
            <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#orcamento"
                className="btn-primary"
                style={{ background: `linear-gradient(135deg, ${current.color}, #EC4899)` }}
              >
                <i className="bi bi-clipboard-check" />
                Solicitar Este Cardápio
              </a>
              <a
                href="https://wa.me/5511913672688"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <i className="bi bi-whatsapp" />
                Tirar Dúvidas
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
