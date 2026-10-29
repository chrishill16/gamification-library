import { Link, useParams } from 'react-router-dom'

import { ClassificationBadge } from '../components/ClassificationBadge'
import { ImplementationCard } from '../components/ImplementationCard'
import { PatternWireframe } from '../components/icons/PatternIcons'
import { implementationsByPatternId, indexes } from '../lib/loadContent'

export function PatternDetail() {
  const { patternId } = useParams<{ patternId: string }>()
  const pattern = patternId ? indexes.patternById.get(patternId) : undefined

  if (!pattern) {
    return (
      <div className="space-y-4">
        <p className="text-ink">Pattern not found.</p>
        <Link to="/mechanics" className="text-accent hover:underline">
          ← Back to Mechanics Explorer
        </Link>
      </div>
    )
  }

  const family = indexes.patternFamilyById.get(pattern.familyId)
  const behaviours = pattern.possibleBehaviourIds.map((id) => indexes.behaviourById.get(id)).filter(Boolean)
  const implementations = implementationsByPatternId.get(pattern.id) ?? []
  const sources = pattern.sourceIds.map((id) => indexes.sourceById.get(id)).filter(Boolean)

  return (
    <div className="space-y-10">
      <Link to="/mechanics" className="text-sm text-accent hover:underline">
        ← Back to Mechanics Explorer
      </Link>

      <header className="flex flex-wrap items-start gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-ink">{pattern.name}</h1>
            <ClassificationBadge type={pattern.patternType} />
          </div>
          <p className="text-sm font-medium text-ink-muted">{family?.name}</p>
          <p className="max-w-2xl text-ink">{pattern.definition}</p>
        </div>
        <div className="w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-accent-soft p-4 sm:ml-auto">
          <PatternWireframe
            patternId={pattern.id}
            className="h-full w-full"
            role="img"
            aria-label={`Representative UI wireframe for ${pattern.name}`}
          />
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-ink">Why this classification</h2>
        <p className="max-w-2xl text-sm text-ink-muted">{pattern.classificationRationale}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-ink">How it operates</h2>
        <p className="max-w-2xl text-ink">{pattern.operation}</p>
      </section>

      {pattern.variants.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Variants &amp; supporting features</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            {pattern.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
        </section>
      )}

      {behaviours.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Possible behaviours</h2>
          <div className="flex flex-wrap gap-2">
            {behaviours.map((b) => (
              <Link
                key={b!.id}
                to={`/behaviours/${b!.id}`}
                className="rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-sm text-ink-muted hover:border-accent/50 hover:text-ink"
              >
                {b!.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {pattern.psychologyLinks.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">Psychology, qualified</h2>
          {pattern.psychologyLinks.map((link) => {
            const psych = indexes.psychologyById.get(link.psychologyId)
            if (!psych) return null
            return (
              <div key={link.psychologyId} className="rounded-xl border border-border-subtle bg-surface-raised p-4">
                <p className="font-medium text-ink">{psych.name}</p>
                <p className="mt-1 text-sm text-ink">{link.qualification}</p>
              </div>
            )
          })}
        </section>
      )}

      {pattern.risks.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Risks</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            {pattern.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </section>
      )}

      {implementations.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">Implementations using this pattern</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {implementations.map((impl) => (
              <ImplementationCard key={impl.id} implementation={impl} view="gallery" />
            ))}
          </div>
        </section>
      )}

      {sources.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Sources</h2>
          <ul className="space-y-1 text-sm">
            {sources.map((source) => (
              <li key={source!.id}>
                <a href={source!.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  {source!.title}
                </a>{' '}
                <span className="text-ink-muted">— {source!.publisher}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
