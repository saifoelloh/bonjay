import { checkbox, select, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import { registry } from '../skills/registry.js'

export interface WizardResult {
  ai_targets: string[]
  selectedGroups: Record<string, string[]>
}

const AI_TARGETS = [
  { name: 'Gemini (Antigravity)', value: 'gemini' },
  { name: 'Cursor', value: 'cursor' },
  { name: 'Claude', value: 'claude' },
]

export async function runInitWizard(): Promise<WizardResult> {
  console.log()
  console.log(
    chalk.cyan.bold('🤖 Welcome to Bonjay — AI Skill Generator')
  )
  console.log(
    chalk.dim("Let's set up AI skills for your project.\n")
  )

  // Step 1: AI Target
  const ai_targets = await checkbox({
    message: 'Which AI assistant(s) do you use?',
    choices: AI_TARGETS,
    required: true,
    validate: (val) => val.length > 0 || 'Please select at least one AI target.',
  })

  // Step 2: Group selection
  const groups = registry.getGroups()
  const groupChoices = groups.map((g) => ({
    name: `${g.icon}  ${chalk.bold(g.name)} ${chalk.dim(`— ${g.description}`)}`,
    value: g.id,
    checked: true,
  }))

  const selectedGroupIds = await checkbox({
    message: 'Select skill groups to include:',
    choices: groupChoices,
    required: true,
    validate: (val) => val.length > 0 || 'Please select at least one group.',
  })

  // Step 3: Automatically select all skills in the chosen groups
  const selectedGroups: Record<string, string[]> = {}

  for (const groupId of selectedGroupIds) {
    const group = registry.getGroup(groupId)
    if (!group) continue

    // Select all skills in the group
    selectedGroups[groupId] = group.skills.map((s) => s.id)
  }

  return { ai_targets, selectedGroups }
}

export async function runAddWizard(skillPath: string): Promise<{ groupId: string; skillId: string } | null> {
  const parts = skillPath.split('/')

  if (parts.length === 1) {
    // Adding entire group
    const group = registry.getGroup(parts[0])
    if (!group) {
      console.log(chalk.red(`✗ Group "${parts[0]}" not found.`))
      return null
    }

    const confirmed = await confirm({
      message: `Add all ${group.skills.length} skills from "${group.name}"?`,
      default: true,
    })

    if (!confirmed) return null

    // Return first skill, caller will handle all
    return { groupId: parts[0], skillId: '*' }
  }

  const [groupId, skillId] = parts
  const group = registry.getGroup(groupId)

  if (!group) {
    console.log(chalk.red(`✗ Group "${groupId}" not found.`))
    return null
  }

  const skill = group.skills.find((s) => s.id === skillId)
  if (!skill) {
    console.log(chalk.red(`✗ Skill "${skillId}" not found in group "${groupId}".`))
    return null
  }

  return { groupId, skillId }
}
