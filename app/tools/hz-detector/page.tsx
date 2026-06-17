import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import HzDetector from '@/components/tools/HzDetector'
import RelatedTools from '@/components/ui/RelatedTools'

export const metadata: Metadata = {
  title: 'Refresh Rate Test — Check Your Monitor Hz Online (Free)',
  description:
    'Free refresh rate test and monitor Hz test. Detect your real screen refresh rate (60, 120, 144, 240, 360Hz) in seconds. Works in any browser, no download needed.',
  alternates: { canonical: 'https://fpstest.pro/tools/hz-detector' },
  openGraph: {
    title: 'Refresh Rate Test — Check Your Monitor Hz Online (Free)',
    description:
      'Free refresh rate test and monitor Hz test. Detect your real screen refresh rate (60, 120, 144, 240, 360Hz) in seconds. Works in any browser, no download needed.',
    url: 'https://fpstest.pro/tools/hz-detector',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const FAQ_ITEMS = [
  {
    question: 'How do I check my monitor refresh rate?',
    answer:
      'Use the Monitor Hz Detector on this page. It measures your actual screen refresh rate using requestAnimationFrame in your browser. You can also check in Windows by right-clicking the desktop, selecting Display Settings, then Advanced Display.',
  },
  {
    question: 'What is the difference between Hz and FPS?',
    answer:
      'Hz is your monitor\'s refresh rate (hardware limit). FPS is how many frames your GPU produces per second. If your GPU produces 200 FPS but your monitor is 60Hz, you only see 60 frames per second. They need to match for best performance.',
  },
  {
    question: 'Is 144Hz worth it over 60Hz?',
    answer:
      'For gaming yes, especially fast-paced games. The difference in smoothness and input lag is clearly noticeable. For office work and video watching, 60Hz is sufficient.',
  },
  {
    question: 'How accurate is this online Hz test?',
    answer:
      'Very accurate for confirming your real refresh rate. It counts actual rendered frames over 3 seconds and snaps to the nearest standard rate (60, 90, 120, 144, 165, 240, 360Hz). For the best reading, keep the tab active, close heavy apps, and plug in your laptop.',
  },
  {
    question: 'Why does the refresh rate test show 60Hz on my 144Hz monitor?',
    answer:
      'The most common reasons are Windows display settings still set to 60Hz, a slow cable (HDMI 1.4 caps high resolutions at 60Hz, use DisplayPort), a laptop on battery throttling the browser, or outdated GPU drivers. Fix those and run the test again.',
  },
  {
    question: 'Can I test my phone or laptop refresh rate?',
    answer:
      'Yes. This Hz test works on any device with a browser, including Android and iPhone. Many phones default to 60Hz to save battery even on 90Hz or 120Hz panels, so enable high refresh rate in display settings before testing.',
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
    { '@type': 'ListItem', position: 3, name: 'Monitor Hz Detector', item: 'https://fpstest.pro/tools/hz-detector' },
  ],
}

const HZ_TABLE = [
  { hz: '60Hz',  frameTime: '16.7ms', bestFor: 'Office work, casual use' },
  { hz: '75Hz',  frameTime: '13.3ms', bestFor: 'Budget gaming monitors' },
  { hz: '120Hz', frameTime: '8.3ms',  bestFor: 'Console gaming, mid-range' },
  { hz: '144Hz', frameTime: '6.9ms',  bestFor: 'PC gaming, esports' },
  { hz: '165Hz', frameTime: '6.1ms',  bestFor: 'High refresh gaming' },
  { hz: '240Hz', frameTime: '4.2ms',  bestFor: 'Competitive esports' },
  { hz: '360Hz', frameTime: '2.8ms',  bestFor: 'Pro tournament play' },
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

export default function HzDetectorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Hero + tool */}
        <section style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0 0' }}>
          <div style={WRAP}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 0.625rem' }}>
              Refresh Rate Test (Monitor Hz Test)
            </h1>
            <p style={{ ...BODY, fontSize: '1rem', marginBottom: '2rem' }}>
              Run a free refresh rate test to detect your real monitor Hz in 3 seconds. This online Hz test counts your screen&apos;s actual refresh cycles and works on any monitor, laptop, or phone. No software, no download.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <HzDetector />
              </div>
            </div>
          </div>
        </section>

        {/* What is Hz */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>What Is Monitor Hz?</h2>
            <p style={BODY}>
              Hz (hertz) is your monitor's refresh rate, meaning how many times per second your screen updates the image. A 60Hz monitor refreshes 60 times per second. A 144Hz monitor refreshes 144 times per second. Higher Hz means smoother motion, lower input lag, and a more responsive feel in games.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Use the Monitor Hz Detector</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px' }}>
              {[
                'Click Detect My Hz',
                'Wait 3 seconds while the tool counts your screen refresh cycles',
                'See your detected refresh rate',
                "Compare it to your monitor's advertised spec",
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={STEP_NUM}>{i + 1}</div>
                  <p style={{ ...BODY, marginTop: '0.25rem' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hz comparison table */}
        <section style={SEC}>
          <div style={WRAP}>
            <h2 style={H2}>Monitor Hz Comparison</h2>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '360px' }}>
                <thead>
                  <tr>{['Refresh Rate', 'Frame Time', 'Best For'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {HZ_TABLE.map((row, i) => (
                    <tr key={row.hz} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={TD_A}>{row.hz}</td>
                      <td style={{ ...TD, color: 'var(--text-primary)', fontWeight: 600 }}>{row.frameTime}</td>
                      <td style={TD}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={H3}>Why Is My Detected Hz Lower Than Expected?</h3>
            <p style={{ ...BODY, maxWidth: '720px' }}>
              If your monitor is rated at 144Hz but the detector shows 60Hz, check these things: your GPU cable (HDMI 1.4 caps at 60Hz for high res, use DisplayPort), your Windows display settings (right click desktop, Display Settings, Advanced Display, set refresh rate manually), and whether your GPU drivers are updated.
            </p>
          </div>
        </section>

        {/* How to check on any device */}
        <section style={{ ...SEC, backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2}>How to Check Your Refresh Rate on Any Device</h2>
            <p style={{ ...BODY, marginBottom: '1.5rem' }}>
              The fastest way is the refresh rate test above, which works everywhere. You can also confirm it in your system settings:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Windows 11 / 10:</strong> Right click the desktop, open Display Settings, scroll to Advanced Display, and read the Refresh Rate. Set it to your monitor&apos;s maximum if it is lower.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Mac:</strong> Open System Settings, go to Displays, hold Option and click Refresh Rate to see all supported rates.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>Android:</strong> Settings, Display, then Refresh Rate or Smoothness. Many phones default to 60Hz to save battery even on 90Hz and 120Hz panels.</p>
              <p style={BODY}><strong style={{ color: 'var(--text-primary)' }}>iPhone:</strong> ProMotion iPhones (Pro models) run up to 120Hz. There is no manual Hz toggle, but the refresh rate test above will read it live.</p>
            </div>
            <p style={{ ...BODY, marginTop: '1.5rem', maxWidth: '720px' }}>
              Want to see the difference your refresh rate makes? Try the <Link href="/tools/ufo-test" style={{ color: 'var(--accent)' }}>UFO motion test</Link> to watch 60, 120, and 144 FPS side by side.
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

        <RelatedTools toolIds={['fps-test', 'ufo-test', 'fps-reaction-test']} />
      </div>
    </>
  )
}
