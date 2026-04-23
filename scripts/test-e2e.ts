// Quick E2E test — generate skills without interactive wizard
import { createDefaultConfig, writeConfig } from '../src/core/config.js'
import { generateFromConfig } from '../src/core/generator.js'
import '../src/skills/loader.js'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'

const testDir = path.join(os.tmpdir(), 'bonjay-e2e-test')
await fs.ensureDir(testDir)
await fs.emptyDir(testDir)

const config = createDefaultConfig(['gemini'], {
  'cs-fundamentals': ['data-structures', 'algorithms'],
  'software-design': ['design-patterns'],
  'security': ['security-fundamentals'],
})

await writeConfig(config, testDir)
const { generated, total_rules } = await generateFromConfig(config, { cwd: testDir })

console.log('\n✅ E2E Test Results:')
console.log(`   Generated: ${generated.length} skill directories`)
console.log(`   Total rules: ${total_rules}`)
console.log('\n📁 Output structure:')

// Walk generated dir
const geminiDir = path.join(testDir, '.gemini/skills')
const skills = await fs.readdir(geminiDir)
for (const skill of skills) {
  const rulesDir = path.join(geminiDir, skill, 'rules')
  const rules = await fs.readdir(rulesDir)
  console.log(`   .gemini/skills/${skill}/`)
  console.log(`     SKILL.md`)
  for (const rule of rules) {
    console.log(`     rules/${rule}`)
  }
}

console.log('\n📄 Sample SKILL.md content (design-patterns):')
const sampleSkill = await fs.readFile(path.join(geminiDir, 'design-patterns', 'SKILL.md'), 'utf-8')
console.log(sampleSkill.slice(0, 400) + '...')

await fs.remove(testDir)
console.log('\n✅ Cleanup done. All tests passed!')
