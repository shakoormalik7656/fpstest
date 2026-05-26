import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import FPSMeter from '@/components/tools/FPSMeter'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'FPS Test Online — Check Your PC & Browser Frame Rate',
  description:
    'Free FPS test online. Check your real browser frame rate with live stats: average, min, max, frame time and stability. No download needed.',
  alternates: { canonical: 'https://fpstest.pro/tools/fps-test' },
  openGraph: {
    title: 'FPS Test Online — Check Your PC & Browser Frame Rate',
    description:
      'Free FPS test online. Check your real browser frame rate with live stats: average, min, max, frame time and stability. No download needed.',
    url: 'https://fpstest.pro/tools/fps-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const FAQ_ITEMS = [
  {
    question: 'What is a good FPS test score?',
    answer:
      '60 FPS or above is good for general use. For competitive gaming aim for 144 FPS or higher. If your score is below 30 FPS close background apps and retest.',
  },
  {
    question: 'How do I test my FPS online?',
    answer:
      'Click Start FPS Test on this page. The test runs for 10 seconds using requestAnimationFrame and shows live frame rate data including average, min, max, frame time, and stability.',
  },
  {
    question: 'Why is my FPS test score low?',
    answer:
      'Common causes are too many open browser tabs, background apps using CPU or GPU, outdated graphics drivers, or a laptop in power-saving mode. Close other apps and retest.',
  },
  {
    question: 'What is frame time in an FPS test?',
    answer:
      'Frame time is how long each frame takes to render in milliseconds. At 60 FPS the frame time is 16.7ms. Lower frame time means more consistent and smooth performance.',
  },
  {
    question: 'Is this the same as testing FPS in games?',
    answer:
      "No. This tests browser rendering performance using requestAnimationFrame. In-game FPS uses your GPU through DirectX or Vulkan. The results will differ but browser FPS reflects your system's general rendering capability.",
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
    { '@type': 'ListItem', position: 3, name: 'FPS Test Online', item: 'https://fpstest.pro/tools/fps-test' },
  ],
}

const STAT_TABLE = [
  { stat: 'Current FPS',  measures: 'Live frame rate right now',        good: '60+' },
  { stat: 'Average FPS',  measures: 'Mean FPS across full test',         good: '60+' },
  { stat: 'Min FPS',      measures: 'Lowest frame rate recorded',        good: 'Above 30' },
  { stat: 'Max FPS',      measures: 'Highest frame rate recorded',       good: 'Matches monitor Hz' },
  { stat: 'Frame Time',   measures: 'Milliseconds per frame',            good: 'Under 16.7ms' },
  { stat: 'Stability',    measures: 'How consistent FPS stays',          good: 'Above 90%' },
]

const RESULT_TABLE = [
  { fps: '144+ FPS',     rating: 'Excellent', meaning: 'High-end system, great for competitive gaming' },
  { fps: '60-143 FPS',   rating: 'Good',      meaning: 'Smooth for most games and tasks' },
  { fps: '30-59 FPS',    rating: 'Average',   meaning: 'Playable but may stutter in fast games' },
  { fps: 'Under 30 FPS', rating: 'Low',       meaning: 'Close background apps and retest' },
]

const TIPS = [
  'Close all other browser tabs before testing',
  'Quit background apps like Discord, Spotify, Chrome extensions',
  'Make sure your GPU drivers are up to date',
  'Test in Chrome or Edge for best browser FPS performance',
  'Plug in your laptop if on battery (power saving limits FPS)',
  'Disable browser hardware acceleration and retest to compare',
]

const WRAP: CSSProperties = { maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }
const H2:   CSSProperties = { color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem' }
const H3:   CSSProperties = { color: 'var(--accent)', fontSize: '1.0625rem', fontWeight: 600, margin: '0 0 0.75rem' }
const BODY: CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: 0 }
const SEC:  CSSProperties = { padding: '2.5rem 0', borderBottom: '1px solid var(--border-color)' }
const TH:   CSSProperties = { color: 'var(--accent)', fontWeight: 600, padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' as const, backgroundColor: 'var(--bg-card)' }
const TD:   CSSProperties = { color: 'var(--text-secondary)', padding: '0.625rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }
const TD_A: CSSProperties = { ...TD, color: 'var(--text-primary)', fontWeight: 600 }

export default function FPSTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Hero + tool */}
        <section style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0 0' }}>
          <div style={WRAP}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 0.625rem' }}>
              FPS Test Online
            </h1>
            <p style={{ ...BODY, fontSize: '1rem', marginBottom: '2rem' }}>
              Measure your real browser frame rate with live stats. Current FPS, average, min, max, frame time, and stability score. No download needed.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <FPSMeter />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>How the FPS Test Works</h2>
            <p style={BODY}>
              This tool uses your browser&apos;s requestAnimationFrame API to count how many frames your system renders per second. Unlike software FPS counters that hook into game processes, this test measures your browser&apos;s actual rendering performance. It runs for 10 seconds and tracks every frame to give you current FPS, average FPS, minimum FPS, maximum FPS, frame time in milliseconds, and a stability percentage.
            </p>
          </div>
        </section>

        {/* Stat table */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>What Each FPS Stat Means</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '420px' }}>
                <thead>
                  <tr>{['Stat', 'What It Measures', 'Good Value'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {STAT_TABLE.map((row, i) => (
                    <tr key={row.stat} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row.stat}</td>
                      <td style={TD}>{row.measures}</td>
                      <td style={{ ...TD, color: 'var(--accent)', fontWeight: 600 }}>{row.good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Results table + tips */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>FPS Test Results — What&apos;s Your Score?</h2>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '400px' }}>
                <thead>
                  <tr>{['FPS Result', 'Rating', 'What It Means'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {RESULT_TABLE.map((row, i) => (
                    <tr key={row.fps} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={{ ...TD, color: 'var(--accent)', fontWeight: 700 }}>{row.fps}</td>
                      <td style={{ ...TD, color: 'var(--text-primary)', fontWeight: 600 }}>{row.rating}</td>
                      <td style={TD}>{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={H3}>How to Get a Higher FPS Score</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '680px' }}>
              {TIPS.map(tip => (
                <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15em' }}>▸</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Browser vs in-game */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>FPS Test vs In-Game FPS</h2>
            <p style={BODY}>
              Your browser FPS test result and your in-game FPS are different measurements. Games use your GPU directly through DirectX or Vulkan APIs which are much more efficient than a browser&apos;s rendering pipeline. A browser FPS test showing 120 FPS does not mean your games run at 120 FPS. However if your browser struggles to hit 60 FPS on this simple canvas test, your system likely has performance issues that affect gaming too.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '2.5rem 0', borderBottom: 'none' }}>
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

        <RelatedTools toolIds={['ufo-test', 'hz-detector', 'fps-reaction-test']} />
      </div>
    </>
  )
}
