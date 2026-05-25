'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Track {
  label: string
  fps: number
  pos: number
}

const TRACKS: Omit<Track, 'pos'>[] = [
  { label: '30 FPS',  fps: 30  },
  { label: '60 FPS',  fps: 60  },
  { label: '120 FPS', fps: 120 },
  { label: '144 FPS', fps: 144 },
]

const BALL_SIZE   = 20
const TRACK_W_PCT = 0.92

export default function UFOTest() {
  const [running, setRunning]         = useState(true)
  const [positions, setPositions]     = useState<number[]>([0, 0, 0, 0])
  const containerRef                  = useRef<HTMLDivElement>(null)
  const rafRef                        = useRef<number | null>(null)
  const lastTimesRef                  = useRef<number[]>([0, 0, 0, 0])
  const posRef                        = useRef<number[]>([0, 0, 0, 0])
  const runningRef                    = useRef(true)

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    stop()
    runningRef.current = true
    const loop = (ts: number) => {
      if (!runningRef.current) return
      const width = containerRef.current?.clientWidth ?? 600
      const trackW = width * TRACK_W_PCT

      const newPos = posRef.current.map((p, i) => {
        const interval = 1000 / TRACKS[i].fps
        if (lastTimesRef.current[i] === 0) lastTimesRef.current[i] = ts
        const elapsed = ts - lastTimesRef.current[i]
        if (elapsed >= interval) {
          const steps = Math.floor(elapsed / interval)
          lastTimesRef.current[i] = ts - (elapsed % interval)
          const speed = TRACKS[i].fps * (trackW / (TRACKS[i].fps * 3))
          return (p + speed * steps * (interval / 1000)) % (trackW + BALL_SIZE)
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
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', textAlign: 'center', marginBottom: '2rem' }}>
        Higher FPS = smoother motion. Can you see the difference?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
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

      <div style={{ textAlign: 'center' }}>
        <button onClick={toggle} style={BTN}>
          {running ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  )
}
