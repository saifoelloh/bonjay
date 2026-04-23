import path from 'path'
import fs from 'fs-extra'
import type { BonjayConfig } from './config.js'
import { registry } from '../skills/registry.js'
import { getTargetAdapter } from '../targets/index.js'

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

        await fs.ensureDir(rulesDir)

        // Write SKILL.md
        const skillMd = buildSkillMd(skill)
        await fs.writeFile(path.join(skillDir, 'SKILL.md'), skillMd, 'utf-8')

        // Write each rule file
        for (const rule of skill.rules) {
          await fs.writeFile(
            path.join(rulesDir, `${rule.id}.md`),
            rule.content,
            'utf-8'
          )
          total_rules++
        }

        generated.push(`${adapter.outputDir}/${skillId}/`)
      }
    }
  }

  return { generated, total_rules }
}

function buildSkillMd(skill: ReturnType<typeof registry.getSkill>): string {
  if (!skill) return ''

  const priorityCounts = skill.rules.reduce(
    (acc, rule) => {
      acc[rule.priority] = (acc[rule.priority] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const priorityTable = Object.entries(priorityCounts)
    .map(([p, count]) => `| **${p}** | ${count} |`)
    .join('\n')

  return `---
name: ${skill.id}
description: ${skill.description}
metadata:
  version: "1.0.0"
  group: ${skill.groupId}
  rules_count: ${skill.rules.length}
---

# ${skill.name}

${skill.longDescription ?? skill.description}

## Rules by Priority

| Priority | Count |
|---|---|
${priorityTable}

## How to Use

${skill.howToUse ?? `Ask your AI assistant to review code for ${skill.name.toLowerCase()} best practices.`}

## Routing Logic

${skill.routingLogic ?? `Use this skill when working with code that involves ${skill.id.replace(/-/g, ' ')}.`}
`
}
