import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getProjects } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'RWAbase — 국내 유일 RWA 프로젝트 트래킹',
  description: 'Real World Asset(RWA) 프로젝트를 한눈에. 부동산, 채권, 미술품, 원자재 토큰화 프로젝트를 추적하세요.',
  openGraph: {
    title: 'RWAbase — 국내 유일 RWA 프로젝트 트래킹',
    description: 'Real World Asset(RWA) 프로젝트를 한눈에. 부동산, 채권, 미술품, 원자재 토큰화 프로젝트를 추적하세요.',
    url: '/',
  },
}

const stats = [
  { label: '트래킹 프로젝트', value: '120+' },
  { label: '총 TVL', value: '$8.2B' },
  { label: '지원 체인', value: '15+' },
]

export default async function HomePage() {
  const latestProjects = (await getProjects()).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">국내 유일 RWA 트래킹 플랫폼</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Real World Asset,
            <br />
            <span className="text-emerald-400">한눈에 파악하세요</span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            부동산, 채권, 미술품, 원자재까지. 글로벌 RWA 프로젝트를 분석하고
            <br className="hidden sm:block" />
            최신 트렌드를 뉴스레터로 받아보세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors"
            >
              프로젝트 탐색하기
            </Link>
            <Link
              href="/newsletter"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-colors"
            >
              뉴스레터 아카이브
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Projects */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">최신 프로젝트</h2>
            <Link href="/projects" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              RWA 트렌드를 놓치지 마세요
            </h2>
            <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto">
              매주 엄선된 RWA 프로젝트 분석과 시장 트렌드를 무료로 받아보세요.
            </p>
            <NewsletterForm />
            <p className="text-xs text-zinc-600 mt-4">스팸 없음. 언제든지 구독 취소 가능.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold">
            RWA<span className="text-emerald-400">base</span>
          </span>
          <p className="text-xs text-zinc-600">© 2024 RWAbase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
