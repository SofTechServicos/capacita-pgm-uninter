'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

interface FormData {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.nome,
          from_email: formData.email,
          phone: formData.telefone,
          subject: formData.assunto,
          message: formData.mensagem,
          to_name: 'SofTech',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      })
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-slate-300 mb-2">
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-slate-300 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-slate-300 mb-2">
          Assunto *
        </label>
        <select
          id="assunto"
          name="assunto"
          value={formData.assunto}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
        >
          <option value="">Selecione um assunto</option>
          <option value="suporte-tecnico">Suporte Técnico</option>
          <option value="criacao-site">Criação de Site</option>
          <option value="servicos-graficos">Serviços Gráficos</option>
          <option value="consultoria">Consultoria</option>
          <option value="orcamento">Orçamento</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-slate-300 mb-2">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
          placeholder="Descreva sua necessidade ou dúvida..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-softech-blue text-white font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}