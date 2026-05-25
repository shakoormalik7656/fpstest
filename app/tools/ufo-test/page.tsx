import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import UFOTest from '@/components/tools/UFOTest'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'UFO FPS Test - See 30, 60, 120 and 144 FPS Difference',
  description:
    'Free UFO FPS test. Watch objects move at 30, 60, 120 and 144 frames per second. See exactly how much smoother high FPS looks in real time.',
  alternates: { canonical: 'https://fpstest.pro/tools/ufo-test' },
  openGraph: {
    title: 'UFO FPS Test - See 30, 60, 120 and 144 FPS Difference',
    description:
      'Free UFO FPS test. Watch objects move at 30, 60, 120 and 144 frames per second. See exactly how much smoother high FPS looks in real time.',
    url: 'https://fpstest.pro/tools/ufo-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const FAQ_ITEMS = [
  {
    question: 'What is a UFO FPS test?',
    answer:
      'A UFO FPS test shows moving objects at different frame rates simultaneously so you can compare how smooth 30, 60, 120, and 144 FPS look side by side in real time.',
  },
  {
    question: 'Can I see the difference between 60 and 144 FPS?',
    answer:
      'Yes, most people can see the difference, especially during fast motion. The 144 FPS track looks noticeably smoother and has less motion blur than the 60 FPS track.',
  },
  {
    question: 'Why does 30 FPS look choppy?',
    answer:
      'At 30 FPS each frame is displayed for 33 milliseconds. This gap between frames is long enough for your eye to detect discontinuous motion, which appears as choppiness or stutter.',
  },
  {
    question: 'What if 60 and 144 look the same to me?',
    answer:
      'Your monitor refresh rate may be capped at 60Hz. Use the Monitor Hz Detector on this site to check your actual screen refresh rate.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const TRACKS = [
  { track: '1', fps: '30 FPS',  frameTime: '33.3ms', bestFor: 'Minimum playable' },
  { track: '2', fps: '60 FPS',  frameTime: '16.7ms', bestFor: 'Standard gaming' },
  { track: '3', fps: '120 FPS', frameTime: '8.3ms',  bestFor: 'Smooth gaming' },
  { track: '4', fps: '144 FPS', frameTime: '6.9ms',  bestFor: 'Competitive gaming' },
]

const WRAP: CSSProperties  = { maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }
const H2:   CSSProperties  = { color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem' }
const H3:   CSSProperties  = { color: 'var(--accent)', fontSize: '1.0625rem', fontWeight: 600, margin: '0 0 0.75rem' }
const BODY: CSSProperties  = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: 0 }
const SEC:  CSSProperties  = { padding: '2.5rem 0', borderBottom: '1px solid var(--border-color)' }
const TH:   CSSProperties  = { color: 'var(--accent)', fontWeight: 600, padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' as const, backgroundColor: 'var(--bg-card)' }
const TD:   CSSProperties  = { color: 'var(--text-secondary)', padding: '0.625rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }
const TD_A: CSSProperties  = { ...TD, color: 'var(--text-primary)', fontWeight: 600 }

const STEP_NUM: CSSProperties = {
  width: '1.75rem', height: '1.75rem', borderRadius: '50%', flexShrink: 0,
  backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700,
}

export default function UFOTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Hero + tool */}
        <section style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0 0' }}>
          <div style={WRAP}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 0.625rem' }}>
              UFO FPS Test — See 30, 60, 120 and 144 FPS
            </h1>
            <p style={{ ...BODY, fontSize: '1rem', marginBottom: '2rem' }}>
              Watch objects move at 30, 60, 120, and 144 FPS simultaneously. See exactly how much smoother high frame rates look in real time.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <UFOTest />
              </div>
            </div>
          </div>
        </section>

        {/* What is UFO FPS Test */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>What Is the UFO FPS Test?</h2>
            <p style={BODY}>
              The UFO FPS test shows four horizontal tracks with objects moving at different frame rates: 30, 60, 120, and 144 FPS. Each track runs at a fixed speed but updates at a different rate. The visual difference between 30 and 144 FPS is immediately obvious. This test helps you understand why gamers chase high frame rates and whether your monitor can actually display them.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Use the UFO Motion Test</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px' }}>
              {[
                'Watch all four tracks at once',
                'Notice the smoothness difference between 30 FPS and 144 FPS',
                'If 60 and 144 look identical to you, your monitor may be capped at 60Hz',
                'Use our Monitor Hz Detector to check your screen refresh rate',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={STEP_NUM}>{i + 1}</div>
                  <p style={{ ...BODY, marginTop: '0.25rem' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Track data */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>What the FPS Tracks Mean</h2>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '420px' }}>
                <thead>
                  <tr>{['Track', 'Frame Rate', 'Frame Time', 'Best For'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {TRACKS.map((row, i) => (
                    <tr key={row.track} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row.track}</td>
                      <td style={{ ...TD, color: 'var(--accent)', fontWeight: 700 }}>{row.fps}</td>
                      <td style={TD}>{row.frameTime}</td>
                      <td style={TD}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={H3}>Can You Actually See the Difference?</h3>
            <p style={{ ...BODY, maxWidth: '720px' }}>
              Most people can see the difference between 30 and 60 FPS immediately. The jump from 60 to 144 FPS is more subtle but noticeable, especially in fast-moving games. Above 240 FPS the difference becomes very hard to see without specialized equipment.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)', borderBottom: 'none' }}>
          <div style={WRAP}>
            <h2 style={{ ...H2, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
              {FAQ_ITEMS.map(item => (
                <div key={item.question} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.625rem', padding: '1.125rem 1.25rem' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.5rem' }}>{item.question}</p>
                  <p style={{ ...BODY, fontSize: '0.875rem' }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools toolIds={['fps-test', 'hz-detector', 'frame-comparison']} />
      </div>
    </>
  )
}
