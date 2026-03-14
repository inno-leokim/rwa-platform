export type ProjectCategory = 'real_estate' | 'bond' | 'art' | 'commodity'

export type Newsletter = {
  id: string
  title: string
  summary: string
  content_url: string
  issued_at: string
  created_at: string
}
export type ProjectStatus = 'active' | 'upcoming' | 'closed'

export type Project = {
  id: string
  name: string
  category: ProjectCategory
  chain: string
  tvl: string
  status: ProjectStatus
  description: string
  detail: string
  website: string
  launch_date: string
  logo_url: string
  created_at: string
}
