'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiBookOpen, FiDownload, FiTrendingUp, FiEye } from 'react-icons/fi';

interface AdminMetrics {
  totalVisitors: number;
  courseAccesses: number;
  toolDownloads: number;
  avgTimeOnPage: number;
  topCourses: Array<{ course: string; count: number }>;
  topTools: Array<{ tool: string; count: number }>;
  feedbackCount: number;
  avgRating: number;
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalVisitors: 0,
    courseAccesses: 0,
    toolDownloads: 0,
    avgTimeOnPage: 0,
    topCourses: [],
    topTools: [],
    feedbackCount: 0,
    avgRating: 0
  });

  useEffect(() => {
    const loadAdminMetrics = () => {
      const storedAnalytics = localStorage.getItem('capacita_pgm_analytics');
      const storedFeedback = localStorage.getItem('capacita_pgm_feedback');
      
      let realCourseAccesses = 0;
      let realDownloads = 0;
      let courseStats: { [key: string]: number } = {};
      let downloadStats: { [key: string]: number } = {};
      let totalTime = 0;
      let timeEntries = 0;
      
      if (storedAnalytics) {
        const events = JSON.parse(storedAnalytics);
        
        events.forEach((event: any) => {
          if (event.event === 'course_access') {
            realCourseAccesses++;
            if (event.label) {
              const courseName = event.label.split(': ')[1] || event.label;
              courseStats[courseName] = (courseStats[courseName] || 0) + 1;
            }
          } else if (event.event === 'tool_download') {
            realDownloads++;
            if (event.label) {
              downloadStats[event.label] = (downloadStats[event.label] || 0) + 1;
            }
          } else if (event.event === 'time_on_page' && event.value) {
            totalTime += event.value;
            timeEntries++;
          }
        });
      }

      let feedbackCount = 0;
      let totalRating = 0;
      
      if (storedFeedback) {
        const feedbacks = JSON.parse(storedFeedback);
        feedbackCount = feedbacks.length;
        totalRating = feedbacks.reduce((sum: number, fb: any) => sum + fb.rating, 0);
      }

      const topCourses = Object.entries(courseStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([course, count]) => ({ course, count }));

      const topTools = Object.entries(downloadStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([tool, count]) => ({ tool, count }));

      setMetrics({
        totalVisitors: Math.max(1, realCourseAccesses * 3),
        courseAccesses: realCourseAccesses,
        toolDownloads: realDownloads,
        avgTimeOnPage: timeEntries > 0 ? totalTime / timeEntries : 0,
        topCourses,
        topTools,
        feedbackCount,
        avgRating: feedbackCount > 0 ? totalRating / feedbackCount : 0
      });
    };

    loadAdminMetrics();
    const interval = setInterval(loadAdminMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Visitantes</p>
              <p className="text-2xl font-bold text-accent-cyan">{metrics.totalVisitors}</p>
            </div>
            <FiUsers className="text-accent-cyan text-xl" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Acessos Cursos</p>
              <p className="text-2xl font-bold text-green-400">{metrics.courseAccesses}</p>
            </div>
            <FiBookOpen className="text-green-400 text-xl" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Downloads</p>
              <p className="text-2xl font-bold text-purple-400">{metrics.toolDownloads}</p>
            </div>
            <FiDownload className="text-purple-400 text-xl" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Tempo Médio</p>
              <p className="text-2xl font-bold text-orange-400">{metrics.avgTimeOnPage.toFixed(1)}s</p>
            </div>
            <FiTrendingUp className="text-orange-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Rankings Detalhados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">🏆 Cursos Mais Acessados</h3>
          {metrics.topCourses.length > 0 ? (
            <div className="space-y-2">
              {metrics.topCourses.map((course, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">{index + 1}. {course.course}</span>
                  <span className="font-semibold text-accent-cyan">{course.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Nenhum acesso registrado ainda</p>
          )}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">🛠️ Ferramentas Mais Baixadas</h3>
          {metrics.topTools.length > 0 ? (
            <div className="space-y-2">
              {metrics.topTools.map((tool, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">{index + 1}. {tool.tool}</span>
                  <span className="font-semibold text-purple-400">{tool.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Nenhum download registrado ainda</p>
          )}
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">💬 Feedback dos Usuários</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-300">Total de Avaliações</p>
            <p className="text-xl font-bold text-accent-cyan">{metrics.feedbackCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Avaliação Média</p>
            <p className="text-xl font-bold text-green-400">
              {metrics.avgRating > 0 ? `${metrics.avgRating.toFixed(1)}/5.0` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}