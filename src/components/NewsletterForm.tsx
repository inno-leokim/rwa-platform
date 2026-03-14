'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/lib/supabase'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      await subscribeNewsletter(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-3">
        <p className="text-emerald-400 font-medium">구독 완료! 다음 뉴스레터를 기대해주세요 🎉</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력하세요"
          required
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-semibold text-sm rounded-lg transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? '처리 중...' : '무료 구독'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      )}
    </div>
  )
}
