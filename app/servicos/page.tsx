'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaClock, FaUsers, FaCheckCircle } from 'react-icons/fa'
import WhatsAppButton from '../../components/WhatsAppButton'
import { servicos as allServicos } from '../../data/servicos' // Importa a lista de serviços

interface Servico {
  nome: string
  valor: number | null
  descricao: string
  categoria: string
  imagem: string
  badge?: string
  badgeColor?: string
  beneficios: string[]
  urgencia?: string
  social_proof?: string
}
export default function ServicosPage() {
  // Mapeia os serviços importados para adicionar os badges e outras propriedades específicas da página
  const servicosComBadges: Servico[] = allServicos.map(servico => {
    switch (servico.nome) {
      case "Diagnóstico Técnico Completo":
        return { ...servico, badge: "GRÁTIS SE CONTRATAR", badgeColor: "bg-green-500", beneficios: ["Diagnóstico preciso", "Relatório detalhado", "Valor abatido", "Sem surpresas"], urgencia: "Descubra o problema hoje!", social_proof: "Diagnóstico detalhado" };
      case "Formatação com Backup e Programas Essenciais": // Nome atualizado para corresponder a data/servicos.ts
        return { ...servico, badge: "NOVINHO EM FOLHA", badgeColor: "bg-yellow-500", beneficios: ["PC como novo", "Backup seguro", "Programas inclusos", "3 meses garantia"], social_proof: "Garantia de qualidade" };
      case "Pacote 'Softech Turbo': Otimização e Remoção de Vírus":
        return { ...servico, badge: "TURBO SPEED", badgeColor: "bg-red-500", beneficios: ["PC até 300% mais rápido", "Vírus eliminados", "Limpeza profunda", "Proteção incluída"], urgencia: "Acelere seu PC hoje!", social_proof: "Performance otimizada" };
      case "Suporte Técnico Remoto": // Nome atualizado
        return { ...servico, badge: "INSTANTÂNEO", badgeColor: "bg-blue-500", beneficios: ["Resolução imediata", "Sem sair de casa", "100% seguro", "Suporte em tempo real"], urgencia: "Problema resolvido em minutos!", social_proof: "Suporte especializado" };
      case "Auxílio em Serviços Públicos Online":
        return { ...servico, badge: "MAIS PROCURADO", badgeColor: "bg-red-500", beneficios: ["Economia de tempo", "Sem filas", "Assistência especializada", "100% seguro"], urgencia: "Resolva hoje mesmo!", social_proof: "Solução especializada" };
      case "Elaboração e Atualização de Currículo": // Nome atualizado
        return { ...servico, badge: "DESTAQUE PROFISSIONAL", badgeColor: "bg-blue-500", beneficios: ["Design moderno", "ATS otimizado", "Mais entrevistas", "Entrega em 24h"], social_proof: "Design profissional" };
      case "Formatação de Trabalhos (Normas ABNT)":
        return { ...servico, badge: "ACADÊMICO", badgeColor: "bg-purple-500", beneficios: ["100% ABNT", "Revisão incluída", "Entrega rápida", "Suporte pós-entrega"], social_proof: "Normas ABNT garantidas" };
      case "Criação de Documentos e Contratos Simples":
        return { ...servico, beneficios: ["Linguagem jurídica", "Modelos personalizados", "Revisão incluída", "Válido legalmente"], social_proof: "Linguagem técnica adequada" };
      case "Pacote 'Presença Online Essencial'":
        return { ...servico, badge: "SEU NEGÓCIO NO GOOGLE", badgeColor: "bg-green-500", beneficios: ["Apareça no Google", "Mais clientes", "Avaliações gerenciadas", "Relatório mensal"], urgencia: "Seja encontrado hoje!", social_proof: "Visibilidade garantida" };
      case "Criação de Sites Institucionais":
        return { ...servico, badge: "PROFISSIONAL", badgeColor: "bg-purple-500", beneficios: ["Design exclusivo", "Responsivo", "SEO otimizado", "Hospedagem 1 ano grátis"], social_proof: "Design responsivo" };
      case "Aulas Básicas de Informática":
        return { ...servico, badge: "PERSONALIZADO", badgeColor: "bg-blue-500", beneficios: ["Aula individual", "No seu ritmo", "Material incluído", "Certificado"], social_proof: "Ensino personalizado" };
      case "Pacote de Manutenção Mensal (Empresas)":
        return { ...servico, badge: "EMPRESARIAL", badgeColor: "bg-gold-500", beneficios: ["Suporte 24/7", "Manutenção preventiva", "Relatórios mensais", "Desconto especial"], social_proof: "Suporte contínuo" };
      default:
        return { ...servico, beneficios: [] }; // Garante que a propriedade 'beneficios' sempre exista
    }
  });

  const categorias = Array.from(new Set(servicosComBadges.map(s => s.categoria)));
  return ( // Abertura do JSX
    <div className="min-h-screen bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size relative overflow-hidden">
      
      {/* Efeitos de Luz no Fundo (Glowing Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-softech-blue/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-transparent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
          >
            🚀 Soluções que <span className="text-yellow-300">Simplificam</span> sua Vida Digital
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl mb-10 max-w-3xl mx-auto text-slate-300"
          >
            Oferecemos <strong>tecnologia prática</strong> para pessoas e pequenas empresas. 
            Transformamos <strong>problemas complexos em soluções simples</strong>!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-medium"
          >
            <div className="flex items-center bg-slate-800/50 border border-slate-700 backdrop-blur-md px-5 py-2.5 rounded-full text-accent-cyan shadow-[0_0_15px_theme(colors.accent-cyan/10%)]">
              <FaShieldAlt className="mr-2" /> 100% Seguro
            </div>
            <div className="flex items-center bg-slate-800/50 border border-slate-700 backdrop-blur-md px-5 py-2.5 rounded-full text-purple-400 shadow-[0_0_15px_theme(colors.purple.400/10%)]">
              <FaClock className="mr-2" /> Horário Comercial
            </div>
            <div className="flex items-center bg-slate-800/50 border border-slate-700 backdrop-blur-md px-5 py-2.5 rounded-full text-green-400 shadow-[0_0_15px_theme(colors.green.400/10%)]">
              <FaUsers className="mr-2" /> Atendimento Personalizado
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {categorias.map((categoria) => (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            key={categoria} 
            className="mb-20"
          >
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{categoria}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-softech-blue to-accent-cyan mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicosComBadges
                .filter(servico => servico.categoria === categoria)
                .map((servico, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    key={index} 
                    className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-xl hover:shadow-[0_0_25px_theme(colors.accent-cyan/20%)] transition-all duration-300 overflow-hidden hover:border-accent-cyan/50 flex flex-col h-full"
                  >
                    {/* Badge */}
                    {servico.badge && (
                      <div className={`absolute top-4 left-4 ${servico.badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg`}>
                        {servico.badge}
                      </div>
                    )}
                    
                    {/* Imagem */}
                    <div className="relative h-52 overflow-hidden border-b border-slate-700">
                      <Image
                        src={servico.imagem}
                        alt={servico.nome}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                        {servico.nome}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                        {servico.descricao}
                      </p>

                      {/* Benefícios */}
                      <div className="mb-6 bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                        <div className="grid grid-cols-2 gap-2">
                          {servico.beneficios.slice(0, 4).map((beneficio, idx) => (
                            <div key={idx} className="flex items-center text-xs text-green-400">
                              <FaCheckCircle className="mr-2 text-green-400 flex-shrink-0" />
                              {beneficio}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {/* Social Proof */}
                        {servico.social_proof && (
                            <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                              ⭐ {servico.social_proof}
                            </span>
                        )}

                        {/* Urgência */}
                        {servico.urgencia && (
                            <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                              🔥 {servico.urgencia}
                            </span>
                        )}
                      </div>

                      <div className="mt-auto">
                        <WhatsAppButton 
                          service={`Orçamento: ${servico.nome} - Gostaria de saber mais detalhes e valores`}
                          text="Solicitar Orçamento"
                          className="w-full justify-center bg-softech-blue hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all"
                          size="sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* CTA Final */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-softech-blue/20 to-purple-600/20 border border-slate-700 backdrop-blur-md rounded-3xl p-10 text-center text-white mt-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">🎯 Não Encontrou o que Procura?</h2>
          <p className="text-lg mb-8 text-slate-300 relative z-10 max-w-2xl mx-auto">
            Temos soluções personalizadas para cada necessidade. Fale conosco!
          </p>
          <WhatsAppButton 
            service="Consulta Personalizada - Preciso de uma solução específica"
            className="relative z-10 bg-accent-cyan hover:bg-accent-cyan/80 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all shadow-[0_0_20px_theme(colors.accent-cyan/30%)] hover:shadow-[0_0_30px_theme(colors.accent-cyan/50%)]"
            size="md"
          />
        </motion.div>
      </div>
    </div>
  )
}