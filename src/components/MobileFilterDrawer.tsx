import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

import { FilterPanel, type FilterGroup } from './FilterPanel'

export function MobileFilterDrawer({
  groups,
  selected,
  onToggle,
  onReset,
  resultCount,
}: {
  groups: FilterGroup[]
  selected: Record<string, string[]>
  onToggle: (groupKey: string, id: string) => void
  onReset: () => void
  resultCount: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-border-subtle bg-surface-raised px-4 py-2.5 text-sm font-medium text-ink"
      >
        Filters &amp; results ({resultCount})
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-ink/40" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 flex w-full max-w-sm">
          <DialogPanel className="flex w-full flex-col overflow-y-auto bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-ink">Filters</DialogTitle>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-ink-muted hover:text-ink"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            <FilterPanel
              groups={groups}
              selected={selected}
              onToggle={onToggle}
              onReset={onReset}
              resultCount={resultCount}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
