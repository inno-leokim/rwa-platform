import Header from '@/components/Header'

export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
        {/* Back */}
        <div className="h-4 bg-white/5 rounded w-24 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/5 shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-6 bg-white/5 rounded w-48" />
                <div className="h-4 bg-white/5 rounded w-full" />
              </div>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6 flex flex-col gap-3">
              <div className="h-4 bg-white/5 rounded w-20 mb-1" />
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-3/4" />
            </div>
            <div className="h-11 bg-white/5 rounded-lg w-40" />
          </div>

          {/* Sidebar */}
          <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-4 h-fit">
            <div className="h-4 bg-white/5 rounded w-16" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 bg-white/5 rounded w-16" />
                <div className="h-3 bg-white/5 rounded w-20" />
              </div>
            ))}
            <div className="border-t border-white/5 pt-4">
              <div className="h-3 bg-white/5 rounded w-8 mb-2" />
              <div className="h-7 bg-white/5 rounded w-24" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
