import fs from 'fs-extra'
import path from 'path'

export interface SkillEntry {
  enabled: boolean
}

export interface GroupEntry {
  enabled: boolean
  skills: Record<string, SkillEntry>
}

export interface BonjayConfig {
  version: string
  ai_targets: string[]
  groups: Record<string, GroupEntry>
  custom_skills: string[]
}

const CONFIG_FILE = 'bonjay.json'

export function getConfigPath(cwd = process.cwd()): string {
  return path.join(cwd, CONFIG_FILE)
}

export async function configExists(cwd = process.cwd()): Promise<boolean> {
  return fs.pathExists(getConfigPath(cwd))
}

export async function readConfig(cwd = process.cwd()): Promise<BonjayConfig> {
  const configPath = getConfigPath(cwd)
  if (!(await fs.pathExists(configPath))) {
    throw new Error(`bonjay.json not found. Run "bonjay init" first.`)
  }
  const raw = await fs.readJson(configPath)
  return raw as BonjayConfig
}

export async function writeConfig(
  config: BonjayConfig,
  cwd = process.cwd()
): Promise<void> {
  const configPath = getConfigPath(cwd)
  await fs.writeJson(configPath, config, { spaces: 2 })
}

export function createDefaultConfig(
  ai_targets: string[],
  selectedGroups: Record<string, string[]>
): BonjayConfig {
  const groups: Record<string, GroupEntry> = {}

  for (const [groupId, skillIds] of Object.entries(selectedGroups)) {
    const skills: Record<string, SkillEntry> = {}
    for (const skillId of skillIds) {
      skills[skillId] = { enabled: true }
    }
    groups[groupId] = { enabled: true, skills }
  }

  return {
    version: '1.0.0',
    ai_targets,
    groups,
    custom_skills: [],
  }
}

export function enableSkillInConfig(
  config: BonjayConfig,
  groupId: string,
  skillId: string
): BonjayConfig {
  if (!config.groups[groupId]) {
    config.groups[groupId] = { enabled: true, skills: {} }
  }
  config.groups[groupId].skills[skillId] = { enabled: true }
  config.groups[groupId].enabled = true
  return config
}

export function disableSkillInConfig(
  config: BonjayConfig,
  groupId: string,
  skillId: string
): BonjayConfig {
  if (config.groups[groupId]?.skills[skillId]) {
    config.groups[groupId].skills[skillId].enabled = false
  }
  return config
}
