import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          RWA<span className="text-emerald-400">base</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/projects" className="text-sm text-zinc-400 hover:text-white transition-colors">
            프로젝트
          </Link>
          <Link href="/newsletter" className="text-sm text-zinc-400 hover:text-white transition-colors">
            뉴스레터
          </Link>
        </div>
      </nav>
    </header>
  )
}
