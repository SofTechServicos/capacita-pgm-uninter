'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'softechservicosetecnologia@gmail.com'
      if (session?.user?.email === adminEmail) {
        router.push('/admin')
      }
    }
    checkSession()
  }, [router])

  const handleSignIn = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl: '/admin' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesso Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login para acessar o painel administrativo
          </p>
        </div>
        <div>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md disabled:opacity-50"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            {loading ? 'Entrando...' : 'Entrar com Google'}
          </button>
        </div>
      </div>
    </div>
  )
}