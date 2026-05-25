import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import FPSReactionTest from '@/components/tools/FPSReactionTest'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'FPS Reaction Test - How Fast Are Your Gaming Reflexes?',
  description:
    'Free FPS reaction test. Measure your gaming reaction time in milliseconds. See if your reflexes are fast enough for competitive FPS games.',
  alternates: { canonical: 'https://fpstest.pro/tools/fps-reaction-test' },
  openGraph: {
    title: 'FPS Reaction Test — How Fast Are Your Gaming Reflexes?',
    description:
      'Free FPS reaction test. Measure your gaming reaction time in milliseconds. See if your reflexes are fast enough for competitive FPS games.',
    url: 'https://fpstest.pro/tools/fps-reaction-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const FAQ_ITEMS = [
  {
    question: 'What is a good reaction time for FPS games?',
    answer:
      'Under 200ms is considered good for competitive FPS games. Professional esports players typically average 150-180ms. The average person reacts in 250-300ms.',
  },
  {
    question: 'Can I improve my reaction time?',
    answer:
      'Yes. Regular practice, proper sleep, hydration, and reducing caffeine crashes all help. Most improvement comes in the first few weeks of regular testing and training.',
  },
  {
    question: 'Does FPS affect reaction time in games?',
    answer:
      'Yes. Higher FPS means your game shows you updated frames more frequently, which reduces the time between an event happening and you seeing it on screen. This is why competitive players use 144Hz and 240Hz monitors.',
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

const BENCHMARKS = [
  { range: 'Under 150ms', rating: 'Inhuman',      level: 'Pro esports player' },
  { range: '150-200ms',   rating: 'Excellent',    level: 'Competitive gamer' },
  { range: '200-250ms',   rating: 'Above average',level: 'Casual FPS player' },
  { range: '250-300ms',   rating: 'Average',      level: 'Normal human range' },
  { range: '300-400ms',   rating: 'Below average',level: 'Keep practicing' },
  { range: '400ms+',      rating: 'Slow',         level: 'Try again after rest' },
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

export default function FPSReactionTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Hero + tool */}
        <section style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0 0' }}>
          <div style={WRAP}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 0.625rem' }}>
              FPS Reaction Test
            </h1>
            <p style={{ ...BODY, fontSize: '1rem', marginBottom: '2rem' }}>
              Test your gaming reflexes. Click when the screen turns green. Five rounds, average result in milliseconds.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <FPSReactionTest />
              </div>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>What Is the FPS Reaction Test?</h2>
            <p style={BODY}>
              The FPS reaction test measures how quickly you respond to a visual stimulus, simulating the moment you spot an enemy in a first-person shooter. It runs five rounds and gives you an average reaction time in milliseconds. The lower your score, the faster your reflexes.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Take the FPS Reaction Test</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px' }}>
              {[
                'Click Start Test',
                'Wait for the screen to turn green',
                'Click as fast as you can when it changes',
                'Complete all 5 rounds',
                'See your average reaction time and rating',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={STEP_NUM}>{i + 1}</div>
                  <p style={{ ...BODY, marginTop: '0.25rem' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benchmarks table */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>FPS Reaction Time Benchmarks</h2>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '380px' }}>
                <thead>
                  <tr>{['Reaction Time', 'Rating', 'Level'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((row, i) => (
                    <tr key={row.range} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row.range}</td>
                      <td style={{ ...TD, color: 'var(--text-primary)', fontWeight: 600 }}>{row.rating}</td>
                      <td style={TD}>{row.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={H3}>Does Higher FPS Improve Reaction Time?</h3>
            <p style={{ ...BODY, maxWidth: '720px' }}>
              Higher FPS reduces the time between your input and the visual feedback on screen. At 60 FPS the maximum frame delay is 16.7ms. At 144 FPS it drops to 6.9ms. This means you can physically react faster because the game shows you updated information more often. Pro players use 240Hz monitors to minimize this delay to 4.2ms.
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

        <RelatedTools toolIds={['fps-test', 'hz-detector', 'ufo-test']} />
      </div>
    </>
  )
}
