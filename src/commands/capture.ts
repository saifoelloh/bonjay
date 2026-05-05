import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import ora from 'ora'

export async function captureCommand(rule: string, options: { title?: string; skill?: string }) {
  const spinner = ora('Capturing evolved rule...').start()
  const cwd = process.cwd()
  const knowledgeDir = path.join(cwd, 'knowledge')
  const evolvedFile = path.join(knowledgeDir, 'evolved-rules.md')

  try {
    await fs.ensureDir(knowledgeDir)

    const timestamp = new Date().toISOString().split('T')[0]
    const title = options.title || `Learned on ${timestamp}`
    const skillTag = options.skill ? ` [${options.skill}]` : ''

    const ruleEntry = `
### ${title}${skillTag}
- **Capture Date:** ${timestamp}
- **Rule:** ${rule}

---
`

    if (!(await fs.pathExists(evolvedFile))) {
      const header = `# Evolved Project Rules\n\nThis file contains rules captured during the development process.\n\n`
      await fs.writeFile(evolvedFile, header + ruleEntry, 'utf-8')
    } else {
      await fs.appendFile(evolvedFile, ruleEntry, 'utf-8')
    }

  spinner.succeed(chalk.green(`Captured new rule into ${chalk.bold('knowledge/evolved-rules.md')}`))
    console.log(chalk.dim('\nRun "bonjay update" to apply this rule to your AI assistant.'))

  } catch (error: any) {
    spinner.fail(chalk.red(`Failed to capture rule: ${error.message}`))
    process.exit(1)
  }
}
