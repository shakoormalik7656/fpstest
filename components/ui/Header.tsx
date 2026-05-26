'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { TOOLS } from '@/lib/constants'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', position: 'relative', zIndex: 50 }}>
      <style>{`
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-link:hover { color: var(--text-primary); }
        .tools-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 0.625rem;
          padding: 0.5rem;
          min-width: 280px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .dropdown-item {
          display: block;
          padding: 0.625rem 0.75rem;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: background 0.12s;
        }
        .dropdown-item:hover { background: var(--bg-secondary); }
        .dropdown-item-name {
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.125rem;
        }
        .dropdown-item-desc {
          color: var(--text-muted);
          font-size: 0.75rem;
          margin: 0;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Image
            src="/favicon.png"
            alt="FPS Test logo"
            width={32}
            height={32}
            style={{ borderRadius: '0.375rem' }}
            priority
          />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.125rem', letterSpacing: '-0.025em' }}>
            FPS Test
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Tools dropdown — desktop */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
            >
              Tools
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '1px' }}>▾</span>
            </button>
            {open && (
              <div className="tools-dropdown">
                {TOOLS.map(tool => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    <p className="dropdown-item-name">{tool.name}</p>
                    <p className="dropdown-item-desc">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="nav-link">Blog</Link>
          <ThemeToggle />
          <Link
            href="/tools/fps-test"
            style={{
              fontSize: '0.875rem', fontWeight: 700,
              padding: '0.5rem 1rem', borderRadius: '0.375rem',
              textDecoration: 'none',
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            Start Testing
          </Link>
        </nav>
      </div>
    </header>
  )
}
