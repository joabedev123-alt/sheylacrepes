'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FormData {
  /* Dados Pessoais */
  nome: string
  cpf: string
  dataNascimento: string
  endereco: string
  cep: string
  bairro: string
  telefone: string
  emailInstagram: string
  /* Dados do Evento */
  dataEvento: string
  horario: string
  numeroPessoas: string
  enderecoEvento: string
  cepEvento: string
  bairroEvento: string
  tipoLocal: string
  /* Serviços Adicionais */
  garcom: string
  quantidadeGarcons: string
  crepeiroExtra: string
  /* Infraestrutura */
  gas: string
  eletrica: string
  toalhas: string
  quantidadeToalhas: string
  corToalhas: string
  copaOuCozinha: string
  fogaoConvencional: string
  fogaoEletrico: string
  fogaoInducao: string
  microondas: string
  geladeira: string
  freezer: string
  observacoes: string
}

const initial: FormData = {
  nome: '', cpf: '', dataNascimento: '', endereco: '', cep: '', bairro: '',
  telefone: '', emailInstagram: '', dataEvento: '', horario: '', numeroPessoas: '',
  enderecoEvento: '', cepEvento: '', bairroEvento: '', tipoLocal: 'casa',
  garcom: 'nao', quantidadeGarcons: '', crepeiroExtra: 'nao',
  gas: 'sim', eletrica: '220v', toalhas: 'nao', quantidadeToalhas: '', corToalhas: '',
  copaOuCozinha: 'sim', fogaoConvencional: 'nao', fogaoEletrico: 'nao',
  fogaoInducao: 'nao', microondas: 'nao', geladeira: 'sim', freezer: 'nao',
  observacoes: '',
}

type Status = 'idle' | 'loading' | 'success' | 'error'

/* ── Small helpers ─────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-purple-300/70 uppercase tracking-widest mb-1.5">
      {children}
    </label>
  )
}

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 pt-2">
      <div className="w-8 h-8 rounded-lg bg-brand-gold/20 border border-brand-purple/30 flex items-center justify-center flex-shrink-0">
        <i className={`${icon} text-sm text-brand-gold-light`} />
      </div>
      <h3
        className="text-base font-bold text-[var(--color-text)]/80 uppercase tracking-widest"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem' }}
      >
        {children}
      </h3>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(200,164,107,0.4), transparent)' }} />
    </div>
  )
}

function RadioGroup({
  name, value, options, onChange,
}: {
  name: string
  value: string
  options: { value: string; label: string }[]
  onChange: (val: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200"
          style={{
            background: value === opt.value ? 'rgba(200,164,107,0.2)' : 'rgba(21,21,46,0.5)',
            border:     `1px solid ${value === opt.value ? 'rgba(200,164,107,0.6)' : 'rgba(200,164,107,0.2)'}`,
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <div
            className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all"
            style={{ borderColor: value === opt.value ? '#C8A46B' : 'rgba(200,164,107,0.35)' }}
          >
            {value === opt.value && (
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            )}
          </div>
          <span
            className="text-xs font-medium transition-colors"
            style={{ color: value === opt.value ? '#C4B5FD' : '#6B7280' }}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  )
}

function CheckboxField({
  name, checked, label, onChange,
}: {
  name: string; checked: boolean; label: string; onChange: (v: boolean) => void
}) {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer group"
    >
      <div
        className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
        style={{
          background: checked ? 'rgba(200,164,107,0.3)' : 'rgba(14,14,36,0.8)',
          border:     `1.5px solid ${checked ? '#C8A46B' : 'rgba(200,164,107,0.3)'}`,
        }}
      >
        {checked && <i className="bi bi-check text-xs text-brand-gold-light font-bold" />}
      </div>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm text-[var(--color-text)]/60 group-hover:text-[var(--color-text)]/80 transition-colors">
        {label}
      </span>
    </label>
  )
}

/* ── Main Component ───────────────────────────────── */
export default function QuoteForm() {
  const [form, setForm]     = useState<FormData>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true })

  const set = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleCepChange = async (value: string, isEvento: boolean) => {
    const cleanCep = value.replace(/\D/g, '')
    
    let maskedCep = cleanCep
    if (cleanCep.length > 5) {
      maskedCep = `${cleanCep.substring(0, 5)}-${cleanCep.substring(5, 8)}`
    }
    
    const fieldName = isEvento ? 'cepEvento' : 'cep'
    set(fieldName, maskedCep)
    
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await res.json()
        
        if (!data.erro) {
          if (isEvento) {
            setForm((prev) => ({
              ...prev,
              enderecoEvento: data.logradouro || '',
              bairroEvento: data.bairro || '',
              cepEvento: maskedCep,
            }))
            if (errors.enderecoEvento) {
              setErrors((prev) => ({ ...prev, enderecoEvento: undefined }))
            }
          } else {
            setForm((prev) => ({
              ...prev,
              endereco: data.logradouro || '',
              bairro: data.bairro || '',
              cep: maskedCep,
            }))
          }
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err)
      }
    }
  }

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!form.nome.trim())           e.nome           = 'Nome obrigatório'
    if (!form.telefone.trim())       e.telefone       = 'Telefone obrigatório'
    if (!form.emailInstagram.trim()) e.emailInstagram = 'E-mail ou Instagram obrigatório'
    if (!form.dataEvento)            e.dataEvento     = 'Data do evento obrigatória'
    if (!form.numeroPessoas.trim())  e.numeroPessoas  = 'Número de pessoas obrigatório'
    if (!form.enderecoEvento.trim()) e.enderecoEvento = 'Endereço do evento obrigatório'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const formatWhatsappMessage = (data: FormData): string => {
    const formatSimNao = (val: string) => val === 'sim' ? 'Sim' : 'Não';
    
    // Equipamentos disponíveis
    const equipamentosList: string[] = [];
    if (data.fogaoConvencional === 'sim') equipamentosList.push('Fogão Convencional');
    if (data.fogaoEletrico === 'sim') equipamentosList.push('Fogão Elétrico');
    if (data.fogaoInducao === 'sim') equipamentosList.push('Fogão Indução');
    if (data.microondas === 'sim') equipamentosList.push('Microondas');
    if (data.geladeira === 'sim') equipamentosList.push('Geladeira');
    if (data.freezer === 'sim') equipamentosList.push('Freezer');
    
    const equipamentosStr = equipamentosList.length > 0 ? equipamentosList.join(', ') : 'Nenhum';

    return `🥞 *NOVA SOLICITAÇÃO DE ORÇAMENTO* 🥞

👤 *DADOS PESSOAIS*
• *Nome:* ${data.nome}
• *WhatsApp:* ${data.telefone}
• *E-mail / Instagram:* ${data.emailInstagram}
• *CPF:* ${data.cpf || 'Não informado'}
• *Data de Nascimento:* ${data.dataNascimento || 'Não informada'}
• *Endereço:* ${data.endereco || 'Não informado'}
• *Bairro:* ${data.bairro || 'Não informado'}
• *CEP:* ${data.cep || 'Não informado'}

📅 *DADOS DO EVENTO*
• *Data do Evento:* ${data.dataEvento}
• *Horário:* ${data.horario || 'Não informado'}
• *Número de Pessoas:* ${data.numeroPessoas}
• *Tipo de Local:* ${data.tipoLocal.toUpperCase()}
• *Endereço do Evento:* ${data.enderecoEvento}
• *Bairro do Evento:* ${data.bairroEvento || 'Não informado'}
• *CEP do Evento:* ${data.cepEvento || 'Não informado'}

💼 *SERVIÇOS ADICIONAIS*
• *Garçom:* ${formatSimNao(data.garcom)}${data.garcom === 'sim' && data.quantidadeGarcons ? ` (${data.quantidadeGarcons} garçons)` : ''}
• *Crepeiro Extra:* ${formatSimNao(data.crepeiroExtra)}

⚙️ *INFRAESTRUTURA DO LOCAL*
• *Pode usar gás?* ${formatSimNao(data.gas)}
• *Elétrica:* ${data.eletrica}
• *Toalhas de Mesa:* ${formatSimNao(data.toalhas)}${data.toalhas === 'sim' ? ` (${data.quantidadeToalhas} toalhas, cor ${data.corToalhas})` : ''}
• *Copa/Cozinha disponível?* ${formatSimNao(data.copaOuCozinha)}
• *Equipamentos no local:* ${equipamentosStr}

✍ *OBSERVAÇÕES*
${data.observacoes || 'Nenhuma observação.'}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const message = formatWhatsappMessage(form)
      const encodedText = encodeURIComponent(message)
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5511913672688&text=${encodedText}`
      
      // Abrir o WhatsApp em nova aba
      window.open(whatsappUrl, '_blank')
      
      setStatus('success')
      setForm(initial)
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <section
      id="orcamento"
      className="section-padding"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(200,164,107,0.1) 0%, transparent 60%), var(--color-bg)',
      }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold-light mb-4 block">
            Solicite agora
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Solicitar <span className="text-gradient">Orçamento</span>
          </h2>
          <p className="text-base text-[var(--color-text)]/50 max-w-md mx-auto font-light">
            Preencha o formulário e receba uma proposta personalizada em até 24 horas.
          </p>
          <div className="divider-gradient w-24 mx-auto mt-8" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="rounded-3xl p-6 sm:p-10"
          style={{
            background:   'rgba(14,14,36,0.7)',
            backdropFilter: 'blur(20px)',
            border:       '1px solid rgba(200,164,107,0.2)',
            boxShadow:    '0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <form onSubmit={handleSubmit} noValidate>

            {/* ── 1. Dados Pessoais ───────────────────── */}
            <SectionTitle icon="bi-person-fill">Dados Pessoais</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

              <div className="sm:col-span-2">
                <FieldLabel>Nome Completo *</FieldLabel>
                <input
                  className={`input-premium ${errors.nome ? 'border-red-500/60' : ''}`}
                  placeholder="Seu nome completo"
                  value={form.nome}
                  onChange={(e) => set('nome', e.target.value)}
                  required
                />
                {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
              </div>

              <div>
                <FieldLabel>CPF</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={(e) => set('cpf', e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Data de Nascimento</FieldLabel>
                <input
                  type="date"
                  className="input-premium"
                  value={form.dataNascimento}
                  onChange={(e) => set('dataNascimento', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel>Endereço Completo</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="Rua, número, complemento"
                  value={form.endereco}
                  onChange={(e) => set('endereco', e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>CEP</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={(e) => handleCepChange(e.target.value, false)}
                />
              </div>

              <div>
                <FieldLabel>Bairro</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="Seu bairro"
                  value={form.bairro}
                  onChange={(e) => set('bairro', e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Telefone / WhatsApp *</FieldLabel>
                <input
                  className={`input-premium ${errors.telefone ? 'border-red-500/60' : ''}`}
                  placeholder="(11) 9 0000-0000"
                  value={form.telefone}
                  onChange={(e) => set('telefone', e.target.value)}
                  required
                />
                {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone}</p>}
              </div>

              <div>
                <FieldLabel>E-mail ou Instagram *</FieldLabel>
                <input
                  className={`input-premium ${errors.emailInstagram ? 'border-red-500/60' : ''}`}
                  placeholder="email@exemplo.com ou @perfil"
                  value={form.emailInstagram}
                  onChange={(e) => set('emailInstagram', e.target.value)}
                  required
                />
                {errors.emailInstagram && <p className="text-red-400 text-xs mt-1">{errors.emailInstagram}</p>}
              </div>
            </div>

            {/* ── 2. Dados do Evento ──────────────────── */}
            <SectionTitle icon="bi-calendar-event-fill">Dados do Evento</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

              <div>
                <FieldLabel>Data do Evento *</FieldLabel>
                <input
                  type="date"
                  className={`input-premium ${errors.dataEvento ? 'border-red-500/60' : ''}`}
                  value={form.dataEvento}
                  onChange={(e) => set('dataEvento', e.target.value)}
                  required
                />
                {errors.dataEvento && <p className="text-red-400 text-xs mt-1">{errors.dataEvento}</p>}
              </div>

              <div>
                <FieldLabel>Horário</FieldLabel>
                <input
                  type="time"
                  className="input-premium"
                  value={form.horario}
                  onChange={(e) => set('horario', e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Número de Pessoas *</FieldLabel>
                <input
                  type="number"
                  min="30"
                  className={`input-premium ${errors.numeroPessoas ? 'border-red-500/60' : ''}`}
                  placeholder="Mínimo 30 pessoas"
                  value={form.numeroPessoas}
                  onChange={(e) => set('numeroPessoas', e.target.value)}
                  required
                />
                {errors.numeroPessoas && <p className="text-red-400 text-xs mt-1">{errors.numeroPessoas}</p>}
              </div>

              <div>
                <FieldLabel>Casa ou Apartamento</FieldLabel>
                <RadioGroup
                  name="tipoLocal"
                  value={form.tipoLocal}
                  options={[
                    { value: 'casa', label: 'Casa' },
                    { value: 'apartamento', label: 'Apartamento' },
                    { value: 'salao', label: 'Salão/Espaço' },
                  ]}
                  onChange={(v) => set('tipoLocal', v)}
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel>Endereço do Evento *</FieldLabel>
                <input
                  className={`input-premium ${errors.enderecoEvento ? 'border-red-500/60' : ''}`}
                  placeholder="Endereço completo onde será o evento"
                  value={form.enderecoEvento}
                  onChange={(e) => set('enderecoEvento', e.target.value)}
                  required
                />
                {errors.enderecoEvento && <p className="text-red-400 text-xs mt-1">{errors.enderecoEvento}</p>}
              </div>

              <div>
                <FieldLabel>CEP do Evento</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="00000-000"
                  value={form.cepEvento}
                  onChange={(e) => handleCepChange(e.target.value, true)}
                />
              </div>

              <div>
                <FieldLabel>Bairro do Evento</FieldLabel>
                <input
                  className="input-premium"
                  placeholder="Bairro do evento"
                  value={form.bairroEvento}
                  onChange={(e) => set('bairroEvento', e.target.value)}
                />
              </div>
            </div>

            {/* ── 3. Serviços Adicionais ──────────────── */}
            <SectionTitle icon="bi-person-workspace">Serviços Adicionais</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

              <div>
                <FieldLabel>Garçom Opcional</FieldLabel>
                <RadioGroup
                  name="garcom"
                  value={form.garcom}
                  options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
                  onChange={(v) => set('garcom', v)}
                />
              </div>

              {form.garcom === 'sim' && (
                <div>
                  <FieldLabel>Quantidade de Garçons</FieldLabel>
                  <input
                    type="number"
                    min="1"
                    className="input-premium"
                    placeholder="Ex: 2"
                    value={form.quantidadeGarcons}
                    onChange={(e) => set('quantidadeGarcons', e.target.value)}
                  />
                </div>
              )}

              <div>
                <FieldLabel>Crepeiro Extra</FieldLabel>
                <RadioGroup
                  name="crepeiroExtra"
                  value={form.crepeiroExtra}
                  options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
                  onChange={(v) => set('crepeiroExtra', v)}
                />
              </div>
            </div>

            {/* ── 4. Infraestrutura ──────────────────── */}
            <SectionTitle icon="bi-house-gear-fill">Infraestrutura do Local</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

              <div>
                <FieldLabel>Pode Utilizar Gás</FieldLabel>
                <RadioGroup
                  name="gas"
                  value={form.gas}
                  options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
                  onChange={(v) => set('gas', v)}
                />
              </div>

              <div>
                <FieldLabel>Elétrica Disponível</FieldLabel>
                <RadioGroup
                  name="eletrica"
                  value={form.eletrica}
                  options={[
                    { value: '110v', label: '110v' },
                    { value: '220v', label: '220v' },
                    { value: 'ambos', label: 'Ambas' },
                    { value: 'nao', label: 'Nenhuma' },
                  ]}
                  onChange={(v) => set('eletrica', v)}
                />
              </div>

              <div>
                <FieldLabel>Toalhas de Mesa</FieldLabel>
                <RadioGroup
                  name="toalhas"
                  value={form.toalhas}
                  options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
                  onChange={(v) => set('toalhas', v)}
                />
              </div>

              {form.toalhas === 'sim' && (
                <>
                  <div>
                    <FieldLabel>Quantidade de Toalhas</FieldLabel>
                    <input
                      type="number"
                      min="1"
                      className="input-premium"
                      placeholder="Quantas toalhas"
                      value={form.quantidadeToalhas}
                      onChange={(e) => set('quantidadeToalhas', e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel>Cor das Toalhas</FieldLabel>
                    <input
                      className="input-premium"
                      placeholder="Ex: Branco, Preto, Vinho"
                      value={form.corToalhas}
                      onChange={(e) => set('corToalhas', e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <FieldLabel>Copa ou Cozinha Disponível</FieldLabel>
                <RadioGroup
                  name="copaOuCozinha"
                  value={form.copaOuCozinha}
                  options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
                  onChange={(v) => set('copaOuCozinha', v)}
                />
              </div>
            </div>

            {/* Equipamentos */}
            <div className="mb-8">
              <FieldLabel>Equipamentos Disponíveis no Local</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {([
                  { field: 'fogaoConvencional', label: 'Fogão Convencional' },
                  { field: 'fogaoEletrico',     label: 'Fogão Elétrico' },
                  { field: 'fogaoInducao',      label: 'Fogão Indução' },
                  { field: 'microondas',        label: 'Microondas' },
                  { field: 'geladeira',         label: 'Geladeira' },
                  { field: 'freezer',           label: 'Freezer' },
                ] as const).map(({ field, label }) => (
                  <CheckboxField
                    key={field}
                    name={field}
                    label={label}
                    checked={form[field] === 'sim'}
                    onChange={(checked) => set(field, checked ? 'sim' : 'nao')}
                  />
                ))}
              </div>
            </div>

            {/* ── 5. Observações ─────────────────────── */}
            <SectionTitle icon="bi-chat-text-fill">Observações</SectionTitle>
            <div className="mb-10">
              <textarea
                className="input-premium resize-none"
                rows={4}
                placeholder="Descreva detalhes especiais do seu evento, restrições alimentares, pedidos especiais, tipo de cardápio desejado..."
                value={form.observacoes}
                onChange={(e) => set('observacoes', e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center gap-4">

              {/* Toast messages */}
              {status === 'success' && (
                <motion.div
                  className="w-full p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(163,230,53,0.12)', border: '1px solid rgba(163,230,53,0.3)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="bi bi-check-circle-fill text-lime-400 text-xl flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lime-300 text-sm">Orçamento enviado com sucesso!</div>
                    <div className="text-xs text-lime-400/70 mt-0.5">
                      Retornaremos em até 24 horas pelo WhatsApp ou e-mail informado.
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="w-full p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="bi bi-exclamation-triangle-fill text-red-400 text-xl flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-red-300 text-sm">Erro ao enviar.</div>
                    <div className="text-xs text-red-400/70 mt-0.5">
                      Tente novamente ou entre em contato pelo WhatsApp:{' '}
                      <a href="https://wa.me/5511913672688" className="underline">(11) 91367-2688</a>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full sm:w-auto text-base px-12 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill" />
                    Enviar Solicitação de Orçamento
                  </>
                )}
              </button>

              <p className="text-xs text-[var(--color-text)]/30 text-center max-w-sm">
                Ao enviar, você concorda em receber nosso contato via WhatsApp e/ou e-mail.
                Não compartilhamos seus dados com terceiros.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
