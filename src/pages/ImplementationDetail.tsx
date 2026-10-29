import { Link, useParams } from 'react-router-dom'

import { ClassificationBadge } from '../components/ClassificationBadge'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { ImplementationCard } from '../components/ImplementationCard'
import { ScreenshotGallery } from '../components/ScreenshotGallery'
import { getScreenshotsFor, indexes } from '../lib/loadContent'

export function ImplementationDetail() {
  const { implementationId } = useParams<{ implementationId: string }>()
  const implementation = implementationId ? indexes.implementationById.get(implementationId) : undefined

  if (!implementation) {
    return (
      <div className="space-y-4">
        <p className="text-ink">Implementation not found.</p>
        <Link to="/examples" className="text-accent hover:underline">
          ← Back to Examples Gallery
        </Link>
      </div>
    )
  }

  const screenshots = getScreenshotsFor(implementation.id)
  const behaviours = implementation.behaviourIds.map((id) => indexes.behaviourById.get(id)).filter(Boolean)
  const evidenceItems = implementation.evidenceIds.map((id) => indexes.evidenceById.get(id)).filter(Boolean)
  const sources = implementation.sourceIds.map((id) => indexes.sourceById.get(id)).filter(Boolean)
  const related = implementation.relatedImplementationIds
    .map((id) => indexes.implementationById.get(id))
    .filter(Boolean)

  return (
    <div className="space-y-10">
      <Link to="/examples" className="text-sm text-accent hover:underline">
        ← Back to Examples Gallery
      </Link>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-ink">
          {implementation.product} — {implementation.feature}
        </h1>
        <p className="text-sm font-medium text-ink-muted">{implementation.industry}</p>
        <p className="max-w-2xl text-ink">{implementation.description}</p>
        <p className="text-xs text-ink-muted">Last reviewed {implementation.lastReviewed}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">Screenshots</h2>
        <ScreenshotGallery screenshots={screenshots} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-ink">Mechanic Stack</h2>
        <div className="space-y-2">
          {implementation.mechanicStack.map((entry) => {
            const pattern = indexes.patternById.get(entry.patternId)
            if (!pattern) return null
            return (
              <Link
                key={entry.patternId}
                to={`/mechanics/${pattern.id}`}
                className="block rounded-xl border border-border-subtle bg-surface-raised p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">{pattern.name}</span>
                  <ClassificationBadge type={pattern.patternType} />
                </div>
                <p className="mt-1 text-sm text-ink-muted">{entry.role}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {behaviours.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Target behaviours</h2>
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

      {implementation.psychologyLinks.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">Psychology, qualified</h2>
          {implementation.psychologyLinks.map((link) => {
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

      {evidenceItems.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">Evidence</h2>
          {evidenceItems.map((item) => (
            <div key={item!.id} className="rounded-xl border border-border-subtle bg-surface-raised p-4">
              <EvidenceBadge classification={item!.classification} />
              <p className="mt-2 text-sm text-ink">{item!.summary}</p>
              <p className="mt-2 text-xs text-ink-muted">{item!.limitations}</p>
            </div>
          ))}
        </section>
      )}

      {implementation.designDecisions.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Design decisions</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            {implementation.designDecisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {implementation.tradeoffs.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Trade-offs</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            {implementation.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {implementation.risks.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Risks</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            {implementation.risks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">Related implementations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((impl) => (
              <ImplementationCard key={impl!.id} implementation={impl!} view="gallery" />
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
