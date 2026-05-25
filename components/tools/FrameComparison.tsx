'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const FPS_OPTIONS = [30, 60, 120, 144, 240]

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
}

interface PanelProps {
  fps: number
  label: string
}

function Panel({ fps, label }: PanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number | null>(null)
  const ballRef   = useRef<Ball>({ x: 60, y: 60, vx: 2.5, vy: 2 })
  const lastRef   = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const interval = 1000 / fps

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)
      if (lastRef.current && ts - lastRef.current < interval) return
      lastRef.current = ts

      const { width, height } = canvas
      const b = ballRef.current
      b.x += b.vx
      b.y += b.vy

      const r = 12
      if (b.x - r <= 0 || b.x + r >= width)  b.vx *= -1
      if (b.y - r <= 0 || b.y + r >= height) b.vy *= -1
      b.x = Math.max(r, Math.min(width - r, b.x))
      b.y = Math.max(r, Math.min(height - r, b.y))

      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, width, height)

      ctx.shadowColor = '#00ff88'
      ctx.shadowBlur  = 12
      ctx.beginPath()
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
      ctx.fillStyle = '#00ff88'
      ctx.fill()
      ctx.shadowBlur = 0
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [fps])

  return (
    <div style={{ flex: 1 }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </p>
      <div style={{ color: 'var(--accent)', fontSize: '2rem', fontWeight: 800, textAlign: 'center', lineHeight: 1, marginBottom: '0.75rem', fontFamily: 'var(--font-space-grotesk, monospace)' }}>
        {fps} FPS
      </div>
      <canvas
        ref={canvasRef}
        width={260}
        height={180}
        style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'block' }}
      />
    </div>
  )
}

export default function FrameComparison() {
  const [leftFps,  setLeftFps]  = useState(60)
  const [rightFps, setRightFps] = useState(144)

  const ratio = (Math.max(leftFps, rightFps) / Math.min(leftFps, rightFps)).toFixed(1)
  const [higher, lower] = leftFps > rightFps ? [leftFps, rightFps] : [rightFps, leftFps]

  const SEL: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)',
    border: '1px solid var(--border-color)', borderRadius: '0.375rem',
    padding: '0.375rem 0.625rem', fontSize: '0.875rem', cursor: 'pointer', width: '100%',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '0.375rem' }}>Left Panel</label>
          <select style={SEL} value={leftFps} onChange={e => setLeftFps(Number(e.target.value))}>
            {FPS_OPTIONS.map(f => <option key={f} value={f}>{f} FPS</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '0.375rem' }}>Right Panel</label>
          <select style={SEL} value={rightFps} onChange={e => setRightFps(Number(e.target.value))}>
            {FPS_OPTIONS.map(f => <option key={f} value={f}>{f} FPS</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Panel fps={leftFps}  label="Left" />
        <Panel fps={rightFps} label="Right" />
      </div>

      {leftFps !== rightFps && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{higher} FPS</span> is{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{ratio}x</span> smoother than{' '}
          <span style={{ fontWeight: 600 }}>{lower} FPS</span>
        </p>
      )}
    </div>
  )
}
