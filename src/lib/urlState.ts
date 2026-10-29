import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { emptyFilterState, type FilterState, type SortOrder } from './selectors'
import type { PatternType } from '../types/content'

function parseList(value: string | null): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

function serializeList(values: string[]): string | null {
  return values.length > 0 ? values.join(',') : null
}

export function useFilterState(): [FilterState, (next: Partial<FilterState>) => void, () => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = useMemo<FilterState>(() => {
    const sort = searchParams.get('sort')
    return {
      query: searchParams.get('q') ?? emptyFilterState.query,
      patternTypes: parseList(searchParams.get('type')) as PatternType[],
      behaviourIds: parseList(searchParams.get('behaviour')),
      familyIds: parseList(searchParams.get('family')),
      psychologyIds: parseList(searchParams.get('psychology')),
      industries: parseList(searchParams.get('industry')),
      sort: sort === 'name' ? 'name' : emptyFilterState.sort,
    }
  }, [searchParams])

  const update = useCallback(
    (next: Partial<FilterState>) => {
      const merged: FilterState = { ...state, ...next }
      const params = new URLSearchParams()
      if (merged.query.trim()) params.set('q', merged.query.trim())
      const type = serializeList(merged.patternTypes)
      if (type) params.set('type', type)
      const behaviour = serializeList(merged.behaviourIds)
      if (behaviour) params.set('behaviour', behaviour)
      const family = serializeList(merged.familyIds)
      if (family) params.set('family', family)
      const psychology = serializeList(merged.psychologyIds)
      if (psychology) params.set('psychology', psychology)
      const industry = serializeList(merged.industries)
      if (industry) params.set('industry', industry)
      if (merged.sort !== 'curated') params.set('sort', merged.sort)
      setSearchParams(params, { replace: true })
    },
    [state, setSearchParams],
  )

  const reset = useCallback(() => setSearchParams(new URLSearchParams(), { replace: true }), [setSearchParams])

  return [state, update, reset]
}

export function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export type { SortOrder }
