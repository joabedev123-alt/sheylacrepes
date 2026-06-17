'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Data ─────────────────────────────────────────── */

const menuData = {
  crepes: {
    icon:  'bi-egg-fried',
    color: '#C8A46B',
    price: 'R$ 65,00 / pessoa',
    info:  ['Equipe especializada', '4 horas de evento', 'Mínimo 30 pessoas', 'Crianças até 6 anos não pagam', 'Deslocamento a consultar'],
    sections: [
      {
        title: 'Entrada',
        items: [
          { name: 'Petiscos', desc: 'São feitos com a mesma massa do crepe com crosta de queijo crocante por fora' },
          { name: 'Saladas', desc: '(Com 2 tipos de folhagens)\nSalada de alface americano com cenoura e milho palmito\nAlface crespa decorada com queijo e tomate cereja manga\nMolho de mostarda e molho italiano' },
        ],
      },
      {
        title: 'Crepes Salgados',
        items: [
          { name: 'Quatro queijos', desc: '' },
          { name: 'Frango ao catupiry', desc: '' },
          { name: 'Queijo, com presunto', desc: '' },
          { name: 'Palmito com ervas', desc: '' },
          { name: 'Queijo, tomate e manjericão', desc: '' },
          { name: 'Camarão com catupiry e ervas', desc: '' },
          { name: 'Calabresa com queijo e cebola', desc: '' },
          { name: 'Caipira (queijo milho e frango desfiado)', desc: '' },
          { name: 'Milho com queijo', desc: '' },
          { name: 'Brócolis com queijo', desc: '' },
        ],
      },
      {
        title: 'Acompanhamentos',
        items: [
          { name: 'Sorvete de creme', desc: '' },
          { name: 'Farofa de paçoca', desc: '' },
          { name: 'Calda de chocolate', desc: '' },
        ],
      },
      {
        title: 'Crepes Doces',
        items: [
          { name: 'Crepe Suzette', desc: '' },
          { name: 'Banana com doce de leite', desc: '' },
          { name: 'Banana com açúcar e canela', desc: '' },
          { name: 'Creme de avelã', desc: '' },
          { name: 'Prestigio', desc: '' },
          { name: 'Banana com creme de avelã', desc: '' },
          { name: 'Doce de leite', desc: '' },
          { name: 'Romeu e julieta', desc: '' },
          { name: 'Doce de leite com coco', desc: '' },
          { name: 'Cartola (queijo, banana, açúcar e canela)', desc: '' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Coca normal e zero', desc: '' },
          { name: 'Guaraná Antárctica normal e zero', desc: '' },
          { name: 'Água mineral com e sem gás', desc: '' },
          { name: 'Sucos Cortesia', desc: 'Uva e laranja de caixinha' },
        ],
      },
      {
        title: 'Finalização',
        items: [
          { name: 'Café', desc: 'Finalizando com o café' },
        ],
      },
      {
        title: 'Materiais',
        items: [
          { name: 'Copos long. drink para refrigerante', desc: '' },
          { name: 'Pratos', desc: '' },
          { name: 'Copos', desc: '' },
          { name: 'Talheres', desc: '' },
          { name: 'Guardanapos', desc: '' },
        ],
      },
      {
        title: 'Observações e Condições',
        items: [
          { name: 'Crianças e Datas Festivas', desc: 'Até 6 anos não cobramos. A partir de 7 anos cobramos normal. Valores mudam por pessoa em datas especiais (24 e 25 de Dez, 31 de Dez, 01 de Jan).' },
          { name: 'Serviço Extra', desc: 'Garçom opcional R$ 210,00.' },
          { name: 'Pagamento', desc: '50% no ato e o restante no dia do evento ou a combinar.' },
          { name: 'Estrutura Necessária no Local', desc: 'Precisamos de um fogão para a massa, pia para a copeira e espaço no freezer/geladeira para os sorvetes.' },
        ],
      },
    ],
  },
  feijoada: {
    icon:  'bi-fire',
    color: '#8B1E3F',
    price: 'R$ 120,00 / pessoa',
    info:  ['4 horas de evento', 'Mínimo 30 pessoas', 'Crianças até 5 anos não pagam'],
    sections: [
      {
        title: 'Entrada',
        items: [
          { name: 'Doritos', desc: '' },
          { name: 'Ruffles', desc: '' },
          { name: 'Amendoim torcida', desc: '' },
        ],
      },
      {
        title: 'Buffet',
        items: [
          { name: 'Arroz Branco', desc: '' },
          { name: 'Feijão Preto', desc: '' },
          { name: 'Mandioca frita', desc: '' },
          { name: 'Couve refogada', desc: '' },
        ],
      },
      {
        title: 'Guarnições',
        items: [
          { name: 'Carne seca, paio, costelinha', desc: '' },
          { name: 'Vinagrete', desc: '' },
          { name: 'Banana à milanesa', desc: '' },
          { name: 'Toucinho', desc: '' },
          { name: 'Laranjas', desc: '' },
          { name: 'Molho de Pimenta', desc: '' },
          { name: 'Farofa', desc: '' },
          { name: 'Linguiça toscana fritas e fatiadas', desc: '' },
        ],
      },
      {
        title: 'Saladas',
        items: [
          { name: 'Alface-crespa', desc: 'Decoradas com: cenoura e manga' },
          { name: 'Alface americano', desc: 'Com tomate cereja e palmito' },
        ],
      },
      {
        title: 'Molho para Salada',
        items: [
          { name: 'Mostarda', desc: '' },
          { name: 'Italiano', desc: 'Acompanhados com azeite, vinagre e sal' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Água Mineral', desc: 'Com e sem gás' },
          { name: 'Coca Cola', desc: 'Normal e Zero' },
          { name: 'Guaraná Antárctica', desc: 'Normal e Zero' },
          { name: 'Sucos', desc: 'Laranja e uva de caixinha' },
        ],
      },
      {
        title: 'Colaboradores',
        items: [
          { name: 'Cozinheiro(a)', desc: '' },
          { name: 'Copeiro(a)', desc: '' },
          { name: 'Coordenador', desc: '' },
          { name: 'Garçom Extra', desc: 'Opcional R$ 210,00' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Abacaxi flambado', desc: '' },
          { name: 'Banana Flambada', desc: '' },
        ],
      },
      {
        title: 'Acompanhamento para sobremesa',
        items: [
          { name: 'Calda quente de Chocolate', desc: '' },
          { name: 'Sorvete de Creme', desc: '' },
        ],
      },
      {
        title: 'Condições Contratuais',
        items: [
          { name: 'Convidados', desc: 'O valor cobrado será pelo número contratado. O excedente será cobrado pelo mesmo valor.' },
          { name: 'Alterações', desc: 'Alterações no número de convidados até 7 dias antes do evento, mediante disponibilidade.' },
          { name: 'Estrutura Necessária', desc: 'Espaço no freezer para sorvetes, pia para louças e espaço para 2 isopores de 160L.' },
          { name: 'Crianças', desc: 'Até 5 anos não pagam. De 6 a 10 anos pagam metade do valor.' },
          { name: 'Equipe', desc: 'Chegada com antecedência de 1 a 3 horas.' },
          { name: 'Pausa', desc: 'Na troca da sobremesa haverá uma pausa de pelo menos 15 minutos.' },
          { name: 'Duração', desc: '4 horas de evento + 30 min de tolerância. Hora extra: acréscimo de 25%.' },
          { name: 'Extras', desc: 'Aluguel de toalhas para mesas: R$ 10,00 o jogo.' },
          { name: 'Consumo', desc: 'Tudo o que levamos pode ser consumido à vontade.' },
          { name: 'Responsável', desc: 'Deverá estar presente uma pessoa responsável para conferência dos materiais.' },
        ],
      },
    ],
  },
  risotos: {
    icon:  'bi-award',
    color: '#D9B97E',
    price: 'R$ 100,00 / pessoa',
    info:  ['Preparo ao vivo', 'Mínimo 30 pessoas', 'Material e equipe inclusos', 'Crianças até 6 anos não pagam'],
    sections: [
      {
        title: 'Sobre o Risoto',
        items: [
          { name: 'Preparo ao vivo', desc: 'Ingredientes postos separadamente para escolha dos convidados.' },
          { name: 'Base', desc: 'Arroz arbóreo, vinho branco seco, cebola, manteiga e caldo especial.' },
          { name: 'Material Fornecido', desc: 'Montagem completa: pratos, talheres, copos e guardanapos.' },
        ],
      },
      {
        title: 'Entrada',
        items: [
          { name: 'Doritos', desc: '' },
          { name: 'Ruffles', desc: '' },
          { name: 'Amendoim torcida', desc: '' },
        ],
      },
      {
        title: 'Opções de Risoto (Escolha 4)',
        items: [
          { name: 'Camarão', desc: '' },
          { name: 'Carne seca com ou sem abóbora', desc: '' },
          { name: 'Carne seca com catupiry', desc: '' },
          { name: 'Frango com rúcula', desc: '' },
          { name: 'Palmito', desc: '' },
          { name: '4 queijos', desc: '' },
          { name: 'Rúcula com tomate seco', desc: '' },
          { name: 'Frango com bacon e ervilha', desc: '' },
        ],
      },
      {
        title: 'Saladas',
        items: [
          { name: 'Alface americana', desc: 'Com cenoura e tomate' },
          { name: 'Alface crespa', desc: 'Com cenoura e manga' },
        ],
      },
      {
        title: 'Molho para Salada',
        items: [
          { name: 'Opções', desc: 'Italiano e mostarda' },
        ],
      },
      {
        title: 'Sobremesa',
        items: [
          { name: 'Frutas flambadas', desc: 'Banana e abacaxi' },
          { name: 'Sorvete de creme', desc: 'Com calda quente de chocolate' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Refrigerantes', desc: 'Coca cola e guaraná normal e zero' },
          { name: 'Água', desc: 'Com e sem gás' },
          { name: 'Cortesia', desc: 'Suco de uva e laranja de caixinha' },
        ],
      },
      {
        title: 'Condições Contratuais',
        items: [
          { name: 'Mínimo de Pessoas', desc: '30 em São Paulo. 40 no ABC e Guarulhos.' },
          { name: 'Valores para Crianças', desc: 'Até 6 anos não cobramos. A partir de 7 anos cobramos normal.' },
          { name: 'Pagamento', desc: '50% de transferência bancária no ato e o restante no dia do evento.' },
          { name: 'Tempo de Serviço', desc: '2h para montagem. 4h de serviço (almoço ou janta). O tempo começa no horário marcado com convidados.' },
          { name: 'Colaboradores Inclusos', desc: 'Cozinheiro(a), ajudante de cozinha e coordenadora.' },
          { name: 'Serviços Extras', desc: 'Garçom extra opcional: R$ 210,00. Hora adicional: R$ 50,00.' },
          { name: 'Aluguel de Toalhas', desc: 'R$ 10,00 o jogo (toalha de baixo 1,20m e de cima 70cm).' },
        ],
      },
    ],
  },
  churrasco: {
    icon:  'bi-thermometer-high',
    color: '#A8844A',
    price: 'R$ 120,00 / pessoa',
    info:  ['Churrasco Ouro', 'Mínimo 30 pessoas', 'Crianças até 6 anos não pagam', 'Consultar frete na região'],
    sections: [
      {
        title: 'Entrada',
        items: [
          { name: 'Amendoim', desc: '' },
          { name: 'Doritos', desc: '' },
          { name: 'Torcida', desc: '' },
          { name: 'Ruffles', desc: '' },
        ],
      },
      {
        title: 'Churrasco - Cardápio Ouro',
        items: [
          { name: 'Picanha', desc: '' },
          { name: 'Contra filé', desc: '' },
          { name: 'Asinha de frango', desc: '' },
          { name: 'Linguiça toscana', desc: '' },
          { name: 'Espetinho coração', desc: '' },
          { name: 'Pão de alho', desc: '' },
          { name: 'Queijo coalho', desc: '' },
        ],
      },
      {
        title: 'Guarnições e complementos',
        items: [
          { name: 'Salada Verde', desc: 'Mix de folhas verdes sortidas, cenoura ralada, milho, batata palha, temperos tradicionais' },
          { name: 'Batatinha em conserva', desc: '' },
          { name: 'Salada de berinjela', desc: '' },
          { name: 'Farinha de mandioca', desc: '' },
          { name: 'Pães', desc: '' },
          { name: 'Vinagrete', desc: '' },
          { name: 'Maionese de legumes', desc: 'Cenoura, batata, maionese, milho' },
          { name: 'Arroz branco', desc: '' },
          { name: 'Farofa especial', desc: '' },
        ],
      },
      {
        title: 'Estrutura do Buffet',
        items: [
          { name: 'Mesa Buffet', desc: 'Com toalha, travessas, rechaud, pegadores e utensílios' },
          { name: 'Louças Inclusas', desc: 'Pratos de porcelana, talheres de inox, guardanapos de papel e copos de vidro' },
        ],
      },
      {
        title: 'Sobremesa',
        items: [
          { name: 'Frutas fatiadas', desc: '' },
          { name: 'Frutas flambadas', desc: 'Abacaxi e banana' },
          { name: 'Sorvete de creme', desc: '' },
          { name: 'Calda de chocolate', desc: '' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Refrigerantes', desc: 'Coca cola e guaraná normal e zero' },
          { name: 'Suco', desc: 'De uva e laranja' },
          { name: 'Água', desc: 'Normal e com gás' },
        ],
      },
      {
        title: 'Material e Estrutura',
        items: [
          { name: 'Copos de vidro', desc: '' },
          { name: 'Guardanapos', desc: '' },
          { name: 'Louças', desc: 'Pratos de porcelana e talheres de inox' },
          { name: 'Gelo e Bebidas', desc: 'Isopor para gelar as bebidas' },
          { name: 'Churrasqueira', desc: 'Carvão e churrasqueira inclusos' },
        ],
      },
      {
        title: 'Funcionários e Condições',
        items: [
          { name: 'Equipe Inclusa', desc: '01 churrasqueiro, 01 auxiliar, 01 copeira' },
          { name: 'Garçom', desc: 'A parte R$ 210,00' },
          { name: 'Pagamento', desc: 'Forma de pagamento a combinar' },
        ],
      },
    ],
  },
  massas: {
    icon:  'bi-stars',
    color: '#C8A46B',
    price: 'R$ 100,00 / pessoa',
    info:  ['Mínimo 30 pessoas', 'Material incluso', 'Crianças até 6 anos não pagam', 'Tempo de serviço: 4 horas'],
    sections: [
      {
        title: 'Entradas',
        items: [
          { name: 'Doritos', desc: '' },
          { name: 'Amendoim', desc: '' },
          { name: 'Torcida', desc: '' },
          { name: 'Ruffles', desc: '' },
        ],
      },
      {
        title: 'Massas (Escolha 3)',
        items: [
          { name: 'Opção', desc: 'Escolha 2 massas secas e 1 massa recheada' },
        ],
      },
      {
        title: 'Massa Seca',
        items: [
          { name: 'Penne', desc: '' },
          { name: 'Tagliarine', desc: '' },
          { name: 'Espaguete', desc: '' },
          { name: 'Farfalle', desc: '' },
        ],
      },
      {
        title: 'Massa Recheada',
        items: [
          { name: 'Conchiglione 4 queijos', desc: '' },
          { name: 'Capelete de carne', desc: '' },
          { name: 'Capelete de frango', desc: '' },
          { name: 'Ravióli de queijo ou carne', desc: '' },
        ],
      },
      {
        title: 'Acompanhamentos',
        items: [
          { name: 'Opções', desc: 'Azeitonas, bacon, champignon, alho frito, tomate e cebola.' },
        ],
      },
      {
        title: 'Molhos Quentes (Escolha 3)',
        items: [
          { name: 'Bolonhesa', desc: '' },
          { name: 'Queijo', desc: '' },
          { name: 'Primavera', desc: 'Molho vermelho com mussarela de búfala e azeitonas pretas' },
          { name: 'Bella Dona', desc: 'Molho de tomate com azeitonas pretas e alcaparras' },
          { name: 'Ao Sugo', desc: 'Molho de tomate clássico' },
          { name: 'Romanesca', desc: 'Molho branco, presunto e champignon' },
          { name: 'Calabresa', desc: 'Molho de tomate com calabresa triturada' },
          { name: 'Carne', desc: 'Lagarto ao molho madeira' },
        ],
      },
      {
        title: 'Saladas',
        items: [
          { name: 'Alface crespa', desc: 'Com cenoura, palmito e milho' },
          { name: 'Alface americana', desc: 'Com queijo e tomate' },
        ],
      },
      {
        title: 'Molho para Saladas',
        items: [
          { name: 'Opções', desc: 'Italiano e mostarda' },
        ],
      },
      {
        title: 'Sobremesas',
        items: [
          { name: 'Frutas Flambadas', desc: 'Abacaxi e banana flambados' },
          { name: 'Sorvete', desc: 'As sobremesas acompanham sorvete de creme com calda de chocolate quente' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Primeira Linha', desc: 'Coca cola e guaraná (normal e diet)' },
          { name: 'Água', desc: 'Com e sem gás' },
          { name: 'Cortesia', desc: 'Sucos' },
        ],
      },
      {
        title: 'Condições Contratuais',
        items: [
          { name: 'Mínimo de Pessoas', desc: '30 em São Paulo. 40 no ABC. 50 no interior e litoral.' },
          { name: 'Valores para Crianças', desc: 'Até 6 anos não cobramos. A partir de 7 anos cobramos normal.' },
          { name: 'Material Fornecido', desc: 'Pratos, copos, talheres, bandejas, mesa pranchão para buffet, frigideiras, fogão, saladeiras e material de limpeza.' },
          { name: 'Equipe Inclusa', desc: 'Cozinheiro, ajudante de cozinha e coordenador (uniformizados).' },
          { name: 'Serviços Extras', desc: 'Garçom: R$ 210,00. Hora extra: R$ 50,00 por funcionário.' },
          { name: 'Tempo de Serviço', desc: '2h para montagem. 4h de serviço após o horário marcado com os convidados.' },
        ],
      },
    ],
  },
}

type MenuKey = keyof typeof menuData

const tabs: { key: MenuKey; label: string; icon: string }[] = [
  { key: 'crepes',    label: 'Crepes',    icon: 'bi-egg-fried' },
  { key: 'feijoada',  label: 'Feijoada',  icon: 'bi-fire' },
  { key: 'risotos',   label: 'Risotos',   icon: 'bi-award' },
  { key: 'churrasco', label: 'Churrasco', icon: 'bi-thermometer-high' },
  { key: 'massas',    label: 'Massas',    icon: 'bi-stars' },
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
                  <div className="text-xs text-white/45 mt-0.5 leading-relaxed whitespace-pre-line">{item.desc}</div>
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
