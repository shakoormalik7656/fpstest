import Link from 'next/link'
import { Gauge, Monitor, BarChart2, Zap, Tv, MousePointer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TOOLS } from '@/lib/constants'

const ICON_MAP: Record<string, LucideIcon> = {
  Gauge, Monitor, BarChart2, Zap, Tv, MousePointer,
}

interface Props {
  toolIds: string[]
}

const CARD: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '0.75rem',
  padding: '1.25rem',
}

export default function RelatedTools({ toolIds }: Props) {
  const tools = toolIds
    .map(id => TOOLS.find(t => t.id === id))
    .filter(Boolean) as typeof TOOLS

  return (
    <section style={{ padding: '3rem 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
          Related Tools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {tools.map(tool => {
            const Icon = ICON_MAP[tool.icon] ?? Gauge
            return (
              <Link key={tool.id} href={tool.href} style={{ textDecoration: 'none' }}>
                <div style={{ ...CARD, cursor: 'pointer', transition: 'border-color 0.15s' }}>
                  <div style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.375rem' }}>
                    {tool.name}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>
                    {tool.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
