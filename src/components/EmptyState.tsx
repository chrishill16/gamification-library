export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border-subtle bg-surface-raised p-10 text-center">
      <p className="text-ink">No entries match this combination of filters.</p>
      <p className="mt-1 text-sm text-ink-muted">
        This reflects what's currently catalogued, not a judgement that no such pattern exists.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent-soft"
      >
        Reset filters
      </button>
    </div>
  )
}
