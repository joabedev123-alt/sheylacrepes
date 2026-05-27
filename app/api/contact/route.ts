import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { ciphers: 'SSLv3' },
    })

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Poppins', Arial, sans-serif; background:#0a0a1a; color:#f0f0ff; margin:0; padding:0; }
        .container { max-width:680px; margin:0 auto; padding:40px 20px; }
        .header { background:linear-gradient(135deg,#8B5CF6,#EC4899); border-radius:12px 12px 0 0; padding:32px; text-align:center; }
        .header h1 { font-size:26px; font-weight:800; color:#fff; margin:0; letter-spacing:0.05em; }
        .header p  { color:rgba(255,255,255,0.8); margin:6px 0 0; font-size:13px; }
        .body { background:#15152E; border-radius:0 0 12px 12px; padding:32px; }
        .section-title { font-size:13px; font-weight:700; color:#A78BFA; text-transform:uppercase; letter-spacing:0.12em; margin:24px 0 12px; padding-bottom:6px; border-bottom:1px solid rgba(139,92,246,0.3); }
        .field { margin-bottom:10px; display:flex; gap:8px; }
        .field label { font-size:12px; color:#9CA3AF; min-width:200px; flex-shrink:0; }
        .field span  { font-size:13px; color:#F0F0FF; font-weight:500; }
        .footer { text-align:center; margin-top:24px; font-size:11px; color:#6B7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🥞 Sheylacrepes</h1>
          <p>Novo pedido de orçamento recebido</p>
        </div>
        <div class="body">
          <div class="section-title">Dados Pessoais</div>
          <div class="field"><label>Nome:</label><span>${data.nome}</span></div>
          <div class="field"><label>CPF:</label><span>${data.cpf}</span></div>
          <div class="field"><label>Data de Nascimento:</label><span>${data.dataNascimento}</span></div>
          <div class="field"><label>Endereço:</label><span>${data.endereco}</span></div>
          <div class="field"><label>CEP:</label><span>${data.cep}</span></div>
          <div class="field"><label>Bairro:</label><span>${data.bairro}</span></div>
          <div class="field"><label>Telefone:</label><span>${data.telefone}</span></div>
          <div class="field"><label>E-mail/Instagram:</label><span>${data.emailInstagram}</span></div>

          <div class="section-title">Dados do Evento</div>
          <div class="field"><label>Data do Evento:</label><span>${data.dataEvento}</span></div>
          <div class="field"><label>Horário:</label><span>${data.horario}</span></div>
          <div class="field"><label>Número de Pessoas:</label><span>${data.numeroPessoas}</span></div>
          <div class="field"><label>Endereço do Evento:</label><span>${data.enderecoEvento}</span></div>
          <div class="field"><label>CEP do Evento:</label><span>${data.cepEvento}</span></div>
          <div class="field"><label>Bairro do Evento:</label><span>${data.bairroEvento}</span></div>
          <div class="field"><label>Casa ou Apartamento:</label><span>${data.tipoLocal}</span></div>

          <div class="section-title">Serviços Adicionais</div>
          <div class="field"><label>Garçom Opcional:</label><span>${data.garcom}</span></div>
          <div class="field"><label>Quantidade de Garçons:</label><span>${data.quantidadeGarcons || '—'}</span></div>
          <div class="field"><label>Crepeiro Extra:</label><span>${data.crepeiroExtra}</span></div>

          <div class="section-title">Infraestrutura</div>
          <div class="field"><label>Pode Utilizar Gás:</label><span>${data.gas}</span></div>
          <div class="field"><label>Elétrica:</label><span>${data.eletrica}</span></div>
          <div class="field"><label>Toalhas de Mesa:</label><span>${data.toalhas}</span></div>
          <div class="field"><label>Quantidade de Toalhas:</label><span>${data.quantidadeToalhas || '—'}</span></div>
          <div class="field"><label>Cor das Toalhas:</label><span>${data.corToalhas || '—'}</span></div>
          <div class="field"><label>Copa ou Cozinha:</label><span>${data.copaOuCozinha}</span></div>
          <div class="field"><label>Fogão Convencional:</label><span>${data.fogaoConvencional}</span></div>
          <div class="field"><label>Fogão Elétrico:</label><span>${data.fogaoEletrico}</span></div>
          <div class="field"><label>Fogão Indução:</label><span>${data.fogaoInducao}</span></div>
          <div class="field"><label>Microondas:</label><span>${data.microondas}</span></div>
          <div class="field"><label>Geladeira:</label><span>${data.geladeira}</span></div>
          <div class="field"><label>Freezer:</label><span>${data.freezer}</span></div>

          ${data.observacoes ? `
          <div class="section-title">Observações</div>
          <div class="field"><span>${data.observacoes}</span></div>
          ` : ''}
        </div>
        <div class="footer">
          Enviado via site Sheylacrepes — Buffet Gourmet Premium
        </div>
      </div>
    </body>
    </html>
    `

    await transporter.sendMail({
      from:    `"Site Sheylacrepes" <${process.env.SMTP_USER}>`,
      to:      process.env.EMAIL_TO || 'Sheylacrepes@outlook.com',
      cc:      process.env.EMAIL_CC  || 'Sheyla.silva@live.com',
      subject: `🥞 Novo Orçamento — ${data.nome} | ${data.dataEvento}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    return NextResponse.json({ success: false, error: 'Falha ao enviar.' }, { status: 500 })
  }
}
