export type PatternType = 'mechanic' | 'adjacent'

export type EvidenceClassification =
  | 'experimental'
  | 'observational'
  | 'reported'
  | 'illustrative'

export interface Source {
  id: string
  title: string
  url: string
  publisher: string
  accessedDate: string
}

export interface Screenshot {
  id: string
  implementationId: string
  product: string
  feature: string
  imagePath: string | null
  sourceUrl: string
  captureDate: string | null
  attribution: string
  lastReviewed: string
  altText: string
}

export interface Evidence {
  id: string
  classification: EvidenceClassification
  summary: string
  limitations: string
  sourceIds: string[]
}

export interface Behaviour {
  id: string
  name: string
  definition: string
  sampleObjectives: string[]
  patternLinks: { patternId: string; rationale: string }[]
  relatedBehaviourIds: string[]
}

export interface PatternFamily {
  id: string
  name: string
  description: string
}

export interface PsychologyPrinciple {
  id: string
  name: string
  description: string
}

export interface Pattern {
  id: string
  name: string
  familyId: string
  patternType: PatternType
  classificationRationale: string
  definition: string
  operation: string
  variants: string[]
  possibleBehaviourIds: string[]
  psychologyLinks: { psychologyId: string; qualification: string }[]
  risks: string[]
  sourceIds: string[]
}

export interface Implementation {
  id: string
  product: string
  feature: string
  industry: string
  description: string
  mechanicStack: { patternId: string; role: string }[]
  behaviourIds: string[]
  psychologyLinks: { psychologyId: string; qualification: string }[]
  evidenceIds: string[]
  designDecisions: string[]
  tradeoffs: string[]
  risks: string[]
  relatedImplementationIds: string[]
  sourceIds: string[]
  screenshotIds: string[]
  lastReviewed: string
}

export interface ContentBundle {
  behaviours: Behaviour[]
  patternFamilies: PatternFamily[]
  patterns: Pattern[]
  psychology: PsychologyPrinciple[]
  implementations: Implementation[]
  evidence: Evidence[]
  sources: Source[]
  screenshots: Screenshot[]
}
