import { Command } from 'commander'
import chalk from 'chalk'
// Load all skill registrations before any command runs
import './skills/loader.js'
import { initCommand } from './commands/init.js'
import { addCommand } from './commands/add.js'
import { removeCommand } from './commands/remove.js'
import { listCommand } from './commands/list.js'
import { updateCommand } from './commands/update.js'
import { captureCommand } from './commands/capture.js'
import { syncGraphCommand } from './commands/sync-graph.js'
import { hookCommand } from './commands/hook.js'

const program = new Command()

program
  .name('bonjay')
  .description(
    chalk.cyan('🤖 AI Skill Generator') +
      ' — scaffold AI rules & skills for your project'
  )
  .version('0.1.0')

program
  .command('init')
  .description('Initialize AI skills for your project (interactive wizard)')
  .action(initCommand)

program
  .command('add')
  .description('Add a skill or group to your project')
  .argument('<skill>', 'Skill to add (e.g. "software-design/design-patterns" or "cs-fundamentals")')
  .action(addCommand)

program
  .command('remove')
  .description('Remove a skill or group from your project')
  .argument('<skill>', 'Skill to remove (e.g. "software-design/design-patterns")')
  .action(removeCommand)

program
  .command('list')
  .description('List all available and installed skills')
  .action(listCommand)

program
  .command('update')
  .description('Regenerate all installed skills with latest rules')
  .action(updateCommand)

program
  .command('capture')
  .description('Capture a new rule or insight into the project memory')
  .argument('<rule>', 'The rule or insight to capture')
  .option('-t, --title <title>', 'Title for this rule')
  .option('-s, --skill <id>', 'Specific skill ID this belongs to')
  .action(captureCommand)

program
  .command('sync-graph')
  .description('Automatically scan the project and update docs/architecture.md graph')
  .action(syncGraphCommand)

program
  .command('hook')
  .description('Manage Git hooks (e.g. bonjay hook install)')
  .argument('<action>', 'Action to perform (install)')
  .action(hookCommand)

program.parse()
