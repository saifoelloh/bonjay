import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'

export async function hookCommand(action: string) {
  if (action !== 'install') {
    console.error(chalk.red('Invalid hook action. Use "bonjay hook install"'))
    return
  }

  const cwd = process.cwd()
  const gitDir = path.join(cwd, '.git')

  if (!(await fs.pathExists(gitDir))) {
    console.error(chalk.red('Not a git repository. Cannot install hook.'))
    return
  }

  const hooksDir = path.join(gitDir, 'hooks')
  await fs.ensureDir(hooksDir)

  const preCommitPath = path.join(hooksDir, 'pre-commit')
  
  const hookScript = `#!/bin/sh
# Bonjay Auto-updating Architecture Graph Hook

echo "🤖 Bonjay: Syncing architecture graph..."
npx bonjay sync-graph
if [ -f docs/architecture.md ]; then
  git add docs/architecture.md
fi
`

  try {
    if (await fs.pathExists(preCommitPath)) {
      const existing = await fs.readFile(preCommitPath, 'utf-8')
      if (!existing.includes('bonjay sync-graph')) {
        await fs.appendFile(preCommitPath, '\n' + hookScript.replace('#!/bin/sh\n', ''))
      }
    } else {
      await fs.writeFile(preCommitPath, hookScript, 'utf-8')
      await fs.chmod(preCommitPath, '755')
    }
    
    console.log(chalk.green('✅ Git pre-commit hook installed successfully!'))
  } catch (error: any) {
    console.error(chalk.red('Failed to install hook: ' + error.message))
  }
}
