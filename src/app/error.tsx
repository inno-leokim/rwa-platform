'use client'

export default function Error({
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
        <h2 className="text-white font-semibold mb-2">오류가 발생했습니다</h2>
        <p className="text-zinc-500 text-sm mb-6">{error.message || '알 수 없는 오류입니다.'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
