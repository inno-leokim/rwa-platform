import Header from '@/components/Header'

export default function NewsletterLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
        <div className="mb-10">
          <div className="h-7 bg-white/5 rounded w-24 mb-2" />
          <div className="h-4 bg-white/5 rounded w-56" />
        </div>
        <div className="bg-white/3 border border-white/5 rounded-xl p-6 mb-10">
          <div className="h-4 bg-white/5 rounded w-32 mx-auto mb-2" />
          <div className="h-3 bg-white/5 rounded w-48 mx-auto mb-5" />
          <div className="h-11 bg-white/5 rounded-lg max-w-md mx-auto" />
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-5 flex gap-5">
              <div className="w-10 h-6 bg-white/5 rounded shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
