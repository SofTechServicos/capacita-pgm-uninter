'use client'

import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  service?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
  children?: React.ReactNode
}

export default function WhatsAppButton({ 
  service = 'Informações Gerais', 
  className = '',
  size = 'md',
  text = 'Falar no WhatsApp',
  children
}: WhatsAppButtonProps) {
  const phoneNumber = '5591980202752' // +55 91 98020-2752
  
  const message = `Olá! Gostaria de saber mais sobre: *${service}*

Vim através do site da SofTech e tenho interesse em conhecer melhor os serviços oferecidos.

Aguardo retorno! 😊`

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 
        bg-green-500 hover:bg-green-600 
        text-white font-bold rounded-lg 
        transition-colors duration-200
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {!children && <FaWhatsapp className="text-xl" />}
      {children || text}
    </a>
  )
}