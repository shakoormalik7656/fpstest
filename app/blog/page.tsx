import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-posts/index'

export const metadata: Metadata = {
  title: 'FPS Gaming Blog — Tips, Tests and Benchmarks',
  description:
    'Free guides on FPS testing, monitor refresh rates, reaction time, and gaming performance. Written for gamers by gamers.',
  alternates: { canonical: 'https://fpstest.pro/blog' },
  openGraph: {
    title: 'FPS Gaming Blog — Tips, Tests and Benchmarks',
    description:
      'Free guides on FPS testing, monitor refresh rates, reaction time, and gaming performance. Written for gamers by gamers.',
    url: 'https://fpstest.pro/blog',
  },
}

const BLOG_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'FPS Gaming Blog',
  description: 'Free guides on FPS testing, monitor refresh rates, reaction time, and gaming performance.',
  url: 'https://fpstest.pro/blog',
  itemListElement: BLOG_POSTS.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: post.title,
    url: `https://fpstest.pro/blog/${post.slug}`,
  })),
}

const WRAP: CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 1.25rem' }

const CARD: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  display: 'block',
  textDecoration: 'none',
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_LIST_SCHEMA) }} />
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="section-pad">
        <div style={WRAP}>
          <h1
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: '0 0 0.75rem',
            }}
          >
            FPS Gaming Blog
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              margin: '0 0 3rem',
              maxWidth: '560px',
            }}
          >
            Guides, benchmarks, and tips to help you get the most out of your gaming setup.
          </p>

          {BLOG_POSTS.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              First post coming soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {BLOG_POSTS.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="tool-card" style={CARD}>
                    <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h2
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          lineHeight: 1.4,
                          margin: '0 0 0.625rem',
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  )
}
