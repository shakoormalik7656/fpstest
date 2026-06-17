'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface TrackDef {
  label: string
  fps: number
}

const TRACKS: TrackDef[] = [
  { label: '30 FPS',  fps: 30  },
  { label: '60 FPS',  fps: 60  },
  { label: '120 FPS', fps: 120 },
  { label: '144 FPS', fps: 144 },
]

const BALL_SIZE   = 20
const TRACK_W_PCT = 0.92
const STD_RATES   = [50, 60, 75, 90, 100, 120, 144, 165, 200, 240, 280, 360, 480]

// Snap a measured Hz value to the closest standard refresh rate when it is within ~6%.
function snapHz(raw: number): number {
  let best = Math.round(raw)
  let bestDiff = Infinity
  for (const r of STD_RATES) {
    const diff = Math.abs(r - raw)
    if (diff < bestDiff) { bestDiff = diff; best = r }
  }
  return bestDiff / raw <= 0.06 ? best : Math.round(raw)
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export default function UFOTest() {
  const [running, setRunning]       = useState(true)
  const [positions, setPositions]   = useState<number[]>([0, 0, 0, 0])
  const [speed, setSpeed]           = useState(720) // pixels per second
  const [detectedHz, setDetectedHz] = useState<number | null>(null)

  const containerRef  = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number | null>(null)
  const lastTimesRef  = useRef<number[]>([0, 0, 0, 0])
  const posRef        = useRef<number[]>([0, 0, 0, 0])
  const runningRef    = useRef(true)
  const speedRef      = useRef(speed)
  const deltasRef     = useRef<number[]>([])
  const lastFrameRef  = useRef(0)
  const lastHzCalcRef = useRef(0)

  speedRef.current = speed

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    stop()
    runningRef.current = true
    lastFrameRef.current = 0
    const loop = (ts: number) => {
      if (!runningRef.current) return

      // Live refresh-rate detection from raw rAF frame intervals.
      if (lastFrameRef.current !== 0) {
        const d = ts - lastFrameRef.current
        if (d > 0 && d < 100) deltasRef.current.push(d)
        if (deltasRef.current.length > 180) deltasRef.current.shift()
      }
      lastFrameRef.current = ts
      if (ts - lastHzCalcRef.current >= 500 && deltasRef.current.length >= 10) {
        lastHzCalcRef.current = ts
        const med = median(deltasRef.current)
        if (med > 0) setDetectedHz(snapHz(1000 / med))
      }

      const width = containerRef.current?.clientWidth ?? 600
      const trackW = width * TRACK_W_PCT
      const range = trackW - BALL_SIZE
      const pxPerSec = speedRef.current

      const newPos = posRef.current.map((p, i) => {
        const interval = 1000 / TRACKS[i].fps
        if (lastTimesRef.current[i] === 0) lastTimesRef.current[i] = ts
        const elapsed = ts - lastTimesRef.current[i]
        if (elapsed >= interval) {
          // Advance at a constant on-screen speed, but only commit at this track's frame rate
          // so lower frame rates visibly jump further per update (more stutter / blur).
          lastTimesRef.current[i] = ts
          const next = p + pxPerSec * (elapsed / 1000)
          return range > 0 ? next % range : 0
        }
        return p
      })

      posRef.current = newPos
      setPositions([...newPos])
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [stop])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  const toggle = () => {
    if (running) {
      runningRef.current = false
      stop()
      setRunning(false)
    } else {
      lastTimesRef.current = [0, 0, 0, 0]
      lastFrameRef.current = 0
      setRunning(true)
      start()
    }
  }

  const BTN: React.CSSProperties = {
    backgroundColor: 'var(--accent)', color: 'var(--bg-primary)',
    border: 'none', borderRadius: '0.5rem', padding: '0.75rem 2rem',
    fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem 1rem' }} ref={containerRef}>
      {/* Detected refresh rate readout */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.25rem' }}>
          Your detected refresh rate
        </p>
        <p style={{ color: 'var(--accent)', fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-space-grotesk, monospace)', margin: 0, lineHeight: 1 }}>
          {detectedHz ? `${detectedHz} Hz` : 'measuring…'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0.5rem 0 0' }}>
          Tracks above your refresh rate cannot look smoother. Higher FPS = smoother motion.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {TRACKS.map((track, i) => (
          <div key={track.label}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {track.label}
            </p>
            <div style={{
              position: 'relative', height: '36px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '0.375rem',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{
                position: 'absolute',
                left: positions[i],
                top: '50%',
                transform: 'translateY(-50%)',
                width: BALL_SIZE,
                height: BALL_SIZE,
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent), 0 0 16px var(--accent)',
                transition: 'none',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Speed control */}
      <div style={{ maxWidth: '360px', margin: '0 auto 1.5rem', textAlign: 'center' }}>
        <label htmlFor="ufo-speed" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          Speed: {speed} px/s
        </label>
        <input
          id="ufo-speed"
          type="range"
          min={240}
          max={1920}
          step={120}
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={toggle} style={BTN}>
          {running ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  )
}
