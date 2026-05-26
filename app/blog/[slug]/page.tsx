import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import FAQAccordion from '@/components/ui/FAQAccordion'
import RelatedTools from '@/components/ui/RelatedTools'
import { getBlogPost, BLOG_POSTS } from '@/lib/blog-posts/index'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://fpstest.pro/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://fpstest.pro/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.lastModified,
      images: [
        {
          url: `https://fpstest.pro${post.heroImage}`,
          width: 1920,
          height: 1080,
          alt: post.heroAlt,
        },
      ],
    },
  }
}

const WRAP: CSSProperties = { maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }

const H2_S: CSSProperties = {
  color: 'var(--text-primary)',
  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: '0 0 1rem',
}

const H3_S: CSSProperties = {
  color: 'var(--accent)',
  fontSize: '1.0625rem',
  fontWeight: 600,
  margin: '1.5rem 0 0.625rem',
}

const BODY_S: CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.75,
  fontSize: '0.9375rem',
  margin: '0 0 0.875rem',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fpstest.pro' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://fpstest.pro/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://fpstest.pro/blog/${post.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: `https://fpstest.pro${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.lastModified,
    author: { '@type': 'Organization', name: 'FPS Test', url: 'https://fpstest.pro' },
    publisher: { '@type': 'Organization', name: 'FPS Test', url: 'https://fpstest.pro' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Hero image */}
        <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Post header */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '2.5rem 1.25rem 0',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: '0 0 0.75rem' }}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h1
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: '0 0 1rem',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '2.5rem',
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {/* Body sections */}
        {post.sections.map((section, i) => (
          <section
            key={i}
            style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--border-color)' }}
          >
            <div style={WRAP}>
              <h2 style={H2_S}>{section.heading}</h2>
              <p style={BODY_S}>{section.content}</p>

              {section.subSections?.map((sub, j) => (
                <div key={j}>
                  <h3 style={H3_S}>{sub.heading}</h3>
                  <p style={BODY_S}>{sub.content}</p>
                </div>
              ))}

              {section.table && (
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.9rem',
                      minWidth: '480px',
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-card)' }}>
                        {section.table.headers.map(h => (
                          <th
                            key={h}
                            style={{
                              color: 'var(--accent)',
                              fontWeight: 600,
                              padding: '0.875rem 1rem',
                              textAlign: 'left',
                              borderBottom: '1px solid var(--border-color)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          style={{
                            backgroundColor:
                              ri % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)',
                          }}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              style={{
                                color: ci === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                                fontWeight: ci === 0 ? 600 : 400,
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid var(--border-color)',
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* FAQ section */}
        <section
          style={{
            padding: '3rem 0',
            borderBottom:
              post.relatedToolIds && post.relatedToolIds.length > 0
                ? '1px solid var(--border-color)'
                : 'none',
          }}
        >
          <div style={WRAP}>
            <h2 style={{ ...H2_S, margin: '0 0 1.5rem' }}>Frequently Asked Questions</h2>
            <FAQAccordion items={post.faqs} />
          </div>
        </section>

        {/* Related Tools */}
        {post.relatedToolIds && post.relatedToolIds.length > 0 && (
          <RelatedTools toolIds={post.relatedToolIds} />
        )}
      </article>
    </>
  )
}
