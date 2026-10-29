import type { EvidenceClassification } from '../types/content'

const LABELS: Record<EvidenceClassification, string> = {
  experimental: 'Experimental evidence',
  observational: 'Observational evidence',
  reported: 'Reported outcome',
  illustrative: 'Illustrative example',
}

export function EvidenceBadge({ classification }: { classification: EvidenceClassification }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-subtle bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-ink-muted">
      {LABELS[classification]}
    </span>
  )
}
