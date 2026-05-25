'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Target } from 'lucide-react'

type GameState = 'idle' | 'running' | 'finished'

interface FPSStats {
  current: number
  average: number
  min: number
  max: number
  frameTime: number
  stability: number
  totalFrames: number
  timeLeft: number
}

interface Rating {
  label: string
  color: string
  bg: string
}

const TEST_DURATION_MS   = 10_000
const UPDATE_INTERVAL_MS = 500

const DEFAULT_STATS: FPSStats = {
  current: 0, average: 0, min: 0, max: 0,
  frameTime: 0, stability: 100, totalFrames: 0, timeLeft: 10,
}

function calcStability(readings: number[]): number {
  if (readings.length < 2) return 100
  const mean = readings.reduce((a, b) => a + b, 0) / readings.length
  if (mean === 0) return 100
  const variance = readings.reduce((acc, v) => acc + (v - mean) ** 2, 0) / readings.length
  return Math.max(0, Math.round(100 - (Math.sqrt(variance) / mean) * 100))
}

function getRating(fps: number): Rating {
  if (fps >= 110) return { label: 'Excellent: Ultra smooth gaming',           color: '#00ff88', bg: '#0d1f15' }
  if (fps >= 60)  return { label: 'Good: Smooth for most games',              color: '#aaff00', bg: '#141a00' }
  if (fps >= 30)  return { label: 'Average: May feel choppy in fast games',   color: '#ffaa00', bg: '#1f1500' }
  return           { label: 'Low: Close background apps and retry',           color: '#ff4444', bg: '#1f0d0d' }
}

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid #1e3a2a',
  borderRadius: '0.5rem',
  padding: '0.875rem 1rem',
  textAlign: 'center',
}

const LABEL_STYLE: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '0.375rem',
}

const VALUE_STYLE: React.CSSProperties = {
  color: 'var(--text-primary)',
  fontSize: '1.125rem',
  fontWeight: 600,
  fontFamily: 'var(--font-space-grotesk, monospace)',
}

const BTN_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--accent)',
  color: 'var(--bg-primary)',
  border: 'none',
  borderRadius: '0.5rem',
  padding: '0.875rem 2.5rem',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.15s',
}

export default function FPSMeter() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [stats, setStats]         = useState<FPSStats>(DEFAULT_STATS)
  const [pulseKey, setPulseKey]   = useState(0)

  const rafIdRef          = useRef<number | null>(null)
  const frameCountRef     = useRef(0)
  const intervalFramesRef = useRef(0)
  const startTimeRef      = useRef(0)
  const lastUpdateRef     = useRef(0)
  const readingsRef       = useRef<number[]>([])
  const minRef            = useRef(Infinity)
  const maxRef            = useRef(0)

  const cancelLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  useEffect(() => () => cancelLoop(), [cancelLoop])

  const startTest = useCallback(() => {
    cancelLoop()
    frameCountRef.current     = 0
    intervalFramesRef.current = 0
    readingsRef.current       = []
    minRef.current            = Infinity
    maxRef.current            = 0

    const now = performance.now()
    startTimeRef.current  = now
    lastUpdateRef.current = now

    setStats(DEFAULT_STATS)
    setGameState('running')

    const loop = (ts: number) => {
      frameCountRef.current++
      intervalFramesRef.current++

      const elapsed         = ts - startTimeRef.current
      const intervalElapsed = ts - lastUpdateRef.current

      if (elapsed >= TEST_DURATION_MS) {
        const readings = readingsRef.current
        const avg = readings.length > 0
          ? readings.reduce((a, b) => a + b, 0) / readings.length
          : frameCountRef.current / (elapsed / 1000)
        const safeAvg = Math.round(avg)
        const min = minRef.current === Infinity ? safeAvg : Math.round(minRef.current)
        const max = maxRef.current > 0 ? Math.round(maxRef.current) : safeAvg

        setStats({
          current: safeAvg, average: safeAvg, min, max,
          frameTime:   avg > 0 ? Math.round((1000 / avg) * 10) / 10 : 0,
          stability:   calcStability(readings),
          totalFrames: frameCountRef.current,
          timeLeft:    0,
        })
        setGameState('finished')
        return
      }

      if (intervalElapsed >= UPDATE_INTERVAL_MS) {
        const fps = Math.round((intervalFramesRef.current / intervalElapsed) * 1000)
        intervalFramesRef.current = 0
        lastUpdateRef.current     = ts

        if (fps > 0) {
          readingsRef.current.push(fps)
          if (fps < minRef.current) minRef.current = fps
          if (fps > maxRef.current) maxRef.current = fps
        }

        const readings = readingsRef.current
        const avg = readings.length > 0
          ? readings.reduce((a, b) => a + b, 0) / readings.length
          : 0

        setStats({
          current:     fps,
          average:     Math.round(avg),
          min:         minRef.current === Infinity ? fps : Math.round(minRef.current),
          max:         Math.round(maxRef.current),
          frameTime:   fps > 0 ? Math.round((1000 / fps) * 10) / 10 : 0,
          stability:   calcStability(readings),
          totalFrames: frameCountRef.current,
          timeLeft:    Math.max(0, Math.ceil((TEST_DURATION_MS - elapsed) / 1000)),
        })
        setPulseKey(k => k + 1)
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)
  }, [cancelLoop])

  const reset = useCallback(() => {
    cancelLoop()
    setStats(DEFAULT_STATS)
    setGameState('idle')
  }, [cancelLoop])

  const rating = getRating(stats.average)

  const runningCards = [
    { label: 'Avg FPS',    value: stats.average > 0   ? String(stats.average)           : '--' },
    { label: 'Min FPS',    value: stats.min > 0        ? String(stats.min)               : '--' },
    { label: 'Max FPS',    value: stats.max > 0        ? String(stats.max)               : '--' },
    { label: 'Frame Time', value: stats.frameTime > 0  ? `${stats.frameTime}ms`          : '--' },
    { label: 'Stability',  value: `${stats.stability}%` },
    { label: 'Frames',     value: String(stats.totalFrames) },
    { label: 'Time Left',  value: `${stats.timeLeft}s` },
  ]

  const finishedCards = [
    { label: 'Average FPS',  value: String(stats.average) },
    { label: 'Min FPS',      value: String(stats.min) },
    { label: 'Max FPS',      value: String(stats.max) },
    { label: 'Frame Time',   value: `${stats.frameTime}ms` },
    { label: 'Stability',    value: `${stats.stability}%` },
    { label: 'Total Frames', value: String(stats.totalFrames) },
  ]

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1rem', minHeight: '55vh',
    }}>
      <style>{`
        @keyframes fps-pop {
          0%   { opacity: 1; transform: scale(1); }
          40%  { opacity: 0.75; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .fps-pop { animation: fps-pop 0.25s ease-out; }
      `}</style>

      {/* IDLE */}
      {gameState === 'idle' && (
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>
            <Target size={48} strokeWidth={1.5} />
          </div>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem' }}>
            FPS Meter
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Measures your actual browser frame rate using requestAnimationFrame.
            The test runs for 10 seconds and shows live stats as it goes.
          </p>
          <button
            onClick={startTest}
            style={BTN_STYLE}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start FPS Test
          </button>
        </div>
      )}

      {/* RUNNING */}
      {gameState === 'running' && (
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
              Current FPS
            </p>
            <div
              key={pulseKey}
              className="fps-pop"
              style={{
                color: 'var(--accent)',
                fontSize: 'clamp(5rem, 18vw, 8.5rem)',
                fontWeight: 800, lineHeight: 1,
                fontFamily: 'var(--font-space-grotesk, monospace)',
                letterSpacing: '-0.04em',
              }}
            >
              {stats.current > 0 ? stats.current : '--'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.625rem' }}>
            {runningCards.map(({ label, value }) => (
              <div key={label} style={CARD_STYLE}>
                <p style={LABEL_STYLE}>{label}</p>
                <p style={VALUE_STYLE}>{value}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.5rem' }}>
            Keep this tab active for accurate results
          </p>
        </div>
      )}

      {/* FINISHED */}
      {gameState === 'finished' && (
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
              Your Average FPS
            </p>
            <div style={{
              color: 'var(--accent)',
              fontSize: 'clamp(4.5rem, 16vw, 8rem)',
              fontWeight: 800, lineHeight: 1,
              fontFamily: 'var(--font-space-grotesk, monospace)',
              letterSpacing: '-0.04em', marginBottom: '1rem',
            }}>
              {stats.average}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', borderRadius: '999px',
              backgroundColor: rating.bg, border: `1px solid ${rating.color}40`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: rating.color, flexShrink: 0 }} />
              <span style={{ color: rating.color, fontSize: '0.875rem', fontWeight: 600 }}>{rating.label}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.625rem', marginBottom: '2rem' }}>
            {finishedCards.map(({ label, value }) => (
              <div key={label} style={CARD_STYLE}>
                <p style={LABEL_STYLE}>{label}</p>
                <p style={VALUE_STYLE}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={reset}
              style={BTN_STYLE}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Test Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
