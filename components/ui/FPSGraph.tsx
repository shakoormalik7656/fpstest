'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

interface DataPoint {
  t: number
  fps: number
}

interface TooltipPayload {
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

const MAX_POINTS = 30
const BASE_FPS = 144
const FLUCTUATION = 8
const DIP_FPS_MIN = 60
const DIP_FPS_MAX = 80
const DIP_DURATION_MIN = 4
const DIP_DURATION_MAX = 6
const DIP_INTERVAL_MIN = 16
const DIP_INTERVAL_MAX = 20

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function calcStability(readings: number[]): number {
  if (readings.length < 2) return 100
  const mean = readings.reduce((a, b) => a + b, 0) / readings.length
  if (mean === 0) return 100
  const variance = readings.reduce((acc, v) => acc + (v - mean) ** 2, 0) / readings.length
  return Math.max(0, Math.round(100 - (Math.sqrt(variance) / mean) * 100))
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      padding: '0.375rem 0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.8125rem',
    }}>
      <span style={{ color: '#00ff88' }}>FPS: {payload[0].value}</span>
    </div>
  )
}

export default function FPSGraph() {
  const [data, setData] = useState<DataPoint[]>([])
  const tickRef          = useRef(0)
  const dipRemainingRef  = useRef(0)
  const intervalCountRef = useRef(0)
  const nextDipAtRef     = useRef(rand(DIP_INTERVAL_MIN, DIP_INTERVAL_MAX))

  useEffect(() => {
    // Seed with initial data so chart renders immediately
    const seed: DataPoint[] = Array.from({ length: 10 }, (_, i) => ({
      t: i,
      fps: BASE_FPS + rand(-FLUCTUATION, FLUCTUATION),
    }))
    setData(seed)
    tickRef.current = 10

    const interval = setInterval(() => {
      let fps: number

      if (dipRemainingRef.current > 0) {
        fps = rand(DIP_FPS_MIN, DIP_FPS_MAX)
        dipRemainingRef.current--
      } else {
        intervalCountRef.current++
        if (intervalCountRef.current >= nextDipAtRef.current) {
          // Trigger a dip
          dipRemainingRef.current = rand(DIP_DURATION_MIN, DIP_DURATION_MAX)
          nextDipAtRef.current    = rand(DIP_INTERVAL_MIN, DIP_INTERVAL_MAX)
          intervalCountRef.current = 0
          fps = rand(DIP_FPS_MIN, DIP_FPS_MAX)
        } else {
          fps = BASE_FPS + rand(-FLUCTUATION, FLUCTUATION)
        }
      }

      const t = tickRef.current++
      setData(prev => {
        const next = [...prev, { t, fps }]
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const currentFps = data.length > 0 ? data[data.length - 1].fps : BASE_FPS
  const avgFps     = data.length > 0 ? Math.round(data.reduce((a, b) => a + b.fps, 0) / data.length) : BASE_FPS
  const stability  = calcStability(data.map(d => d.fps))

  return (
    <div>
      {/* Live stat pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {/* Live */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)',
          borderRadius: '999px', padding: '0.3rem 0.875rem',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            backgroundColor: '#ef4444', flexShrink: 0,
            animation: 'fps-pulse-dot 1s ease-in-out infinite',
          }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.25rem' }}>Live</span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>{currentFps} FPS</span>
        </div>
        {/* Avg */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)',
          borderRadius: '999px', padding: '0.3rem 0.875rem',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg</span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>{avgFps} FPS</span>
        </div>
        {/* Stability */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)',
          borderRadius: '999px', padding: '0.3rem 0.875rem',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stability</span>
          <span style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600 }}>{stability}%</span>
        </div>
      </div>

      {/* Chart */}
      <style>{`
        @keyframes fps-pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00ff88" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border-color)" strokeOpacity={0.6} vertical={false} />
          <XAxis dataKey="t" hide />
          <YAxis
            domain={[0, 200]}
            ticks={[0, 60, 144, 200]}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
          <ReferenceLine y={60}  stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '60',  position: 'right', fill: '#f59e0b', fontSize: 10 }} />
          <ReferenceLine y={144} stroke="#00ff88" strokeDasharray="4 4" label={{ value: '144', position: 'right', fill: '#00ff88', fontSize: 10 }} />
          <Area
            type="monotone"
            dataKey="fps"
            stroke="#00ff88"
            strokeWidth={2}
            fill="url(#fpsGradient)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
        Green line = your frame rate. Yellow reference = 60 FPS minimum. Green reference = 144 FPS target.
      </p>
    </div>
  )
}
