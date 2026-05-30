import Link from 'next/link'
import Image from 'next/image'
import logoBranca from '../public/logo.png'
import { FaInstagram, FaTiktok, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Slogan */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src={logoBranca}
                alt="Logo SofTech"
                width={168}
                height={56}
                className="h-14 w-auto mr-3"
              />
            </div>
            <p className="text-slate-600 mb-6 max-w-md">
              Otimizando Processos. Simplificando a Tecnologia.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/softechservicos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@softechservicos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-black transition-colors"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href="https://www.youtube.com/@softechservicos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-500 transition-colors"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/modelos-digitais" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Modelos Digitais
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/+5591980202752"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-600 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
(91) 98020-2752
              </a>
              <a
                href="mailto:softechservicosetecnologia@gmail.com"
                className="flex items-center text-slate-600 hover:text-blue-500 transition-colors"
              >
                <FaEnvelope className="mr-2" />
                softechservicosetecnologia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-500">
            © {new Date().getFullYear()} SOFTECH | Serviços & Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}