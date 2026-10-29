import { Link } from 'react-router-dom'

import type { Behaviour } from '../types/content'

export function BehaviourCard({ behaviour }: { behaviour: Behaviour }) {
  return (
    <Link
      to={`/behaviours/${behaviour.id}`}
      className="block rounded-xl border border-border-subtle bg-surface-raised p-5 transition-shadow hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-ink">{behaviour.name}</h3>
      <p className="mt-2 text-sm text-ink-muted">{behaviour.definition}</p>
    </Link>
  )
}
