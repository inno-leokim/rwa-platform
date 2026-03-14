'use client'

import { useState, useMemo } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { Project, ProjectCategory, ProjectStatus } from '@/lib/types'

const categoryOptions: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'real_estate', label: '부동산' },
  { value: 'bond', label: '채권' },
  { value: 'art', label: '미술품' },
  { value: 'commodity', label: '원자재' },
]

const chainOptions = ['전체', 'Ethereum', 'Polygon', 'Solana']

const statusOptions: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '운영중' },
  { value: 'upcoming', label: '준비중' },
  { value: 'closed', label: '종료' },
]

type Props = {
  projects: Project[]
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        active
          ? 'bg-emerald-500 text-black'
          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
      }`}
    >
      {children}
    </button>
  )
}

export default function ProjectsClient({ projects }: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
  const [chain, setChain] = useState('전체')
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'all' && p.category !== category) return false
      if (chain !== '전체' && p.chain !== chain) return false
      if (status !== 'all' && p.status !== status) return false
      return true
    })
  }, [projects, search, category, chain, status])

  const hasActiveFilter = search || category !== 'all' || chain !== '전체' || status !== 'all'

  function resetFilters() {
    setSearch('')
    setCategory('all')
    setChain('전체')
    setStatus('all')
  }

  return (
    <div>
      {/* Search + Filter Panel */}
      <div className="bg-[#111111] border border-white/5 rounded-xl p-5 mb-8 flex flex-col gap-5">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로젝트명 검색..."
            className="w-full bg-white/5 border border-white/8 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 transition-colors"
          />
        </div>

        {/* Filters */}
        <FilterGroup label="카테고리">
          {categoryOptions.map((opt) => (
            <FilterChip key={opt.value} active={category === opt.value} onClick={() => setCategory(opt.value)}>
              {opt.label}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label="체인">
          {chainOptions.map((c) => (
            <FilterChip key={c} active={chain === c} onClick={() => setChain(c)}>
              {c}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label="상태">
          {statusOptions.map((opt) => (
            <FilterChip key={opt.value} active={status === opt.value} onClick={() => setStatus(opt.value)}>
              {opt.label}
            </FilterChip>
          ))}
        </FilterGroup>
      </div>

      {/* Result Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-zinc-400">
          <span className="text-white font-medium">{filtered.length}</span>개 프로젝트
        </span>
        {hasActiveFilter && (
          <button onClick={resetFilters} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            필터 초기화
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">조건에 맞는 프로젝트가 없습니다.</p>
          <button onClick={resetFilters} className="mt-4 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
            필터 초기화
          </button>
        </div>
      )}
    </div>
  )
}
