'use client'

import Link from 'next/link'

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h2 className="text-white font-semibold mb-2">프로젝트를 불러오지 못했습니다</h2>
        <p className="text-zinc-500 text-sm mb-6">{error.message || '잠시 후 다시 시도해주세요.'}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
          >
            다시 시도
          </button>
          <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-colors">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
