import chalk from 'chalk'
import ora from 'ora'
import { readConfig } from '../core/config.js'
import { generateFromConfig } from '../core/generator.js'

export async function updateCommand(): Promise<void> {
  let config
  try {
    config = await readConfig()
  } catch {
    console.log(chalk.red('✗ bonjay.json not found. Run "bonjay init" first.'))
    return
  }

  const spinner = ora('Regenerating all installed skills with latest rules...').start()

  const { generated, total_rules } = await generateFromConfig(config)

  spinner.succeed(chalk.green('All skills updated!'))

  console.log()
  generated.forEach((p) => console.log(chalk.dim('  ✓'), chalk.cyan(p)))
  console.log(chalk.bold(`\n${chalk.green(total_rules)} rules regenerated.`))
}
