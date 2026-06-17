import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import InputLagTest from '@/components/tools/InputLagTest'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'Input Lag Test - Measure Your Browser Response Latency',
  description:
    'Free input lag test. Measure your browser response latency in milliseconds. Find out how fast your system responds to mouse clicks.',
  alternates: { canonical: 'https://fpstest.pro/tools/input-lag-test' },
  openGraph: {
    title: 'Input Lag Test - Measure Your Browser Response Latency',
    description:
      'Free input lag test. Measure your browser response latency in milliseconds. Find out how fast your system responds to mouse clicks.',
    url: 'https://fpstest.pro/tools/input-lag-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const FAQ_ITEMS = [
  {
    question: 'What is good input lag for gaming?',
    answer:
      'Under 10ms browser latency is excellent. Total system input lag under 20ms is considered good for competitive gaming. Professional setups aim for under 10ms total.',
  },
  {
    question: 'Does input lag affect FPS games?',
    answer:
      'Yes significantly. In fast-paced FPS games even 20ms of extra input lag can cause you to miss shots that should have connected. This is why competitive players invest in high refresh rate monitors and low latency peripherals.',
  },
  {
    question: 'How is browser input lag different from monitor input lag?',
    answer:
      'Browser input lag measures how quickly JavaScript and the browser rendering pipeline respond to your click. Monitor input lag measures how quickly pixels change after receiving a signal. Both contribute to total perceived lag.',
  },
  {
    question: 'How do I test input lag online for free?',
    answer:
      'Use this free online input lag tester. Click Start Test, then click each target the moment it appears across 5 rounds. The tool reports your average browser response latency in milliseconds with no download or signup.',
  },
  {
    question: 'Is input lag the same as reaction time?',
    answer:
      'No. Input lag is how long your system takes to respond to an input, while reaction time is how long you take to respond to what you see. This test includes your reaction speed, so for a pure reflex measurement try our reaction time test.',
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
    { '@type': 'ListItem', position: 3, name: 'Input Lag Test', item: 'https://fpstest.pro/tools/input-lag-test' },
  ],
}

const LAG_TABLE = [
  { lag: 'Under 5ms', rating: 'Excellent',      impact: 'No noticeable impact' },
  { lag: '5-10ms',    rating: 'Good',            impact: 'Minimal impact' },
  { lag: '10-20ms',   rating: 'Average',         impact: 'Slight delay in fast games' },
  { lag: '20-35ms',   rating: 'Below average',   impact: 'Noticeable in FPS games' },
  { lag: '35ms+',     rating: 'High',            impact: 'Clear delay, affects aim' },
]

const REDUCTION_TIPS = [
  'Use a 1000Hz polling rate mouse',
  'Enable game mode on your monitor',
  'Use DisplayPort instead of HDMI where possible',
  'Turn off VSync (adds 1-2 frame delay)',
  'Close background apps and browser tabs',
  'Use a wired mouse instead of wireless',
  'Set your monitor to its maximum refresh rate',
]

const WRAP: CSSProperties  = { maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }
const H2:   CSSProperties  = { color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem' }
const H3:   CSSProperties  = { color: 'var(--accent)', fontSize: '1.0625rem', fontWeight: 600, margin: '0 0 0.75rem' }
const BODY: CSSProperties  = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: 0 }
const SEC:  CSSProperties  = { padding: '2.5rem 0', borderBottom: '1px solid var(--border-color)' }
const TH:   CSSProperties  = { color: 'var(--accent)', fontWeight: 600, padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' as const, backgroundColor: 'var(--bg-card)' }
const TD:   CSSProperties  = { color: 'var(--text-secondary)', padding: '0.625rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }
const TD_A: CSSProperties  = { ...TD, color: 'var(--accent)', fontWeight: 700 }

const STEP_NUM: CSSProperties = {
  width: '1.75rem', height: '1.75rem', borderRadius: '50%', flexShrink: 0,
  backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700,
}

export default function InputLagTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Hero + tool */}
        <section style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0 0' }}>
          <div style={WRAP}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 0.625rem' }}>
              Input Lag Test
            </h1>
            <p style={{ ...BODY, fontSize: '1rem', marginBottom: '2rem' }}>
              Measure your browser response latency in milliseconds. Click the target, get your results. No download needed.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <InputLagTest />
              </div>
            </div>
          </div>
        </section>

        {/* What is input lag */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>What Is Input Lag?</h2>
            <p style={BODY}>
              Input lag is the delay between your physical action (like clicking a mouse button) and the response appearing on screen. In gaming this delay can mean the difference between hitting a shot and missing it. This tool measures your browser rendering latency, which is one component of total system input lag.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Use the Input Lag Test</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px' }}>
              {[
                'Click Start Test',
                'Click the target as soon as you see it appear',
                'Complete all 5 rounds',
                'See your average browser response latency',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={STEP_NUM}>{i + 1}</div>
                  <p style={{ ...BODY, marginTop: '0.25rem' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benchmarks + tips */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>Input Lag Benchmarks</h2>
            <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '380px' }}>
                <thead>
                  <tr>{['Input Lag', 'Rating', 'Impact on Gaming'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {LAG_TABLE.map((row, i) => (
                    <tr key={row.lag} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row.lag}</td>
                      <td style={{ ...TD, color: 'var(--text-primary)', fontWeight: 600 }}>{row.rating}</td>
                      <td style={TD}>{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={H3}>What Causes Input Lag?</h3>
            <p style={{ ...BODY, maxWidth: '720px', marginBottom: '2rem' }}>
              Total input lag comes from multiple sources: mouse polling rate (1000Hz mouse = 1ms), USB processing, game engine frame time, GPU render time, monitor response time, and monitor refresh delay. This browser test measures JS event and render latency only. For complete input lag testing you need specialized hardware. A higher refresh rate cuts lag too, so check yours with the <Link href="/tools/hz-detector" style={{ color: 'var(--accent)' }}>refresh rate test</Link>, and measure your own reflexes with the <Link href="/tools/fps-reaction-test" style={{ color: 'var(--accent)' }}>reaction time test</Link>.
            </p>

            <h3 style={H3}>How to Reduce Input Lag</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '680px' }}>
              {REDUCTION_TIPS.map(tip => (
                <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15em' }}>▸</span>
                  {tip}
                </li>
              ))}
            </ul>
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

        <RelatedTools toolIds={['fps-test', 'hz-detector', 'fps-reaction-test']} />
      </div>
    </>
  )
}
