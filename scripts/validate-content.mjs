import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'

// Compiles the content module via esbuild-free approach: use tsx-less trick by
// invoking a small TS entry through vite-node style would add a dependency.
// Simplest reliable route: build already type-checks via `tsc -b`; here we
// re-parse the compiled JS output under dist-check to validate content rules.

import { writeFileSync } from 'node:fs'

const outDir = '.content-check'
execSync(`npx tsc -p tsconfig.content-check.json`, { stdio: 'inherit' })
writeFileSync(`${outDir}/package.json`, JSON.stringify({ type: 'commonjs' }))

const require = createRequire(import.meta.url)
const mod = require(`../${outDir}/content/index.js`)
const { MODULES } = mod

let errors = []
const seenIds = new Set()

for (const m of MODULES) {
  if (seenIds.has(m.id)) errors.push(`Duplicate module id: ${m.id}`)
  seenIds.add(m.id)

  for (const lesson of m.lessons) {
    if (seenIds.has(lesson.id)) errors.push(`Duplicate id: ${lesson.id}`)
    seenIds.add(lesson.id)
    if (!lesson.plain) errors.push(`Lesson ${lesson.id} missing plain explanation`)
    if (!lesson.nasm) errors.push(`Lesson ${lesson.id} missing nasm explanation`)
  }

  for (const item of m.items) {
    if (seenIds.has(item.id)) errors.push(`Duplicate item id: ${item.id}`)
    seenIds.add(item.id)

    if (item.kind === 'mcq' || item.kind === 'scenario') {
      if (item.answer < 0 || item.answer >= item.options.length) {
        errors.push(`Item ${item.id}: answer index ${item.answer} out of range for ${item.options.length} options`)
      }
      if (!item.explanation) errors.push(`Item ${item.id} missing explanation`)
    }
    if (item.kind === 'typein' && (!item.accept || item.accept.length === 0)) {
      errors.push(`Item ${item.id} has no accepted answers`)
    }
    if (item.kind === 'multi-typein' && (!item.expected || item.expected.length === 0)) {
      errors.push(`Item ${item.id} has no expected answers`)
    }
    if ('explanation' in item && !item.explanation) {
      errors.push(`Item ${item.id} missing explanation`)
    }
  }
}

if (errors.length > 0) {
  console.error(`Content validation FAILED with ${errors.length} error(s):`)
  errors.forEach((e) => console.error(' - ' + e))
  process.exit(1)
} else {
  console.log(`Content validation passed: ${MODULES.length} modules, ${seenIds.size} unique ids.`)
}
