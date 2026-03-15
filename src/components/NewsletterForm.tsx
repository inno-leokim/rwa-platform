'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'already' | 'invalid_email'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
      return
    }

    const data = await res.json()
    if (res.status === 409) setStatus('already')
    else if (data.error === 'invalid_email') setStatus('invalid_email')
    else setStatus('error')
  }

  if (status === 'success') {
    return (
      <div className="text-center py-3">
        <p className="text-emerald-400 font-medium">구독이 완료됐어요! 🎉</p>
      </div>
    )
  }

  const messages: Partial<Record<Status, string>> = {
    error: '잠시 후 다시 시도해주세요.',
    already: '이미 구독 중인 이메일이에요.',
    invalid_email: '올바른 이메일을 입력해주세요.',
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
          {status === 'loading' ? '구독 중...' : '무료 구독'}
        </button>
      </form>
      {messages[status] && (
        <p className={`text-xs ${status === 'already' ? 'text-yellow-400' : 'text-red-400'}`}>
          {messages[status]}
        </p>
      )}
    </div>
  )
}
