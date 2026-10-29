export function SearchBar({
  value,
  onChange,
  placeholder = 'Search names, behaviours, products, psychology…',
  label = 'Search',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border-subtle bg-surface-raised px-4 py-2.5 text-ink placeholder:text-ink-muted/70 focus-visible:border-accent"
      />
    </label>
  )
}
