export interface FilterOption {
  id: string
  label: string
}

export interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
}

export interface ActiveFilter {
  groupKey: string
  groupLabel: string
  id: string
  label: string
}

interface FilterPanelProps {
  groups: FilterGroup[]
  selected: Record<string, string[]>
  onToggle: (groupKey: string, id: string) => void
  onReset: () => void
  resultCount: number
}

export function flattenActiveFilters(groups: FilterGroup[], selected: Record<string, string[]>): ActiveFilter[] {
  const active: ActiveFilter[] = []
  for (const group of groups) {
    for (const id of selected[group.key] ?? []) {
      const option = group.options.find((o) => o.id === id)
      if (option) active.push({ groupKey: group.key, groupLabel: group.label, id, label: option.label })
    }
  }
  return active
}

export function FilterPanel({ groups, selected, onToggle, onReset, resultCount }: FilterPanelProps) {
  const activeFilters = flattenActiveFilters(groups, selected)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </p>
        {activeFilters.length > 0 && (
          <button type="button" onClick={onReset} className="text-sm font-medium text-accent hover:underline">
            Reset all
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Active filters">
          {activeFilters.map((filter) => (
            <li key={`${filter.groupKey}-${filter.id}`}>
              <button
                type="button"
                onClick={() => onToggle(filter.groupKey, filter.id)}
                className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
              >
                {filter.label}
                <span aria-hidden="true">×</span>
                <span className="sr-only">Remove {filter.label} filter</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {groups.map((group) => (
        <fieldset key={group.key} className="space-y-2">
          <legend className="text-sm font-semibold text-ink">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const active = (selected[group.key] ?? []).includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggle(group.key, option.id)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    active
                      ? 'border-accent bg-accent text-surface'
                      : 'border-border-subtle bg-surface-raised text-ink-muted hover:border-accent/50 hover:text-ink'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
