import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Gauge, Monitor, BarChart2, Zap, Tv, MousePointer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TOOLS } from '@/lib/constants'

const ICON_MAP: Record<string, LucideIcon> = {
  Gauge, Monitor, BarChart2, Zap, Tv, MousePointer,
}

export const metadata: Metadata = {
  title: 'All FPS Testing Tools — Free Browser Gaming Tests',
  description:
    'Six free browser-based FPS and gaming performance tools. FPS meter, UFO motion test, frame comparison, reaction test, Hz detector and input lag test.',
  alternates: { canonical: 'https://fpstest.pro/tools' },
  openGraph: {
    title: 'All FPS Testing Tools — Free Browser Gaming Tests',
    description:
      'Six free browser-based FPS and gaming performance tools. FPS meter, UFO motion test, frame comparison, reaction test, Hz detector and input lag test.',
    url: 'https://fpstest.pro/tools',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const COLLECTION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free FPS Testing Tools',
  description: 'Six free browser-based FPS and gaming performance tools.',
  url: 'https://fpstest.pro/tools',
  hasPart: TOOLS.map(tool => ({
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.desc,
    url: `https://fpstest.pro${tool.href}`,
    applicationCategory: 'GameApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
}

const WRAP: CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: '0 1.25rem' }
const CARD: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '0.75rem',
}

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section style={{ padding: '3rem 0 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={WRAP}>
          <h1
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 1rem',
            }}
          >
            Free FPS Testing Tools
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: 0,
            }}
          >
            All tools run in your browser. No download, no signup, instant results.
          </p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0' }}>
        <div style={WRAP}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {TOOLS.map((tool) => {
              const Icon = ICON_MAP[tool.icon] ?? Gauge
              return (
                <Link key={tool.id} href={tool.href} style={{ textDecoration: 'none' }}>
                  <div
                    className="tool-card"
                    style={{ ...CARD, padding: '1.5rem', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  >
                    <div style={{ marginBottom: '0.875rem', color: 'var(--accent)' }}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <p
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {tool.name}
                    </p>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
