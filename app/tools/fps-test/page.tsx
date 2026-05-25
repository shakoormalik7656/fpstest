import type { Metadata } from 'next'
import FPSMeter from '@/components/tools/FPSMeter'

export const metadata: Metadata = {
  title: 'FPS Test - Check Your Real Browser FPS Online',
  description:
    'FPS Test your browser instantly. See live FPS, frame time, stability and more. Free online FPS tester — no download needed.',
  alternates: {
    canonical: 'https://fpstest.pro/tools/fps-test',
  },
  openGraph: {
    title: 'FPS Test - Check Your Real Browser FPS Online',
    description:
      'FPS Test your browser instantly. See live FPS, frame time, stability and more. Free online FPS tester — no download needed.',
    url: 'https://fpstest.pro/tools/fps-test',
  },
}

export default function FPSTestPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2.5rem 1rem 0' }}>
        <h1
          style={{
            color: '#ffffff',
            fontSize: '1.875rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          FPS Test
        </h1>
        <p style={{ color: '#888888', fontSize: '0.9375rem', marginBottom: '0' }}>
          Check your real browser frame rate. No download, no signup.
        </p>
      </div>
      <FPSMeter />
    </div>
  )
}
