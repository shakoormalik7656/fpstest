import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimiter = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimiter.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimiter.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 })
    }

    const body = await req.json()
    const name = (body.name ?? '').toString().trim()
    const email = (body.email ?? '').toString().trim()
    const subject = (body.subject ?? '').toString().trim()
    const message = (body.message ?? '').toString().trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }
    if (message.length < 20) {
      return NextResponse.json({ error: 'Message must be at least 20 characters.' }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    await resend.emails.send({
      from: 'FPS Test Contact <contact@fpstest.pro>',
      to: 'contact@toolsbracker.com',
      replyTo: email,
      subject: `[FPS Test Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact form]', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
