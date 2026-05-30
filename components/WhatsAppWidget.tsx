'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppWidget() {
  const whatsappNumber = "5591980202752"
  const message = "Olá! Gostaria de saber mais sobre os serviços da SofTech."

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        title="Fale conosco no WhatsApp"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  )
}