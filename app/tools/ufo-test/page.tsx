import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import UFOTest from '@/components/tools/UFOTest'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'UFO FPS Test - See 30, 60, 120 and 144 FPS Difference',
  description:
    'Free UFO FPS test. Watch objects move at 30, 60, 120 and 144 FPS, detect your real refresh rate, and check for ghosting and motion blur. No download needed.',
  alternates: { canonical: 'https://fpstest.pro/tools/ufo-test' },
  openGraph: {
    title: 'UFO FPS Test - See 30, 60, 120 and 144 FPS Difference',
    description:
      'Free UFO FPS test. Watch objects move at 30, 60, 120 and 144 FPS, detect your real refresh rate, and check for ghosting and motion blur. No download needed.',
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
      'Your monitor refresh rate may be capped at 60Hz. The UFO test detects your real refresh rate at the top of the tool, and you can also use the Monitor Hz Detector on this site to confirm your actual screen refresh rate.',
  },
  {
    question: 'How does the UFO test detect my refresh rate?',
    answer:
      'It measures the time between animation frames in your browser and converts that into a refresh rate in Hz. Let it run for a few seconds for the most accurate reading, and make sure no other heavy tabs or apps are running.',
  },
  {
    question: 'What is ghosting on the UFO test?',
    answer:
      'Ghosting is a faint trail left behind the moving UFO because your monitor pixels cannot change color fast enough. A short, subtle trail is normal. A long dark smear means a slow panel, and a bright halo ahead of the UFO means your overdrive setting is too high.',
  },
  {
    question: 'Is the UFO test the same as the alien or ovni FPS test?',
    answer:
      'Yes. Alien FPS test and ovni FPS test (ovni is the Spanish and French word for UFO) are just other names for the same motion test. They all show objects moving at different frame rates so you can compare smoothness.',
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

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fpstest.pro' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://fpstest.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'UFO FPS Test', item: 'https://fpstest.pro/tools/ufo-test' },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

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
              The UFO FPS test shows four horizontal tracks with objects moving at different frame rates: 30, 60, 120, and 144 FPS. Each track travels at the same on-screen speed but updates at a different rate, so the visual difference between 30 and 144 FPS is immediately obvious. The test also detects your real monitor refresh rate live and helps you spot ghosting and motion blur. It is the fastest way to see why gamers chase high frame rates and whether your screen can actually display them. You may also see this test called the alien FPS test or, in Spanish and French, the ovni FPS test, but they all work the same way.
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

        {/* Refresh rate comparison */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>UFO Test: 60Hz vs 120Hz vs 144Hz vs 240Hz</h2>
            <p style={{ ...BODY, marginBottom: '1.5rem' }}>
              The higher your refresh rate, the shorter each frame stays on screen, and the less motion blur the UFO leaves behind. This is why a 240Hz monitor looks dramatically sharper in motion than a 60Hz one, even though the still image is identical.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '460px' }}>
                <thead>
                  <tr>{['Refresh Rate', 'Frame Time', 'Motion Blur', 'Best For'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['60Hz',  '16.7ms', 'Heavy blur',     'Web, video, casual gaming'],
                    ['120Hz', '8.3ms',  'Much sharper',   'Smooth gaming'],
                    ['144Hz', '6.9ms',  'Very sharp',     'Competitive gaming (most popular)'],
                    ['240Hz', '4.2ms',  'Near-perfect',   'Esports and fast FPS'],
                    ['360Hz', '2.8ms',  'Elite clarity',  'Pro tournaments'],
                  ].map((row, i) => (
                    <tr key={row[0]} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={{ ...TD, color: 'var(--accent)', fontWeight: 700 }}>{row[0]}</td>
                      <td style={TD}>{row[1]}</td>
                      <td style={TD}>{row[2]}</td>
                      <td style={TD}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Ghosting & motion blur */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>Ghosting and Motion Blur: What to Look For</h2>
            <p style={BODY}>
              Beyond frame rate, the UFO test reveals two things about your panel quality. Motion blur is the soft smearing you see on every LCD because each frame is held in place until the next one arrives, called sample-and-hold blur. Ghosting is different: it is a faint trail left behind the UFO because the pixels physically cannot change color fast enough. A little blur is normal, but a long dark trail means a slow panel.
            </p>
            <h3 style={{ ...H3, marginTop: '1.5rem' }}>Ghosting by panel type</h3>
            <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '420px' }}>
                <thead>
                  <tr>{['Panel', 'Response Time', 'Ghosting'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['TN',   '0.5-2ms',     'None to minimal'],
                    ['IPS',  '1-5ms',       'Low to mild'],
                    ['VA',   '4-12ms',      'Moderate to heavy'],
                    ['OLED', '0.1ms',       'Virtually none'],
                  ].map((row, i) => (
                    <tr key={row[0]} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row[0]}</td>
                      <td style={TD}>{row[1]}</td>
                      <td style={TD}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to read results */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Read Your UFO Test Results</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Sharp UFO, no trail:</strong> excellent. Your panel is fast and overdrive is set correctly. Nothing to fix.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Faint shadow behind it:</strong> mild ghosting. Try raising your monitor overdrive setting one level in the OSD menu.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Long dark smear:</strong> heavy ghosting, common on slow VA panels. Increase overdrive or consider a faster monitor.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Bright white halo ahead of it:</strong> overdrive overshoot. Your setting is too high, so lower it one step.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>All tracks look identical:</strong> your monitor is capped at 60Hz. Check Windows display settings and your cable, then run our <Link href="/tools/hz-detector" style={{ color: 'var(--accent)' }}>monitor Hz detector</Link> to confirm your real refresh rate.</p>
            </div>
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
