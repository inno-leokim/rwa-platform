import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('[subscribe] BREVO_API_KEY is not set')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  let res: Response
  try {
    res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, listIds: [2] }),
    })
  } catch (err) {
    console.error('[subscribe] fetch failed:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  // 성공: 201 신규 생성, 204 기존 연락처 리스트 추가
  if (res.status === 201 || res.status === 204) {
    return NextResponse.json({ ok: true })
  }

  let data: Record<string, unknown> = {}
  try {
    data = await res.json()
  } catch {
    // json 파싱 실패 무시
  }

  console.error('[subscribe] Brevo error:', res.status, data)

  // 이미 동일 리스트에 구독 중 (Brevo: duplicate_parameter)
  if (res.status === 400 && data.code === 'duplicate_parameter') {
    return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
  }

  return NextResponse.json({ error: 'server_error', detail: data }, { status: 500 })
}
