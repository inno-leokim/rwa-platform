import { createClient } from '@supabase/supabase-js'
import { Project } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Projects
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function getRelatedProjects(currentId: string, category: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .neq('id', currentId)
    .limit(3)

  if (error) throw new Error(error.message)
  return data ?? []
}

// Subscribers
export async function subscribeNewsletter(email: string): Promise<void> {
  const { error } = await supabase
    .from('subscribers')
    .insert({ email })

  if (error) {
    // 중복 이메일(unique constraint)은 성공으로 처리
    if (error.code === '23505') return
    throw new Error(error.message)
  }
}
