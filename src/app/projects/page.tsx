import Header from '@/components/Header'
import ProjectsClient from '@/components/ProjectsClient'
import { getProjects } from '@/lib/supabase'

export const metadata = {
  title: '프로젝트 — RWAbase',
  description: '글로벌 RWA 프로젝트를 카테고리, 체인, 상태별로 탐색하세요.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">프로젝트</h1>
          <p className="text-sm text-zinc-400">글로벌 RWA 프로젝트를 탐색하고 비교하세요.</p>
        </div>

        <ProjectsClient projects={projects} />
      </main>
    </div>
  )
}
