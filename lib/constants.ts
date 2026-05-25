import type { Tool } from './types'

export const SITE_CONFIG = {
  name: 'FPS Test',
  url: 'https://fpstest.pro',
  description: 'Free FPS & Gaming Performance Tests — no download, no signup.',
  twitterHandle: '@fpstestpro',
  ogImage: 'https://fpstest.pro/og-image.png',
} as const

export const TOOLS: Tool[] = [
  {
    id: 'fps-test',
    name: 'FPS Test',
    emoji: '',
    icon: 'Gauge',
    desc: 'Measure your real browser frame rate with live stats',
    category: 'fps',
    href: '/tools/fps-test',
  },
  {
    id: 'ufo-test',
    name: 'UFO Motion Test',
    emoji: '',
    icon: 'Monitor',
    desc: 'See the visual difference between 30, 60, 120 and 144 FPS',
    category: 'fps',
    href: '/tools/ufo-test',
  },
  {
    id: 'frame-comparison',
    name: 'Frame Comparison',
    emoji: '',
    icon: 'BarChart2',
    desc: 'Compare any two frame rates side by side',
    category: 'fps',
    href: '/tools/frame-comparison',
  },
  {
    id: 'fps-reaction-test',
    name: 'FPS Reaction Test',
    emoji: '',
    icon: 'Zap',
    desc: 'Test your gaming reflexes in milliseconds',
    category: 'fps',
    href: '/tools/fps-reaction-test',
  },
  {
    id: 'hz-detector',
    name: 'Monitor Hz Detector',
    emoji: '',
    icon: 'Tv',
    desc: 'Detect your actual monitor refresh rate in the browser',
    category: 'fps',
    href: '/tools/hz-detector',
  },
  {
    id: 'input-lag-test',
    name: 'Input Lag Test',
    emoji: '',
    icon: 'MousePointer',
    desc: 'Measure your browser response latency in milliseconds',
    category: 'fps',
    href: '/tools/input-lag-test',
  },
]
