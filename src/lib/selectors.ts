import { content, indexes } from './loadContent'
import type { Implementation, Pattern, PatternType } from '../types/content'

export type SortOrder = 'curated' | 'name'

export interface FilterState {
  query: string
  patternTypes: PatternType[]
  behaviourIds: string[]
  familyIds: string[]
  psychologyIds: string[]
  industries: string[]
  sort: SortOrder
}

export const emptyFilterState: FilterState = {
  query: '',
  patternTypes: [],
  behaviourIds: [],
  familyIds: [],
  psychologyIds: [],
  industries: [],
  sort: 'curated',
}

export function hasActiveFilters(state: FilterState): boolean {
  return (
    state.query.trim() !== '' ||
    state.patternTypes.length > 0 ||
    state.behaviourIds.length > 0 ||
    state.familyIds.length > 0 ||
    state.psychologyIds.length > 0 ||
    state.industries.length > 0
  )
}

function matchesQuery(haystacks: string[], query: string): boolean {
  if (!query.trim()) return true
  const q = query.trim().toLowerCase()
  return haystacks.some((h) => h.toLowerCase().includes(q))
}

function matchesOr<T>(selected: T[], candidates: T[]): boolean {
  if (selected.length === 0) return true
  return candidates.some((c) => selected.includes(c))
}

function patternSearchHaystacks(pattern: Pattern): string[] {
  const family = indexes.patternFamilyById.get(pattern.familyId)
  const behaviourNames = pattern.possibleBehaviourIds.map((id) => indexes.behaviourById.get(id)?.name ?? '')
  const psychologyNames = pattern.psychologyLinks.map((l) => indexes.psychologyById.get(l.psychologyId)?.name ?? '')
  return [
    pattern.name,
    pattern.definition,
    pattern.operation,
    family?.name ?? '',
    ...pattern.variants,
    ...behaviourNames,
    ...psychologyNames,
  ]
}

export function getFilteredPatterns(state: FilterState): Pattern[] {
  const results = content.patterns.filter((pattern) => {
    if (!matchesOr(state.patternTypes, [pattern.patternType])) return false
    if (!matchesOr(state.familyIds, [pattern.familyId])) return false
    if (!matchesOr(state.behaviourIds, pattern.possibleBehaviourIds)) return false
    if (!matchesOr(state.psychologyIds, pattern.psychologyLinks.map((l) => l.psychologyId))) return false
    if (!matchesQuery(patternSearchHaystacks(pattern), state.query)) return false
    return true
  })

  return sortItems(results, state.sort, (p) => p.name)
}

function implementationSearchHaystacks(impl: Implementation): string[] {
  const behaviourNames = impl.behaviourIds.map((id) => indexes.behaviourById.get(id)?.name ?? '')
  const psychologyNames = impl.psychologyLinks.map((l) => indexes.psychologyById.get(l.psychologyId)?.name ?? '')
  const patternNames = impl.mechanicStack.map((s) => indexes.patternById.get(s.patternId)?.name ?? '')
  return [impl.product, impl.feature, impl.description, impl.industry, ...behaviourNames, ...psychologyNames, ...patternNames]
}

export function getFilteredImplementations(state: FilterState): Implementation[] {
  const results = content.implementations.filter((impl) => {
    const implPatterns = impl.mechanicStack
      .map((s) => indexes.patternById.get(s.patternId))
      .filter((p): p is Pattern => Boolean(p))

    if (!matchesOr(state.patternTypes, implPatterns.map((p) => p.patternType))) return false
    if (!matchesOr(state.familyIds, implPatterns.map((p) => p.familyId))) return false
    if (!matchesOr(state.behaviourIds, impl.behaviourIds)) return false
    if (!matchesOr(state.psychologyIds, impl.psychologyLinks.map((l) => l.psychologyId))) return false
    if (!matchesOr(state.industries, [impl.industry])) return false
    if (!matchesQuery(implementationSearchHaystacks(impl), state.query)) return false
    return true
  })

  return sortItems(results, state.sort, (i) => i.product)
}

function sortItems<T>(items: T[], sort: SortOrder, nameOf: (item: T) => string): T[] {
  if (sort === 'curated') return items
  return [...items].sort((a, b) => nameOf(a).localeCompare(nameOf(b)))
}
