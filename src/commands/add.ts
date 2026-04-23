import chalk from 'chalk'
import ora from 'ora'
import { readConfig, writeConfig, enableSkillInConfig } from '../core/config.js'
import { generateFromConfig } from '../core/generator.js'
import { registry } from '../skills/registry.js'

export async function addCommand(skillPath: string): Promise<void> {
  let config
  try {
    config = await readConfig()
  } catch {
    console.log(chalk.red('✗ bonjay.json not found. Run "bonjay init" first.'))
    return
  }

  const parts = skillPath.split('/')

  // Adding entire group
  if (parts.length === 1) {
    const groupId = parts[0]
    const group = registry.getGroup(groupId)
    if (!group) {
      console.log(chalk.red(`✗ Group "${groupId}" not found.`))
      console.log(chalk.dim('Run "bonjay list" to see available groups.'))
      return
    }

    console.log(chalk.cyan(`Adding all skills from "${group.name}"...`))
    for (const skill of group.skills) {
      config = enableSkillInConfig(config, groupId, skill.id)
    }
  } else {
    // Adding single skill
    const [groupId, skillId] = parts
    const group = registry.getGroup(groupId)
    if (!group) {
      console.log(chalk.red(`✗ Group "${groupId}" not found.`))
      return
    }
    const skillMeta = group.skills.find((s) => s.id === skillId)
    if (!skillMeta) {
      console.log(chalk.red(`✗ Skill "${skillId}" not found in "${groupId}".`))
      return
    }

    console.log(chalk.cyan(`Adding skill "${skillId}"...`))
    config = enableSkillInConfig(config, groupId, skillId)
  }

  const spinner = ora('Generating...').start()
  await writeConfig(config)
  const { generated, total_rules } = await generateFromConfig(config)
  spinner.succeed(chalk.green('Done!'))

  generated.forEach((p) => console.log(chalk.dim('  ✓'), chalk.cyan(p)))
  console.log(chalk.bold(`\n${chalk.green(total_rules)} rules generated.`))
}
