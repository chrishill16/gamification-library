import { useMemo } from 'react'

import { EmptyState } from '../components/EmptyState'
import { FilterPanel, type FilterGroup } from '../components/FilterPanel'
import { MobileFilterDrawer } from '../components/MobileFilterDrawer'
import { PatternCard } from '../components/PatternCard'
import { SearchBar } from '../components/SearchBar'
import { ViewToggle } from '../components/ViewToggle'
import { content } from '../lib/loadContent'
import { getFilteredPatterns } from '../lib/selectors'
import { toggleInList, useFilterState } from '../lib/urlState'
import { useViewPreference } from '../lib/useViewPreference'

export function MechanicsExplorer() {
  const [filters, updateFilters, resetFilters] = useFilterState()
  const [view, setView] = useViewPreference()

  const groups: FilterGroup[] = useMemo(
    () => [
      {
        key: 'patternTypes',
        label: 'Pattern type',
        options: [
          { id: 'mechanic', label: 'Gamification Mechanic' },
          { id: 'adjacent', label: 'Adjacent Engagement Pattern' },
        ],
      },
      {
        key: 'familyIds',
        label: 'Mechanic family',
        options: content.patternFamilies.map((f) => ({ id: f.id, label: f.name })),
      },
      {
        key: 'behaviourIds',
        label: 'Behaviour',
        options: content.behaviours.map((b) => ({ id: b.id, label: b.name })),
      },
      {
        key: 'psychologyIds',
        label: 'Psychology',
        options: content.psychology.map((p) => ({ id: p.id, label: p.name })),
      },
    ],
    [],
  )

  const results = getFilteredPatterns(filters)

  const selected: Record<string, string[]> = {
    patternTypes: filters.patternTypes,
    familyIds: filters.familyIds,
    behaviourIds: filters.behaviourIds,
    psychologyIds: filters.psychologyIds,
  }

  function handleToggle(groupKey: string, id: string) {
    updateFilters({ [groupKey]: toggleInList(selected[groupKey] ?? [], id) })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-ink">Mechanics Explorer</h1>
          <p className="max-w-2xl text-ink-muted">
            Every catalogued pattern, classified as a Gamification Mechanic or an Adjacent Engagement Pattern.
          </p>
        </div>
        <ViewToggle value={view} onChange={setView} />
      </header>

      <SearchBar value={filters.query} onChange={(q) => updateFilters({ query: q })} />

      <MobileFilterDrawer
        groups={groups}
        selected={selected}
        onToggle={handleToggle}
        onReset={resetFilters}
        resultCount={results.length}
      />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            groups={groups}
            selected={selected}
            onToggle={handleToggle}
            onReset={resetFilters}
            resultCount={results.length}
          />
        </aside>

        <div>
          {results.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div
              className={
                view === 'gallery'
                  ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid gap-3'
              }
            >
              {results.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} view={view} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
