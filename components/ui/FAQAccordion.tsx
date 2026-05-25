'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FaqItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '800px' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#111111',
            border: '1px solid #222222',
            borderRadius: '0.625rem',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '1rem 1.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.4 }}>
              {item.question}
            </span>
            <span
              style={{
                color: '#00ff88',
                fontSize: '1.375rem',
                fontWeight: 300,
                flexShrink: 0,
                lineHeight: 1,
                display: 'inline-block',
                transition: 'transform 0.2s ease',
                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <div
              style={{
                padding: '0 1.25rem 1.125rem',
                color: '#aaaaaa',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
              }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
