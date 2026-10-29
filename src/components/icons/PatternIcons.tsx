import type { SVGProps } from 'react'

type WireframeProps = SVGProps<SVGSVGElement>

const frame = {
  x: 12,
  y: 14,
  width: 136,
  height: 92,
  rx: 10,
  fill: 'var(--color-surface-raised)',
  stroke: 'var(--color-border-subtle)',
  strokeWidth: 1.5,
}

function Card({ children, ...props }: { children: React.ReactNode } & WireframeProps) {
  return (
    <svg viewBox="0 0 160 120" {...props}>
      <rect {...frame} />
      {children}
    </svg>
  )
}

function flamePath(cx: number, cy: number, scale: number) {
  const d =
    'M12 2.5c.6 2.2-.4 3.4-1.4 4.6-1.2 1.4-2.4 2.8-2.4 5.1a4 4 0 0 0 7.8 1.3c.6.9.9 1.9.7 3a5.5 5.5 0 0 0 2.1-4.3c0-3.2-2.2-5-3.3-6.6.2 1.3-.2 2.2-1 2.7-.1-2.2-1.2-4.3-2.5-5.8Z'
  return <path d={d} transform={`translate(${cx - 12 * scale} ${cy - 12 * scale}) scale(${scale})`} />
}

function DayDots({
  y,
  filled,
  total = 7,
  startX = 28,
  spacing = 16,
}: {
  y: number
  filled: number
  total?: number
  startX?: number
  spacing?: number
}) {
  return (
    <>
      {Array.from({ length: total }, (_, i) => (
        <circle
          key={i}
          cx={startX + i * spacing}
          cy={y}
          r={6}
          fill={i < filled ? 'var(--color-accent)' : 'none'}
          stroke={i < filled ? 'var(--color-accent)' : 'var(--color-border-subtle)'}
          strokeWidth={1.5}
        />
      ))}
    </>
  )
}

function DailyStreakWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      <g fill="none" stroke="var(--color-accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {flamePath(28, 30, 0.7)}
      </g>
      <rect x="42" y="24" width="38" height="13" rx="6.5" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1" />
      <DayDots y={78} filled={5} />
    </Card>
  )
}

function SharedStreakWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      <circle cx="38" cy="32" r="11" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <circle cx="122" cy="32" r="11" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <line x1="49" y1="32" x2="111" y2="32" stroke="var(--color-border-subtle)" strokeWidth="1.5" strokeDasharray="3 4" />
      <DayDots y={64} filled={4} total={5} startX={30} spacing={14} />
      <DayDots y={86} filled={3} total={5} startX={30} spacing={14} />
    </Card>
  )
}

function ring(cx: number, cy: number, r: number, pct: number, opacity: number) {
  const circumference = 2 * Math.PI * r
  const dash = circumference * pct
  return (
    <g key={r}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border-subtle)" strokeWidth="6" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity={opacity}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </g>
  )
}

function ProgressRingWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      {ring(80, 62, 28, 0.92, 1)}
      {ring(80, 62, 20, 0.68, 0.75)}
      {ring(80, 62, 12, 0.45, 0.5)}
    </Card>
  )
}

function AdaptiveGoalWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      <rect x="28" y="30" width="54" height="6" rx="3" fill="var(--color-ink-muted)" opacity="0.25" />
      <rect x="28" y="42" width="34" height="6" rx="3" fill="var(--color-ink-muted)" opacity="0.18" />
      <rect x="28" y="66" width="104" height="10" rx="5" fill="var(--color-accent-soft)" stroke="var(--color-border-subtle)" strokeWidth="1" />
      <rect x="28" y="66" width="62" height="10" rx="5" fill="var(--color-accent)" />
      <line x1="118" y1="56" x2="118" y2="82" stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx="90" cy="71" r="7" fill="var(--color-surface-raised)" stroke="var(--color-accent)" strokeWidth="2" />
    </Card>
  )
}

function badge(cx: number, cy: number, active: boolean) {
  const color = active ? 'var(--color-accent)' : 'var(--color-border-subtle)'
  return (
    <g key={cx}>
      <circle cx={cx} cy={cy} r="14" fill={active ? 'var(--color-accent-soft)' : 'none'} stroke={color} strokeWidth="1.5" />
      <path d={`M${cx - 6} ${cy + 11} L${cx - 9} ${cy + 22} L${cx} ${cy + 17} L${cx + 9} ${cy + 22} L${cx + 6} ${cy + 11}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  )
}

function AchievementBadgesWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      {badge(50, 48, true)}
      {badge(80, 48, false)}
      {badge(110, 48, false)}
    </Card>
  )
}

function CompetitionWireframe(props: WireframeProps) {
  const rows: [number, number, boolean][] = [
    [34, 84, true],
    [58, 62, false],
    [82, 42, false],
  ]
  return (
    <Card {...props}>
      {rows.map(([y, width, active]) => (
        <g key={y}>
          <circle cx="26" cy={y} r="6" fill={active ? 'var(--color-accent)' : 'var(--color-ink-muted)'} opacity={active ? 1 : 0.35} />
          <rect x="40" y={y - 5} width={width} height="10" rx="5" fill={active ? 'var(--color-accent)' : 'var(--color-ink-muted)'} opacity={active ? 1 : 0.2} />
        </g>
      ))}
    </Card>
  )
}

function YearReviewWireframe(props: WireframeProps) {
  const bars = [10, 16, 26, 14, 20]
  return (
    <Card {...props}>
      <rect x="24" y="24" width="112" height="30" rx="8" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1" />
      <path d="m36 33 1.3 2.7 3 .4-2.1 2 .5 3-2.7-1.4-2.7 1.4.5-3-2.1-2 3-.4Z" fill="var(--color-accent)" />
      <rect x="48" y="31" width="52" height="5" rx="2.5" fill="var(--color-accent)" opacity="0.5" />
      <rect x="48" y="41" width="36" height="5" rx="2.5" fill="var(--color-accent)" opacity="0.3" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={30 + i * 20}
          y={92 - h}
          width="10"
          height={h}
          rx="2"
          fill={h === 26 ? 'var(--color-accent)' : 'var(--color-ink-muted)'}
          opacity={h === 26 ? 1 : 0.25}
        />
      ))}
    </Card>
  )
}

function NudgeWireframe(props: WireframeProps) {
  return (
    <Card {...props}>
      <rect x="22" y="26" width="116" height="30" rx="9" fill="var(--color-surface-raised)" stroke="var(--color-border-subtle)" strokeWidth="1.5" />
      <path
        d="M39 48a4 4 0 0 0 8 0"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M43 31a3.6 3.6 0 0 0-3.6 3.6c0 3.2-1 4-1 4.8h9.2c0-.8-1-1.6-1-4.8A3.6 3.6 0 0 0 43 31Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="47.5" cy="30" r="2.5" fill="var(--color-accent)" />
      <rect x="58" y="33" width="54" height="5" rx="2.5" fill="var(--color-ink-muted)" opacity="0.3" />
      <rect x="58" y="43" width="38" height="5" rx="2.5" fill="var(--color-ink-muted)" opacity="0.2" />
      <DayDots y={86} filled={3} total={5} startX={42} spacing={20} />
    </Card>
  )
}

export const patternWireframes: Record<string, (props: WireframeProps) => React.JSX.Element> = {
  'daily-streak': DailyStreakWireframe,
  'shared-streak': SharedStreakWireframe,
  'progress-ring': ProgressRingWireframe,
  'adaptive-daily-goal': AdaptiveGoalWireframe,
  'achievement-badges': AchievementBadgesWireframe,
  'social-fitness-competition': CompetitionWireframe,
  'personalized-year-review': YearReviewWireframe,
  'nudge-reminder': NudgeWireframe,
}

export function PatternWireframe({ patternId, ...props }: { patternId: string } & WireframeProps) {
  const Wireframe = patternWireframes[patternId]
  if (!Wireframe) return null
  return <Wireframe {...props} />
}
