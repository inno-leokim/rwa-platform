import Header from '@/components/Header'

function SkeletonCard() {
  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3.5 bg-white/5 rounded w-2/3" />
          <div className="h-3 bg-white/5 rounded w-1/3" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-4/5" />
      </div>
      <div className="flex justify-between pt-3 border-t border-white/5">
        <div className="h-4 bg-white/5 rounded w-12" />
        <div className="h-4 bg-white/5 rounded w-16" />
      </div>
    </div>
  )
}

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="h-7 bg-white/5 rounded w-24 mb-2 animate-pulse" />
          <div className="h-4 bg-white/5 rounded w-48 animate-pulse" />
        </div>
        {/* Filter panel skeleton */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 mb-8 animate-pulse">
          <div className="h-9 bg-white/5 rounded-lg mb-5" />
          <div className="flex gap-2 mb-5">
            {[60, 48, 48, 56, 56].map((w, i) => (
              <div key={i} className="h-7 bg-white/5 rounded-lg" style={{ width: w }} />
            ))}
          </div>
          <div className="flex gap-2">
            {[48, 72, 64, 56].map((w, i) => (
              <div key={i} className="h-7 bg-white/5 rounded-lg" style={{ width: w }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </main>
    </div>
  )
}
