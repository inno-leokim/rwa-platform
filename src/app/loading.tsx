export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-xs text-zinc-500">로딩 중...</p>
      </div>
    </div>
  )
}
