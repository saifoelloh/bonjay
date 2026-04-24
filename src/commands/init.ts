import chalk from 'chalk'
import ora from 'ora'
import { runInitWizard } from '../core/wizard.js'
import { createDefaultConfig, writeConfig, configExists } from '../core/config.js'
import { generateFromConfig } from '../core/generator.js'
import { confirm } from '@inquirer/prompts'

export async function initCommand(): Promise<void> {
  const exists = await configExists()
  if (exists) {
    const overwrite = await confirm({
      message: chalk.yellow('bonjay.json already exists. Overwrite?'),
      default: false,
    })
    if (!overwrite) {
      console.log(chalk.dim('Aborted.'))
      return
    }
  }

  const { ai_targets, selectedGroups } = await runInitWizard()

  const totalSkills = Object.values(selectedGroups).reduce(
    (sum, skills) => sum + skills.length,
    0
  )

  if (totalSkills === 0) {
    console.log(chalk.yellow('\nNo skills selected. Nothing to generate.'))
    return
  }

  console.log()
  const spinner = ora('Generating your AI skills...').start()

  const config = createDefaultConfig(ai_targets, selectedGroups)
  await writeConfig(config)

  const { generated, total_rules } = await generateFromConfig(config)

  spinner.succeed(chalk.green('Done!'))

  console.log()
  
  // Group paths by target directory for cleaner output
  const byDir: Record<string, string[]> = {}
  generated.forEach((p) => {
    const cleaned = p.endsWith('/') ? p.slice(0, -1) : p
    const lastSlash = cleaned.lastIndexOf('/')
    
    let dir = cleaned
    let skill = ''
    
    if (lastSlash !== -1) {
      dir = cleaned.substring(0, lastSlash)
      skill = cleaned.substring(lastSlash + 1)
    }
    
    if (!byDir[dir]) byDir[dir] = []
    if (skill) byDir[dir].push(skill)
  })

  Object.entries(byDir).forEach(([dir, skills]) => {
    console.log(chalk.dim(`  ${dir}/`))
    if (skills.length > 0) {
      console.log(`    ${chalk.cyan(skills.join(', '))}`)
    }
    console.log() // Add spacing between directories
  })

  console.log()
  console.log(
    chalk.bold(`Generated ${chalk.green(total_rules)} rules across ${chalk.green(totalSkills)} skills.`)
  )
  console.log(chalk.dim(`Config saved to ${chalk.white('bonjay.json')}`))
  console.log()
  console.log(chalk.dim('Add more skills anytime with:'), chalk.cyan('bonjay add <group/skill>'))
  console.log(chalk.dim('Update all skills with:'), chalk.cyan('bonjay update'))
}
