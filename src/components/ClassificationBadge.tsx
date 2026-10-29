import type { PatternType } from '../types/content'

const LABELS: Record<PatternType, string> = {
  mechanic: 'Gamification Mechanic',
  adjacent: 'Adjacent Engagement Pattern',
}

const STYLES: Record<PatternType, string> = {
  mechanic: 'bg-accent-soft text-accent border-accent/30',
  adjacent: 'bg-ink/5 text-ink-muted border-ink/15',
}

export function ClassificationBadge({ type }: { type: PatternType }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${STYLES[type]}`}
    >
      {LABELS[type]}
    </span>
  )
}
