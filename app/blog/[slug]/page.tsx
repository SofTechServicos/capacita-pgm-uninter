import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '../../../lib/blog'
import AuthorSection from '../../../components/AuthorSection'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            ← Voltar ao Blog
          </Link>
          
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <time>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600">
              {post.excerpt}
            </p>
          </div>

          {post.image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <article 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Seção do Autor */}
        <div className="mt-12">
          <AuthorSection author={post.author} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center btn-safe-primary px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Ver todos os artigos
          </Link>
        </div>
      </div>
    </div>
  )
}