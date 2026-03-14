import Link from 'next/link'
import { Project } from '@/lib/types'

const categoryLabel: Record<string, string> = {
  real_estate: '부동산',
  bond: '채권',
  art: '미술품',
  commodity: '원자재',
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: '운영중', className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  upcoming: { label: '준비중', className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
  closed: { label: '종료', className: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20' },
}

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const status = statusConfig[project.status]

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-4 hover:border-emerald-500/30 hover:bg-[#141414] transition-all duration-200 cursor-pointer h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-white/60 shrink-0">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm leading-tight">{project.name}</h3>
              <span className="text-xs text-zinc-500">{categoryLabel[project.category]}</span>
            </div>
          </div>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${status.className}`}>
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">{project.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <div className="text-[10px] text-zinc-600 mb-0.5">TVL</div>
            <div className="text-sm font-semibold text-emerald-400">{project.tvl}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-600 mb-0.5">체인</div>
            <div className="text-xs text-zinc-300">{project.chain}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
