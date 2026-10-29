import { BehaviourCard } from '../components/BehaviourCard'
import { content } from '../lib/loadContent'

export function BehaviourExplorer() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink">Behaviour Explorer</h1>
        <p className="max-w-2xl text-ink-muted">
          Nine behavioural objectives. Pick one to see curated patterns, real implementations and the psychology
          that may be relevant — framed as hypotheses worth exploring, not promises of an outcome.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.behaviours.map((behaviour) => (
          <BehaviourCard key={behaviour.id} behaviour={behaviour} />
        ))}
      </div>
    </div>
  )
}
