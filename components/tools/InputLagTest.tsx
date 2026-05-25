'use client'

import { useState, useRef, useCallback } from 'react'

type GameState = 'idle' | 'running' | 'finished'

const ROUNDS = 5

function getRating(avg: number): { label: string; color: string } {
  if (avg < 5)  return { label: 'Excellent browser response',                       color: '#00ff88' }
  if (avg < 10) return { label: 'Good',                                              color: '#aaff00' }
  if (avg < 20) return { label: 'Average',                                           color: '#ffaa00' }
  return          { label: 'High latency — try closing other tabs',                 color: '#ff4444' }
}

export default function InputLagTest() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [times,     setTimes]     = useState<number[]>([])
  const [active,    setActive]    = useState(false)
  const [round,     setRound]     = useState(0)

  const clickedRef = useRef(false)

  const handleMouseDown = useCallback(() => {
    if (gameState !== 'running' || clickedRef.current) return
    clickedRef.current = true
    const t = performance.now()
    setActive(true)
    requestAnimationFrame(() => {
      const lag = Math.round(performance.now() - t)
      setTimes(prev => {
        const next = [...prev, lag]
        if (next.length >= ROUNDS) {
          setGameState('finished')
        } else {
          setRound(next.length + 1)
          setTimeout(() => { setActive(false); clickedRef.current = false }, 400)
        }
        return next
      })
    })
  }, [gameState])

  const start = () => {
    setTimes([])
    setRound(1)
    setActive(false)
    clickedRef.current = false
    setGameState('running')
  }

  const reset = () => { setGameState('idle'); setTimes([]); setRound(0); setActive(false) }

  const avg    = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
  const rating = getRating(avg)

  const BTN: React.CSSProperties = {
    backgroundColor: 'var(--accent)', color: 'var(--bg-primary)',
    border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2.5rem',
    fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
  }
  const CARD: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: '0.5rem', padding: '0.75rem 1rem', textAlign: 'center',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem 1rem', minHeight: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {gameState === 'idle' && (
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Input Lag Test</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Click the target {ROUNDS} times. We measure the time between your mousedown and the visual response to detect browser rendering latency.
          </p>
          <button onClick={start} style={BTN}>Start Test</button>
        </div>
      )}

      {gameState === 'running' && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '480px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
            Round {round} of {ROUNDS} — click the target below
          </p>
          <div
            onMouseDown={handleMouseDown}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              backgroundColor: active ? '#00ff88' : 'var(--bg-secondary)',
              border: `3px solid ${active ? '#00ff88' : 'var(--border-color)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', margin: '0 auto 1.5rem',
              boxShadow: active ? '0 0 24px #00ff8866' : 'none',
              transition: 'background-color 0.05s, box-shadow 0.05s',
              userSelect: 'none',
            }}
          >
            <span style={{ color: active ? '#0a0a0a' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>
              {active ? 'CLICKED' : 'CLICK ME'}
            </span>
          </div>

          {times.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {times.map((t, i) => (
                <div key={i} style={CARD}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.625rem', marginBottom: '0.2rem' }}>R{i + 1}</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.875rem' }}>{t}ms</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div style={{ textAlign: 'center', maxWidth: '480px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Average Latency</p>
          <div style={{ color: 'var(--accent)', fontSize: 'clamp(4rem, 14vw, 7rem)', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-space-grotesk, monospace)', marginBottom: '0.75rem' }}>
            {avg}ms
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', backgroundColor: 'var(--bg-secondary)', border: `1px solid ${rating.color}40`, marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: rating.color }} />
            <span style={{ color: rating.color, fontSize: '0.875rem', fontWeight: 600 }}>{rating.label}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {times.map((t, i) => (
              <div key={i} style={CARD}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginBottom: '0.2rem' }}>R{i + 1}</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.875rem' }}>{t}ms</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '1.5rem', maxWidth: '380px', lineHeight: 1.6 }}>
            This measures browser rendering latency, not hardware input lag. For hardware input lag testing use a high speed camera.
          </p>
          <button onClick={reset} style={BTN}>Test Again</button>
        </div>
      )}
    </div>
  )
}
