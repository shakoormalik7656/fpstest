import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Shield, UserX, Globe, Gauge, Monitor, BarChart2, Zap, Tv, MousePointer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FPSMeter from '@/components/tools/FPSMeter'
import FPSGraph from '@/components/ui/FPSGraph'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { TOOLS } from '@/lib/constants'
import ScrollToButton from '@/components/ui/ScrollToButton'

// ── Types ──────────────────────────────────────────────────────────
interface FaqItem {
  question: string
  answer: string
}

const ICON_MAP: Record<string, LucideIcon> = {
  Gauge, Monitor, BarChart2, Zap, Tv, MousePointer,
}

// ── Static data ────────────────────────────────────────────────────
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is an FPS test?',
    answer:
      'An FPS test measures how many frames per second your browser or system renders. Our free fps tester uses requestAnimationFrame to count real frames and shows live results including current FPS, average FPS, min, max, frame time, and stability score.',
  },
  {
    question: 'What is a good FPS for gaming?',
    answer:
      '60 FPS is the minimum for smooth gameplay. Competitive FPS games benefit from 144 FPS or higher. For casual games and browsing, 30-60 FPS is acceptable. Our fps test tool shows you exactly where your system stands.',
  },
  {
    question: 'How do I test my FPS online?',
    answer:
      "Click the Run FPS Test button on this page. The test runs for 10 seconds using your browser's requestAnimationFrame API and shows live frame rate data. No download or signup needed.",
  },
  {
    question: 'What is frame time in an FPS test?',
    answer:
      'Frame time is how long each frame takes to render, measured in milliseconds. At 60 FPS the frame time is 16.7ms. At 144 FPS it drops to 6.9ms. Lower frame time means smoother, more consistent gameplay.',
  },
  {
    question: 'Why is my browser FPS lower than my game FPS?',
    answer:
      "Browser FPS and game FPS are separate. Games use your GPU directly via DirectX or Vulkan. Browsers use a sandboxed rendering engine. A browser fps test tells you about your system's baseline rendering performance, not your in-game performance.",
  },
  {
    question: 'Does higher FPS reduce input lag?',
    answer:
      'Yes. Higher FPS means your system produces frames more frequently, which reduces the time between your input and the visual response on screen. At 144 FPS the theoretical input lag from frame timing alone drops to under 7ms versus 16.7ms at 60 FPS.',
  },
  {
    question: 'What is the UFO FPS test?',
    answer:
      'The UFO FPS test (also called UFO motion test) shows animated objects moving at different frame rates so you can visually compare 30, 60, 120, and 144 FPS smoothness. We are building a free UFO fps test. It will be available on fpstest.pro soon.',
  },
]

const FPS_RANGES = [
  { range: '15–29 FPS',  experience: 'Very choppy, nearly unplayable',        bestFor: 'Casual browsing only' },
  { range: '30–59 FPS',  experience: 'Playable but noticeable lag',            bestFor: 'Casual games, strategy' },
  { range: '60–109 FPS', experience: 'Smooth, good for most games',            bestFor: 'Shooters, action games' },
  { range: '110–144 FPS',experience: 'Very smooth, competitive edge',          bestFor: 'Esports, FPS games' },
  { range: '144+ FPS',   experience: 'Ultra smooth, maximum responsiveness',   bestFor: 'Pro gaming, tournaments' },
]

const MONITOR_CARDS = [
  { hz: '60Hz Monitor',  target: 'Target: 60 FPS',  desc: 'Standard monitors, office screens, budget displays' },
  { hz: '144Hz Monitor', target: 'Target: 144 FPS', desc: 'Gaming monitors, esports setups, mid-range builds' },
  { hz: '240Hz Monitor', target: 'Target: 240 FPS', desc: 'Pro gaming, tournaments, high-end builds' },
]


const AFFECTS_FPS = [
  'GPU (graphics card), the biggest factor in gaming FPS',
  'CPU handles game logic, AI, and physics calculations',
  'RAM speed: faster RAM reduces bottlenecks',
  'Background apps: close Chrome tabs and apps before testing',
  'Display resolution: higher resolution needs more GPU power',
  'Game settings: lower shadows and post-processing for more FPS',
  'Browser: Chrome typically scores highest in browser FPS tests',
]

const TRUST_BADGES = [
  { Icon: Shield, label: 'No Download' },
  { Icon: UserX,  label: 'No Signup' },
  { Icon: Globe,  label: 'Works on PC, Mobile & Tablet' },
]

// ── JSON-LD ────────────────────────────────────────────────────────
const WEB_APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FPS Test',
  url: 'https://fpstest.pro',
  description: 'Free browser-based FPS tester. Check your frame rate, frame time, and stability score instantly.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FPS Test',
  url: 'https://fpstest.pro',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://fpstest.pro/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

// ── Metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'FPS Test — Free Online FPS Tester for PC & Browser',
  description:
    'Run a free FPS test in your browser. Check live frame rate, frame time, stability score and more. No download, no signup. Works on PC, laptop, and mobile.',
  alternates: { canonical: 'https://fpstest.pro' },
  openGraph: {
    title: 'FPS Test — Free Online FPS Tester for PC & Browser',
    description: 'Run a free FPS test in your browser. Check live frame rate, frame time, stability score and more. No download, no signup.',
    url: 'https://fpstest.pro',
  },
}

// ── Shared style tokens ────────────────────────────────────────────
const WRAP: CSSProperties  = { maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }
const CARD: CSSProperties  = { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem' }
const H2_S: CSSProperties  = { color: 'var(--text-primary)', fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem' }
const H3_S: CSSProperties  = { color: 'var(--accent)', fontSize: '1.125rem', fontWeight: 600, margin: '0 0 0.75rem' }
const BODY_S: CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem', margin: 0 }

// ── Page ──────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />

      <div style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* ── S1: HERO ──────────────────────────────────────── */}
        <section className="section-pad" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ ...WRAP, maxWidth: '820px' }}>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 5vw, 3.125rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1.25rem' }}>
              FPS Test - Check Your Real Frame Rate Free
            </h1>
            <p style={{ ...BODY_S, fontSize: '1.0625rem', maxWidth: '640px', marginBottom: '2rem' }}>
              The most accurate browser-based FPS tester. See your live frame rate, frame time, min/max FPS, and stability score. No download, no signup, works on any device.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <Link
                href="/tools/fps-test"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.8rem 2rem', backgroundColor: 'var(--accent)', color: 'var(--bg-primary)',
                  borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none',
                }}
              >
                Run FPS Test →
              </Link>
              <ScrollToButton
                targetId="how-it-works"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', borderRadius: '0.5rem',
                  fontWeight: 500, fontSize: '0.9375rem', background: 'none', cursor: 'pointer',
                }}
              >
                How does it work?
              </ScrollToButton>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {TRUST_BADGES.map(({ Icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.3rem 0.875rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '999px', color: 'var(--accent)',
                    fontSize: '0.75rem', fontWeight: 500,
                  }}
                >
                  <Icon size={12} />
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── S2: TOOL EMBED ────────────────────────────────── */}
        <section className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2_S}>Free FPS Tester - Live Results</h2>
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <FPSMeter />
            </div>
            <p style={{ ...BODY_S, maxWidth: '680px', marginTop: '1.25rem', fontSize: '0.875rem' }}>
              This fps test uses requestAnimationFrame to measure your actual browser rendering speed. Results update in real time and include average fps, minimum fps, maximum fps, frame time in milliseconds, and a stability percentage. The full test runs for 10 seconds and gives you a final performance rating.
            </p>
          </div>
        </section>

        {/* ── S3: WHAT IS FPS ───────────────────────────────── */}
        <section id="how-it-works" className="section-pad">
          <div style={WRAP}>
            <h2 style={H2_S}>What Is FPS and Why Does It Matter for Gaming?</h2>

            <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <p style={BODY_S}>
                FPS stands for frames per second. It measures how many individual images your system renders every second. The higher your FPS, the smoother and more responsive your game feels. A low FPS causes stuttering, lag, and missed shots.
              </p>
              <p style={BODY_S}>
                Most competitive gamers aim for 60 FPS minimum. At 60 FPS, motion feels smooth and input lag drops to acceptable levels. Serious FPS players push for 144 FPS or higher because the difference in responsiveness is real and measurable.
              </p>
              <p style={BODY_S}>
                Your browser FPS reflects how well your system handles rendering tasks. If your browser struggles to hit 60 FPS on a simple canvas test, your games are likely running below their potential too.
              </p>
            </div>

            <h3 style={H3_S}>FPS Ranges Explained</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '480px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-card)' }}>
                    {['FPS Range', 'Experience', 'Best For'].map((h) => (
                      <th key={h} style={{ color: 'var(--accent)', fontWeight: 600, padding: '0.875rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FPS_RANGES.map((row, i) => (
                    <tr key={row.range} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                      <td style={{ color: 'var(--accent)', fontWeight: 700, padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
                        {row.range}
                      </td>
                      <td style={{ color: 'var(--text-secondary)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                        {row.experience}
                      </td>
                      <td style={{ color: 'var(--text-secondary)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                        {row.bestFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── S4: HOW TO TEST FPS ───────────────────────────── */}
        <section className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2_S}>How to Test Your FPS Online</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                'Click the Run FPS Test button above',
                'Wait 10 seconds while the tool measures your frame rate',
                'See your live FPS, frame time, min, max, and stability score',
                'Get your performance rating and share your result',
              ].map((step, i) => (
                <div key={i} style={{ ...CARD, padding: '1.25rem' }}>
                  <div style={{
                    width: '2rem', height: '2rem', borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem',
                  }}>
                    <span style={{ color: 'var(--accent)', fontSize: '0.8125rem', fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <p style={BODY_S}>{step}</p>
                </div>
              ))}
            </div>

            <h3 style={H3_S}>How to Test FPS in Games</h3>
            <p style={{ ...BODY_S, maxWidth: '760px' }}>
              Most games have a built-in FPS counter. In Steam games press Shift+Tab and enable the FPS overlay. In Valorant type /fps in console. In Fortnite go to Settings, Video, then enable Show FPS. For any game, you can also use MSI Afterburner or the Windows Xbox Game Bar (Win+G) to display an FPS overlay.
            </p>
          </div>
        </section>

        {/* ── S4.5: FPS GRAPH ───────────────────────────────── */}
        <section className="section-pad">
          <div style={WRAP}>
            <h2 style={H2_S}>What Real FPS Data Looks Like</h2>
            <p style={{ ...BODY_S, maxWidth: '680px', marginBottom: '1.5rem' }}>
              This is how frame rate behaves during a real gaming session. Notice the occasional dips when the system is under load.
            </p>
            <div style={{ ...CARD, padding: '1.5rem' }}>
              <FPSGraph />
            </div>
          </div>
        </section>

        {/* ── S5: FPS BENCHMARKS ────────────────────────────── */}
        <section className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div style={WRAP}>
            <h2 style={H2_S}>FPS Benchmarks by Monitor Type</h2>
            <p style={{ ...BODY_S, maxWidth: '720px', marginBottom: '2rem' }}>
              Your monitor refresh rate sets the ceiling for useful FPS. Running 200 FPS on a 60Hz monitor wastes GPU power because your screen can only show 60 frames per second anyway. Match your FPS target to your monitor.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {MONITOR_CARDS.map(({ hz, target, desc }) => (
                <div key={hz} style={{ ...CARD, padding: '1.5rem', borderTop: '3px solid var(--accent)' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', margin: '0 0 0.375rem' }}>{hz}</p>
                  <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 0 0.625rem' }}>{target}</p>
                  <p style={{ ...BODY_S, fontSize: '0.875rem' }}>{desc}</p>
                </div>
              ))}
            </div>

            <h3 style={H3_S}>What Affects Your FPS?</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '720px' }}>
              {AFFECTS_FPS.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1em' }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── S6: TOOLS GRID ────────────────────────────────── */}
        <section className="section-pad" id="tools">
          <div style={WRAP}>
            <h2 style={H2_S}>More Free Gaming Performance Tests</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {TOOLS.filter(t => t.id !== 'fps-test').map((tool) => {
                const Icon = ICON_MAP[tool.icon] ?? Gauge
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="tool-card" style={{ ...CARD, padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                      <div style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.375rem' }}>{tool.name}</p>
                      <p style={{ ...BODY_S, fontSize: '0.875rem' }}>{tool.desc}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── S7: FAQ ───────────────────────────────────────── */}
        <section className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: 'none' }}>
          <div style={WRAP}>
            <h2 style={{ ...H2_S, margin: '0 0 2rem' }}>Frequently Asked Questions</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

      </div>
    </>
  )
}
