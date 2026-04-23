import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { readConfig, writeConfig, disableSkillInConfig } from '../core/config.js'
import { getTargetAdapter } from '../targets/index.js'

export async function removeCommand(skillPath: string): Promise<void> {
  let config
  try {
    config = await readConfig()
  } catch {
    console.log(chalk.red('✗ bonjay.json not found. Run "bonjay init" first.'))
    return
  }

  const parts = skillPath.split('/')
  if (parts.length !== 2) {
    console.log(chalk.red('✗ Please specify skill as "group/skill-id"'))
    return
  }

  const [groupId, skillId] = parts
  config = disableSkillInConfig(config, groupId, skillId)
  await writeConfig(config)

  // Remove generated files for each target
  for (const target of config.ai_targets) {
    const adapter = getTargetAdapter(target)
    if (!adapter) continue
    const skillDir = path.join(process.cwd(), adapter.outputDir, skillId)
    if (await fs.pathExists(skillDir)) {
      await fs.remove(skillDir)
      console.log(chalk.dim('  ✗ Removed'), chalk.cyan(`${adapter.outputDir}/${skillId}/`))
    }
  }

  console.log(chalk.green(`\n✓ Skill "${skillId}" removed from project.`))
}
