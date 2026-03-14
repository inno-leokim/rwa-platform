import type { Metadata } from 'next'
import Header from '@/components/Header'
import NewsletterForm from '@/components/NewsletterForm'
import { getNewsletters } from '@/lib/supabase'
import { Newsletter } from '@/lib/types'

export const metadata: Metadata = {
  title: '뉴스레터',
  description: '매주 엄선된 RWA 프로젝트 분석과 시장 트렌드를 무료로 받아보세요.',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function NewsletterItem({ item, index }: { item: Newsletter; index: number }) {
  return (
    <div className="group bg-[#111111] border border-white/5 rounded-xl p-5 flex gap-5 hover:border-emerald-500/20 transition-colors">
      {/* Issue number */}
      <div className="text-2xl font-bold text-white/10 tabular-nums w-10 shrink-0 text-right">
        #{String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>
          <span className="text-[11px] text-zinc-600 shrink-0">{formatDate(item.issued_at)}</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{item.summary}</p>
        {item.content_url && (
          <a
            href={item.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            읽기
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default async function NewsletterPage() {
  const newsletters = await getNewsletters()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">뉴스레터</h1>
          <p className="text-sm text-zinc-400">매주 엄선된 RWA 프로젝트 분석과 시장 트렌드.</p>
        </div>

        {/* Subscribe CTA */}
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-6 mb-10 text-center">
          <p className="text-sm font-medium text-white mb-1">무료로 구독하세요</p>
          <p className="text-xs text-zinc-400 mb-5">매주 월요일 아침, RWA 핵심 트렌드를 받아보세요.</p>
          <NewsletterForm />
        </div>

        {/* Archive */}
        {newsletters.length > 0 ? (
          <div>
            <h2 className="text-sm font-medium text-zinc-500 mb-4">
              발행 이력 <span className="text-zinc-600">({newsletters.length}개)</span>
            </h2>
            <div className="flex flex-col gap-3">
              {newsletters.map((item, i) => (
                <NewsletterItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-3xl mb-3">📬</p>
            <p className="text-sm">첫 번째 뉴스레터를 준비 중입니다.</p>
          </div>
        )}
      </main>
    </div>
  )
}
