import { Link } from 'react-router-dom'

import { getScreenshotsFor, indexes } from '../lib/loadContent'
import type { ViewMode } from '../lib/useViewPreference'
import type { Implementation } from '../types/content'
import { ClassificationBadge } from './ClassificationBadge'

export function ImplementationCard({ implementation, view }: { implementation: Implementation; view: ViewMode }) {
  const screenshot = getScreenshotsFor(implementation.id)[0]
  const corePattern = indexes.patternById.get(implementation.mechanicStack[0]?.patternId ?? '')

  if (view === 'gallery') {
    return (
      <Link
        to={`/examples/${implementation.id}`}
        className="group block overflow-hidden rounded-xl border border-border-subtle bg-surface-raised transition-shadow hover:shadow-md"
      >
        <img
          src={screenshot?.imagePath ?? '/gamification-library/placeholder-screenshot.svg'}
          alt={screenshot?.altText ?? `${implementation.product} — screenshot pending`}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-1 p-4">
          <p className="font-semibold text-ink">{implementation.product}</p>
          <p className="text-sm text-ink-muted">{implementation.feature}</p>
          {corePattern && <ClassificationBadge type={corePattern.patternType} />}
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/examples/${implementation.id}`}
      className="block rounded-xl border border-border-subtle bg-surface-raised p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-ink">
          {implementation.product} — {implementation.feature}
        </h3>
        {corePattern && <ClassificationBadge type={corePattern.patternType} />}
      </div>
      <p className="mt-1 text-sm text-ink-muted">{implementation.industry}</p>
      <p className="mt-2 text-sm text-ink">{implementation.description}</p>
    </Link>
  )
}
