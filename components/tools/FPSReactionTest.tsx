'use client'

import { useState, useRef, useCallback } from 'react'

type GameState = 'idle' | 'waiting' | 'ready' | 'clicked' | 'finished'

const ROUNDS = 5

function getRating(avg: number): { label: string; color: string } {
  if (avg < 150) return { label: 'Inhuman — Are you cheating?',  color: '#ff4444' }
  if (avg < 200) return { label: 'Pro Gamer Reflexes',            color: '#00ff88' }
  if (avg < 250) return { label: 'Above Average',                 color: '#aaff00' }
  if (avg < 300) return { label: 'Average',                       color: '#ffaa00' }
  return           { label: 'Keep Practicing',                   color: '#888888' }
}

export default function FPSReactionTest() {
  const [gameState, setGameState]   = useState<GameState>('idle')
  const [round, setRound]           = useState(0)
  const [times, setTimes]           = useState<number[]>([])
  const [lastTime, setLastTime]     = useState<number | null>(null)
  const [tooEarly, setTooEarly]     = useState(false)

  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startRef    = useRef(0)

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }

  const startRound = useCallback(() => {
    setTooEarly(false)
    setGameState('waiting')
    const delay = 1000 + Math.random() * 3000
    timerRef.current = setTimeout(() => {
      setGameState('ready')
      startRef.current = performance.now()
    }, delay)
  }, [])

  const handleStart = () => {
    setTimes([])
    setRound(1)
    setLastTime(null)
    startRound()
  }

  const handleClick = useCallback(() => {
    if (gameState === 'waiting') {
      clearTimer()
      setTooEarly(true)
      setGameState('waiting')
      timerRef.current = setTimeout(() => {
        setTooEarly(false)
        setGameState('waiting')
        const delay = 1000 + Math.random() * 3000
        timerRef.current = setTimeout(() => {
          setGameState('ready')
          startRef.current = performance.now()
        }, delay)
      }, 1000)
      return
    }

    if (gameState === 'ready') {
      const reaction = Math.round(performance.now() - startRef.current)
      setLastTime(reaction)
      const newTimes = [...times, reaction]
      setTimes(newTimes)

      if (newTimes.length >= ROUNDS) {
        setGameState('finished')
      } else {
        setRound(r => r + 1)
        setGameState('clicked')
      }
    }
  }, [gameState, times])

  const nextRound = () => startRound()

  const reset = () => {
    clearTimer()
    setGameState('idle')
    setTimes([])
    setRound(0)
    setLastTime(null)
    setTooEarly(false)
  }

  const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
  const rating = getRating(avg)

  const BTN: React.CSSProperties = {
    backgroundColor: 'var(--accent)', color: 'var(--bg-primary)',
    border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2.5rem',
    fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
  }

  const CARD: React.CSSProperties = {
    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: '0.5rem', padding: '0.75rem 1rem', textAlign: 'center',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem 1rem', minHeight: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {gameState === 'idle' && (
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>FPS Reaction Test</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            When the screen turns green, click as fast as you can. 5 rounds. We measure your average reaction time in milliseconds.
          </p>
          <button onClick={handleStart} style={BTN}>Start Test</button>
        </div>
      )}

      {(gameState === 'waiting' || gameState === 'clicked') && (
        <div
          onClick={handleClick}
          style={{
            width: '100%', maxWidth: '500px', height: '260px',
            backgroundColor: tooEarly ? '#ff444433' : 'var(--bg-secondary)',
            border: `2px solid ${tooEarly ? '#ff4444' : 'var(--border-color)'}`,
            borderRadius: '1rem', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {tooEarly
            ? <p style={{ color: '#ff4444', fontSize: '1.25rem', fontWeight: 700 }}>Too early! Wait for green...</p>
            : gameState === 'clicked'
              ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'var(--accent)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{lastTime}ms</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Round {round - 1} of {ROUNDS}</p>
                  <button onClick={e => { e.stopPropagation(); nextRound() }} style={BTN}>Next Round</button>
                </div>
              )
              : <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Get Ready... Round {round} of {ROUNDS}</p>
          }
        </div>
      )}

      {gameState === 'ready' && (
        <div
          onClick={handleClick}
          style={{
            width: '100%', maxWidth: '500px', height: '260px',
            backgroundColor: '#00ff88',
            borderRadius: '1rem', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', userSelect: 'none',
          }}
        >
          <p style={{ color: '#0a0a0a', fontSize: '2rem', fontWeight: 900 }}>CLICK NOW!</p>
        </div>
      )}

      {gameState === 'finished' && (
        <div style={{ width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Average Reaction Time
          </p>
          <div style={{ color: 'var(--accent)', fontSize: 'clamp(3.5rem, 14vw, 6rem)', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-space-grotesk, monospace)', marginBottom: '0.75rem' }}>
            {avg}ms
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', backgroundColor: 'var(--bg-secondary)', border: `1px solid ${rating.color}40`, marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: rating.color }} />
            <span style={{ color: rating.color, fontSize: '0.875rem', fontWeight: 600 }}>{rating.label}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '2rem' }}>
            {times.map((t, i) => (
              <div key={i} style={CARD}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>R{i + 1}</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9375rem' }}>{t}ms</p>
              </div>
            ))}
          </div>
          <button onClick={reset} style={BTN}>Test Again</button>
        </div>
      )}
    </div>
  )
}
