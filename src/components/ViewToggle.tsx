import type { ViewMode } from '../lib/useViewPreference'

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'gallery', label: 'Gallery' },
  { value: 'research', label: 'Research' },
]

export function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="View"
      className="inline-flex rounded-full border border-border-subtle bg-surface-raised p-1"
    >
      {OPTIONS.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-ink text-surface' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
