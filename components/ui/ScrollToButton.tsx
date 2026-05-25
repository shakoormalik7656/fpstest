'use client'

interface Props {
  targetId: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function ScrollToButton({ targetId, children, style }: Props) {
  return (
    <button
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      style={style}
    >
      {children}
    </button>
  )
}
