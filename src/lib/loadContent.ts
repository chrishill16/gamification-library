import behavioursData from '../data/behaviours.json'
import patternFamiliesData from '../data/patternFamilies.json'
import patternsData from '../data/patterns.json'
import psychologyData from '../data/psychology.json'
import implementationsData from '../data/implementations.json'
import evidenceData from '../data/evidence.json'
import sourcesData from '../data/sources.json'
import screenshotsData from '../data/screenshots.json'
import type {
  Behaviour,
  Evidence,
  Implementation,
  Pattern,
  PatternFamily,
  PsychologyPrinciple,
  Screenshot,
  Source,
} from '../types/content'

const behaviours = behavioursData as Behaviour[]
const patternFamilies = patternFamiliesData as PatternFamily[]
const patterns = patternsData as Pattern[]
const psychology = psychologyData as PsychologyPrinciple[]
const implementations = implementationsData as Implementation[]
const evidence = evidenceData as Evidence[]
const sources = sourcesData as Source[]
const screenshots = screenshotsData as Screenshot[]

const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((item) => [item.id, item]))

export const indexes = {
  behaviourById: byId(behaviours),
  patternFamilyById: byId(patternFamilies),
  patternById: byId(patterns),
  psychologyById: byId(psychology),
  implementationById: byId(implementations),
  evidenceById: byId(evidence),
  sourceById: byId(sources),
  screenshotById: byId(screenshots),
}

/** Implementations whose mechanic stack references this pattern. */
export const implementationsByPatternId = new Map<string, Implementation[]>()
for (const pattern of patterns) {
  implementationsByPatternId.set(
    pattern.id,
    implementations.filter((impl) => impl.mechanicStack.some((s) => s.patternId === pattern.id)),
  )
}

/** Patterns belonging to a given family. */
export const patternsByFamilyId = new Map<string, Pattern[]>()
for (const family of patternFamilies) {
  patternsByFamilyId.set(family.id, patterns.filter((p) => p.familyId === family.id))
}

export const industries = Array.from(new Set(implementations.map((i) => i.industry))).sort()

export const content = {
  behaviours,
  patternFamilies,
  patterns,
  psychology,
  implementations,
  evidence,
  sources,
  screenshots,
}

export function getScreenshotsFor(implementationId: string): Screenshot[] {
  return screenshots.filter((s) => s.implementationId === implementationId)
}
