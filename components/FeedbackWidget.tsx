'use client';

import { useState } from 'react';
import { FiStar, FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

interface FeedbackData {
  rating: number;
  category: string;
  comment: string;
  timestamp: number;
}

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Qualidade dos Cursos',
    'Facilidade de Uso',
    'Kit de Ferramentas',
    'Conteúdo Relevante',
    'Sugestão de Melhoria'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !category || !comment.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const feedback: FeedbackData = {
      rating,
      category,
      comment: comment.trim(),
      timestamp: Date.now()
    };

    // Salvar feedback no localStorage
    const stored = localStorage.getItem('capacita_pgm_feedback') || '[]';
    const feedbacks = JSON.parse(stored);
    feedbacks.push(feedback);
    localStorage.setItem('capacita_pgm_feedback', JSON.stringify(feedbacks));

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
      setCategory('');
      setComment('');
    }, 2000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-softech-blue hover:brightness-110 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <FiMessageCircle className="text-xl" />
          <span className="hidden sm:inline text-sm font-medium">Feedback</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl w-80 max-w-[calc(100vw-2rem)]">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="font-bold text-white flex items-center gap-2">
          <FiMessageCircle className="text-blue-600" />
          Sua Opinião é Importante
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX />
        </button>
      </div>

      <div className="p-4">
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-green-600 text-2xl mb-2">✅</div>
            <p className="text-green-400 font-medium">Obrigado pelo seu feedback!</p>
            <p className="text-sm text-slate-300">Sua opinião nos ajuda a melhorar.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Como você avalia o Capacita PGM?
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <FiStar fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Categoria do Feedback
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-slate-800 border border-slate-600 text-white rounded-md focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Seu Comentário
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte-nos sua experiência ou sugestão..."
                rows={3}
                className="w-full p-2 bg-slate-800 border border-slate-600 text-white rounded-md focus:ring-2 focus:ring-accent-cyan focus:border-transparent resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-softech-blue hover:brightness-110 text-white font-bold py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2"
            >
              <FiSend />
              Enviar Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}