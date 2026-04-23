import chalk from 'chalk'
import { registry } from '../skills/registry.js'
import { configExists, readConfig } from '../core/config.js'

export async function listCommand(): Promise<void> {
  const hasConfig = await configExists()
  let installedSkills: Set<string> = new Set()

  if (hasConfig) {
    const config = await readConfig()
    for (const [groupId, group] of Object.entries(config.groups)) {
      for (const [skillId, skill] of Object.entries(group.skills)) {
        if (skill.enabled) {
          installedSkills.add(`${groupId}/${skillId}`)
        }
      }
    }
  }

  const groups = registry.getGroups()

  console.log()
  console.log(chalk.bold('Available Skills'))
  console.log(chalk.dim('─'.repeat(50)))

  for (const group of groups) {
    console.log()
    console.log(`${group.icon}  ${chalk.bold(group.name)}`)
    console.log(chalk.dim(`   ${group.description}`))

    for (const skill of group.skills) {
      const key = `${group.id}/${skill.id}`
      const isInstalled = installedSkills.has(key)
      const status = isInstalled
        ? chalk.green('✓ installed')
        : chalk.dim('○ available')

      console.log(`   ${status}  ${chalk.cyan(skill.id)}`)
      console.log(chalk.dim(`             ${skill.description}`))
    }
  }

  console.log()
  console.log(chalk.dim('─'.repeat(50)))

  if (!hasConfig) {
    console.log(chalk.dim('\nRun'), chalk.cyan('bonjay init'), chalk.dim('to get started.'))
  } else {
    console.log(
      chalk.dim(`\n${installedSkills.size} skill(s) installed.`),
      chalk.dim('Add more with:'),
      chalk.cyan('bonjay add <group/skill>')
    )
  }
}
