'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type GameState = 'idle' | 'running' | 'finished'

const STANDARD_HZ = [60, 75, 120, 144, 165, 240]
const MEASURE_DURATION = 3000

function snapHz(raw: number): number {
  return STANDARD_HZ.reduce((prev, curr) =>
    Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev
  )
}

function getRating(hz: number): string {
  if (hz >= 240) return 'High-end gaming monitor'
  if (hz >= 144) return 'Gaming monitor'
  if (hz >= 75)  return 'Mid-range display'
  if (hz >= 60)  return 'Standard display'
  return 'Older display'
}

export default function HzDetector() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [timeLeft, setTimeLeft]   = useState(3)
  const [rawHz,    setRawHz]      = useState(0)
  const [snapHz_,  setSnapHz]     = useState(0)

  const rafRef        = useRef<number | null>(null)
  const frameCount    = useRef(0)
  const startTime     = useRef(0)
  const lastTickRef   = useRef(0)

  const cancel = useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }, [])

  useEffect(() => () => cancel(), [cancel])

  const startTest = useCallback(() => {
    cancel()
    frameCount.current = 0
    startTime.current  = 0
    setTimeLeft(3)
    setGameState('running')

    const loop = (ts: number) => {
      if (!startTime.current) startTime.current = ts
      frameCount.current++

      const elapsed = ts - startTime.current
      const tl = Math.max(0, Math.ceil((MEASURE_DURATION - elapsed) / 1000))
      if (tl !== lastTickRef.current) {
        lastTickRef.current = tl
        setTimeLeft(tl)
      }

      if (elapsed >= MEASURE_DURATION) {
        const raw     = frameCount.current / (elapsed / 1000)
        const snapped = snapHz(raw)
        setRawHz(Math.round(raw * 10) / 10)
        setSnapHz(snapped)
        setGameState('finished')
        return
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [cancel])

  const reset = useCallback(() => { cancel(); setGameState('idle') }, [cancel])

  const BTN: React.CSSProperties = {
    backgroundColor: 'var(--accent)', color: 'var(--bg-primary)',
    border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2.5rem',
    fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
  }
  const CARD: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: '0.5rem', padding: '0.875rem 1rem', textAlign: 'center',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem 1rem', minHeight: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {gameState === 'idle' && (
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Monitor Hz Detector</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Counts real frames over 3 seconds using requestAnimationFrame to detect your actual screen refresh rate. No software needed.
          </p>
          <button onClick={startTest} style={BTN}>Detect My Hz</button>
        </div>
      )}

      {gameState === 'running' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Measuring...
          </p>
          <div style={{ color: 'var(--accent)', fontSize: 'clamp(5rem, 18vw, 8rem)', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-space-grotesk, monospace)', marginBottom: '0.5rem' }}>
            {timeLeft}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>seconds remaining — keep this tab active</p>
        </div>
      )}

      {gameState === 'finished' && (
        <div style={{ textAlign: 'center', maxWidth: '480px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Your Refresh Rate
          </p>
          <div style={{ color: 'var(--accent)', fontSize: 'clamp(4rem, 14vw, 7rem)', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-space-grotesk, monospace)', marginBottom: '0.25rem' }}>
            {snapHz_} Hz
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            {getRating(snapHz_)}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={CARD}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>Detected</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem' }}>{snapHz_} Hz</p>
            </div>
            <div style={CARD}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>Raw Measurement</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem' }}>{rawHz} Hz</p>
            </div>
          </div>
          <button onClick={reset} style={BTN}>Test Again</button>
        </div>
      )}
    </div>
  )
}
