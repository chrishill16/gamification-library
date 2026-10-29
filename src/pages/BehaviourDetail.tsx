import { Link, useParams } from 'react-router-dom'

import { PatternCard } from '../components/PatternCard'
import { ImplementationCard } from '../components/ImplementationCard'
import { ViewToggle } from '../components/ViewToggle'
import { content, indexes } from '../lib/loadContent'
import { useViewPreference } from '../lib/useViewPreference'

export function BehaviourDetail() {
  const { behaviourId } = useParams<{ behaviourId: string }>()
  const [view, setView] = useViewPreference()
  const behaviour = behaviourId ? indexes.behaviourById.get(behaviourId) : undefined

  if (!behaviour) {
    return (
      <div className="space-y-4">
        <p className="text-ink">Behaviour not found.</p>
        <Link to="/behaviours" className="text-accent hover:underline">
          ← Back to Behaviour Explorer
        </Link>
      </div>
    )
  }

  const relatedPatterns = behaviour.patternLinks
    .map((link) => ({ pattern: indexes.patternById.get(link.patternId), rationale: link.rationale }))
    .filter((p): p is { pattern: NonNullable<typeof p.pattern>; rationale: string } => Boolean(p.pattern))

  const relatedImplementations = content.implementations.filter((impl) => impl.behaviourIds.includes(behaviour.id))

  const relatedBehaviours = behaviour.relatedBehaviourIds
    .map((id) => indexes.behaviourById.get(id))
    .filter(Boolean)

  return (
    <div className="space-y-10">
      <Link to="/behaviours" className="text-sm text-accent hover:underline">
        ← Back to Behaviour Explorer
      </Link>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-ink">{behaviour.name}</h1>
        <p className="max-w-2xl text-ink-muted">{behaviour.definition}</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-muted">
          {behaviour.sampleObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink">Patterns that may be relevant</h2>
          <ViewToggle value={view} onChange={setView} />
        </div>
        <p className="max-w-2xl text-sm text-ink-muted">
          These are hypotheses worth exploring for this behaviour, not promises that any pattern guarantees an
          outcome.
        </p>
        {relatedPatterns.length === 0 ? (
          <p className="text-sm text-ink-muted">No patterns are curated for this behaviour yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPatterns.map(({ pattern, rationale }) => (
              <div key={pattern.id} className="space-y-2">
                <PatternCard pattern={pattern} view={view} />
                <p className="text-xs text-ink-muted">{rationale}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">Real implementations</h2>
        {relatedImplementations.length === 0 ? (
          <p className="text-sm text-ink-muted">No catalogued implementations target this behaviour yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedImplementations.map((impl) => (
              <ImplementationCard key={impl.id} implementation={impl} view={view} />
            ))}
          </div>
        )}
      </section>

      {relatedBehaviours.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">Related behaviours</h2>
          <div className="flex flex-wrap gap-2">
            {relatedBehaviours.map((related) => (
              <Link
                key={related!.id}
                to={`/behaviours/${related!.id}`}
                className="rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-sm text-ink-muted hover:border-accent/50 hover:text-ink"
              >
                {related!.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
