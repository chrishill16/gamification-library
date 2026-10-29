import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { ContentBundleSchema } from '../src/types/schemas.ts'
import type { ContentBundle } from '../src/types/content.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'src', 'data')

function loadJson(name: string) {
  return JSON.parse(readFileSync(join(dataDir, `${name}.json`), 'utf-8'))
}

const bundle: ContentBundle = {
  behaviours: loadJson('behaviours'),
  patternFamilies: loadJson('patternFamilies'),
  patterns: loadJson('patterns'),
  psychology: loadJson('psychology'),
  implementations: loadJson('implementations'),
  evidence: loadJson('evidence'),
  sources: loadJson('sources'),
  screenshots: loadJson('screenshots'),
}

const errors: string[] = []

const parsed = ContentBundleSchema.safeParse(bundle)
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    errors.push(`schema: ${issue.path.join('.')}: ${issue.message}`)
  }
}

if (errors.length === 0) {
  const b = bundle

  function checkUnique(entityName: string, items: { id: string }[]) {
    const seen = new Set<string>()
    for (const item of items) {
      if (seen.has(item.id)) errors.push(`duplicate id in ${entityName}: ${item.id}`)
      seen.add(item.id)
    }
    return seen
  }

  const behaviourIds = checkUnique('behaviours', b.behaviours)
  const familyIds = checkUnique('patternFamilies', b.patternFamilies)
  const patternIds = checkUnique('patterns', b.patterns)
  const psychologyIds = checkUnique('psychology', b.psychology)
  const implementationIds = checkUnique('implementations', b.implementations)
  const evidenceIds = checkUnique('evidence', b.evidence)
  const sourceIds = checkUnique('sources', b.sources)
  checkUnique('screenshots', b.screenshots)

  function checkRef(entityName: string, entityId: string, field: string, refId: string, validIds: Set<string>) {
    if (!validIds.has(refId)) {
      errors.push(`${entityName} ${entityId}: ${field} references unknown id "${refId}"`)
    }
  }

  for (const behaviour of b.behaviours) {
    for (const link of behaviour.patternLinks) {
      checkRef('behaviour', behaviour.id, 'patternLinks.patternId', link.patternId, patternIds)
    }
    for (const relatedId of behaviour.relatedBehaviourIds) {
      checkRef('behaviour', behaviour.id, 'relatedBehaviourIds', relatedId, behaviourIds)
    }
  }

  for (const pattern of b.patterns) {
    checkRef('pattern', pattern.id, 'familyId', pattern.familyId, familyIds)
    for (const behaviourId of pattern.possibleBehaviourIds) {
      checkRef('pattern', pattern.id, 'possibleBehaviourIds', behaviourId, behaviourIds)
    }
    for (const link of pattern.psychologyLinks) {
      checkRef('pattern', pattern.id, 'psychologyLinks.psychologyId', link.psychologyId, psychologyIds)
    }
    for (const sId of pattern.sourceIds) {
      checkRef('pattern', pattern.id, 'sourceIds', sId, sourceIds)
    }
  }

  for (const impl of b.implementations) {
    for (const stack of impl.mechanicStack) {
      checkRef('implementation', impl.id, 'mechanicStack.patternId', stack.patternId, patternIds)
    }
    for (const behaviourId of impl.behaviourIds) {
      checkRef('implementation', impl.id, 'behaviourIds', behaviourId, behaviourIds)
    }
    for (const link of impl.psychologyLinks) {
      checkRef('implementation', impl.id, 'psychologyLinks.psychologyId', link.psychologyId, psychologyIds)
    }
    for (const eId of impl.evidenceIds) {
      checkRef('implementation', impl.id, 'evidenceIds', eId, evidenceIds)
    }
    for (const relId of impl.relatedImplementationIds) {
      checkRef('implementation', impl.id, 'relatedImplementationIds', relId, implementationIds)
    }
    for (const sId of impl.sourceIds) {
      checkRef('implementation', impl.id, 'sourceIds', sId, sourceIds)
    }
    for (const scId of impl.screenshotIds) {
      checkRef('implementation', impl.id, 'screenshotIds', scId, new Set(b.screenshots.map((s) => s.id)))
    }
  }

  for (const evidenceItem of b.evidence) {
    for (const sId of evidenceItem.sourceIds) {
      checkRef('evidence', evidenceItem.id, 'sourceIds', sId, sourceIds)
    }
  }

  for (const screenshot of b.screenshots) {
    checkRef('screenshot', screenshot.id, 'implementationId', screenshot.implementationId, implementationIds)
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s):\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(
  `Content validation passed: ${bundle.behaviours.length} behaviours, ${bundle.patterns.length} patterns, ${bundle.implementations.length} implementations, ${bundle.evidence.length} evidence records, ${bundle.sources.length} sources, ${bundle.screenshots.length} screenshots.`,
)
