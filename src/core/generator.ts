import path from 'path'
import fs from 'fs-extra'
import type { BonjayConfig } from './config.js'
import { registry } from '../skills/registry.js'
import { getTargetAdapter } from '../targets/index.js'
import { defaultFormatter } from './formatters.js'
import { MemoryManager } from './memory.js'

export interface GenerateOptions {
  cwd?: string
}

export async function generateFromConfig(
  config: BonjayConfig,
  options: GenerateOptions = {}
): Promise<{ generated: string[]; total_rules: number }> {
  const cwd = options.cwd ?? process.cwd()
  const generated: string[] = []
  let total_rules = 0

  // Handle Custom Skills
  const customSkillsDir = path.join(cwd, '.bonjay', 'skills')
  await registry.discoverCustomSkills(customSkillsDir)

  // Handle Memory/Knowledge Items
  const memoryManager = new MemoryManager(cwd)
  const knowledgeItems = await memoryManager.scan()
  
  if (knowledgeItems.length > 0) {
    const memorySkill = registry.getSkill('project-context', 'memory')
    if (memorySkill) {
      memorySkill.rules = knowledgeItems.map(item => ({
        id: item.id,
        priority: 'HIGH',
        content: item.content
      }))
    }
  }

  const writeTasks: Promise<void>[] = []

  for (const target of config.ai_targets) {
    const adapter = getTargetAdapter(target)
    if (!adapter) continue

    const baseDir = path.join(cwd, adapter.outputDir)

    for (const [groupId, groupEntry] of Object.entries(config.groups)) {
      if (!groupEntry.enabled) continue

      for (const [skillId, skillEntry] of Object.entries(groupEntry.skills)) {
        if (!skillEntry.enabled) continue

        const skill = registry.getSkill(groupId, skillId)
        if (!skill) continue

        const skillDir = path.join(baseDir, skillId)
        const rulesDir = path.join(skillDir, 'rules')

        writeTasks.push((async () => {
          await fs.ensureDir(rulesDir)

          // Write SKILL.md
          const formatter = adapter.formatter ?? defaultFormatter
          const skillMd = formatter(skill)
          await fs.writeFile(path.join(skillDir, 'SKILL.md'), skillMd, 'utf-8')

          // Write each rule file
          const ruleTasks = skill.rules.map(async (rule) => {
            const content = typeof rule.content === 'function' ? await rule.content() : rule.content
            await fs.writeFile(
              path.join(rulesDir, `${rule.id}.md`),
              content,
              'utf-8'
            )
          })

          await Promise.all(ruleTasks)
        })())

        total_rules += skill.rules.length
        generated.push(`${adapter.outputDir}/${skillId}/`)
      }
    }
  }

  await Promise.all(writeTasks)

  return { generated, total_rules }
}


