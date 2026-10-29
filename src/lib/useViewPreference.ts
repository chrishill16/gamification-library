import { useCallback, useState } from 'react'

export type ViewMode = 'gallery' | 'research'

const STORAGE_KEY = 'gl:view-preference'

function readStoredView(): ViewMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'research' ? 'research' : 'gallery'
  } catch {
    return 'gallery'
  }
}

export function useViewPreference(): [ViewMode, (mode: ViewMode) => void] {
  const [view, setView] = useState<ViewMode>(readStoredView)

  const update = useCallback((mode: ViewMode) => {
    setView(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // localStorage unavailable (private browsing, etc.) — view preference just won't persist.
    }
  }, [])

  return [view, update]
}
