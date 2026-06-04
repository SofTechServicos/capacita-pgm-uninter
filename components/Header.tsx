'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import logoBranca from '../public/logo.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Links fixos para o projeto acadêmico
  const pages = [
    { id: 'home', name: 'Início', path: '/' },
    { id: 'gerador', name: 'Gerador de Currículos', path: '/gerador' },
    { id: 'guias', name: 'Guias Práticos', path: '/#kit-ferramentas' }
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logoBranca}
                alt="Logo SofTech"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {pages.map((page) => (
              <Link 
                key={page.id} 
                href={page.path} 
                className="text-slate-700 hover:text-accent-cyan font-medium transition-colors flex items-center"
              >
                {page.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-accent-cyan focus:outline-none focus:text-accent-cyan"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 shadow-lg rounded-lg mb-4">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={page.path}
                  className="block px-3 py-2 text-slate-700 hover:text-accent-cyan font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}