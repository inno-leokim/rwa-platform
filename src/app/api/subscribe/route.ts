import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, listIds: [2] }),
  })

  if (res.status === 204 || res.status === 201) {
    return NextResponse.json({ ok: true })
  }

  const data = await res.json()

  // Brevo: 이미 존재하는 연락처
  if (res.status === 400 && data.code === 'duplicate_parameter') {
    return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
  }

  return NextResponse.json({ error: 'server_error' }, { status: 500 })
}
