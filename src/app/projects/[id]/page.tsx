import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { getProjectById, getRelatedProjects } from '@/lib/supabase'

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

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return {}
  return {
    title: `${project.name} — RWAbase`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) notFound()

  const related = await getRelatedProjects(project.id, project.category)

  const status = statusConfig[project.status]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          프로젝트 목록
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-lg font-bold text-white/60 shrink-0">
                {project.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white leading-tight">{project.name}</h1>
                <p className="text-zinc-400 text-sm mt-1">{project.description}</p>
              </div>
            </div>

            {/* Detail */}
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-zinc-300 mb-3">프로젝트 소개</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{project.detail}</p>
            </div>

            {/* Official Site Button */}
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors w-full sm:w-fit"
            >
              공식 사이트 방문
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Sidebar — Basic Info */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-zinc-300">기본 정보</h2>

              <InfoRow label="카테고리" value={categoryLabel[project.category]} />
              <InfoRow label="체인" value={project.chain} />
              <InfoRow label="출시일" value={project.launch_date} />

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">상태</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${status.className}`}>
                  {status.label}
                </span>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-[10px] text-zinc-600 mb-1">TVL</div>
                <div className="text-2xl font-bold text-emerald-400">{project.tvl}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-white mb-5">
              관련 프로젝트
              <span className="text-sm font-normal text-zinc-500 ml-2">
                — 같은 {categoryLabel[project.category]} 카테고리
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-xs text-zinc-200 font-medium">{value}</span>
    </div>
  )
}
