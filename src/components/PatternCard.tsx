import { Link } from 'react-router-dom'

import { indexes } from '../lib/loadContent'
import type { ViewMode } from '../lib/useViewPreference'
import type { Pattern } from '../types/content'
import { ClassificationBadge } from './ClassificationBadge'
import { PatternWireframe } from './icons/PatternIcons'

export function PatternCard({ pattern, view }: { pattern: Pattern; view: ViewMode }) {
  const family = indexes.patternFamilyById.get(pattern.familyId)
  const behaviourNames = pattern.possibleBehaviourIds
    .map((id) => indexes.behaviourById.get(id)?.name)
    .filter(Boolean)

  if (view === 'gallery') {
    return (
      <Link
        to={`/mechanics/${pattern.id}`}
        className="group block overflow-hidden rounded-xl border border-border-subtle bg-surface-raised transition-shadow hover:shadow-md"
      >
        <div className="flex aspect-[4/3] items-center justify-center bg-accent-soft p-5 transition-transform group-hover:scale-[1.02]">
          <PatternWireframe patternId={pattern.id} className="h-full w-full" role="img" aria-label={`Representative UI wireframe for ${pattern.name}`} />
        </div>
        <div className="space-y-2 p-4">
          <h3 className="font-semibold text-ink">{pattern.name}</h3>
          <div className="flex items-center justify-between gap-2">
            <ClassificationBadge type={pattern.patternType} />
          </div>
          <p className="text-sm font-medium text-ink-muted">{family?.name}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/mechanics/${pattern.id}`}
      className="block rounded-xl border border-border-subtle bg-surface-raised p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-ink">{pattern.name}</h3>
        <ClassificationBadge type={pattern.patternType} />
      </div>
      <p className="mt-1 text-sm text-ink-muted">{family?.name}</p>
      <p className="mt-2 text-sm text-ink">{pattern.definition}</p>
      {behaviourNames.length > 0 && (
        <p className="mt-2 text-xs text-ink-muted">Behaviours: {behaviourNames.join(', ')}</p>
      )}
    </Link>
  )
}
