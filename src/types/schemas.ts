import { z } from 'zod'

const id = z.string().min(1)
const nonEmpty = z.string().min(1)

export const SourceSchema = z.object({
  id,
  title: nonEmpty,
  url: z.string().url(),
  publisher: nonEmpty,
  accessedDate: nonEmpty,
})

export const ScreenshotSchema = z.object({
  id,
  implementationId: id,
  product: nonEmpty,
  feature: nonEmpty,
  imagePath: z.string().nullable(),
  sourceUrl: z.string().url(),
  captureDate: z.string().nullable(),
  attribution: nonEmpty,
  lastReviewed: nonEmpty,
  altText: nonEmpty,
})

export const EvidenceSchema = z.object({
  id,
  classification: z.enum(['experimental', 'observational', 'reported', 'illustrative']),
  summary: nonEmpty,
  limitations: nonEmpty,
  sourceIds: z.array(id).min(1),
})

export const BehaviourSchema = z.object({
  id,
  name: nonEmpty,
  definition: nonEmpty,
  sampleObjectives: z.array(nonEmpty).min(1),
  patternLinks: z.array(z.object({ patternId: id, rationale: nonEmpty })),
  relatedBehaviourIds: z.array(id),
})

export const PatternFamilySchema = z.object({
  id,
  name: nonEmpty,
  description: nonEmpty,
})

export const PsychologyPrincipleSchema = z.object({
  id,
  name: nonEmpty,
  description: nonEmpty,
})

export const PatternSchema = z.object({
  id,
  name: nonEmpty,
  familyId: id,
  patternType: z.enum(['mechanic', 'adjacent']),
  classificationRationale: nonEmpty,
  definition: nonEmpty,
  operation: nonEmpty,
  variants: z.array(nonEmpty),
  possibleBehaviourIds: z.array(id),
  psychologyLinks: z.array(z.object({ psychologyId: id, qualification: nonEmpty })),
  risks: z.array(nonEmpty),
  sourceIds: z.array(id),
})

export const ImplementationSchema = z.object({
  id,
  product: nonEmpty,
  feature: nonEmpty,
  industry: nonEmpty,
  description: nonEmpty,
  mechanicStack: z.array(z.object({ patternId: id, role: nonEmpty })).min(1),
  behaviourIds: z.array(id).min(1),
  psychologyLinks: z.array(z.object({ psychologyId: id, qualification: nonEmpty })),
  evidenceIds: z.array(id),
  designDecisions: z.array(nonEmpty),
  tradeoffs: z.array(nonEmpty),
  risks: z.array(nonEmpty),
  relatedImplementationIds: z.array(id),
  sourceIds: z.array(id).min(1),
  screenshotIds: z.array(id),
  lastReviewed: nonEmpty,
})

export const ContentBundleSchema = z.object({
  behaviours: z.array(BehaviourSchema),
  patternFamilies: z.array(PatternFamilySchema),
  patterns: z.array(PatternSchema),
  psychology: z.array(PsychologyPrincipleSchema),
  implementations: z.array(ImplementationSchema),
  evidence: z.array(EvidenceSchema),
  sources: z.array(SourceSchema),
  screenshots: z.array(ScreenshotSchema),
})
