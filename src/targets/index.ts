import type { SkillDef } from '../skills/registry.js'
import { geminiFormatter, cursorFormatter } from '../core/formatters.js'

export type SkillFormatter = (skill: SkillDef) => string

export interface TargetAdapter {
  id: string
  name: string
  outputDir: string
  formatter?: SkillFormatter
}

const adapters: Record<string, TargetAdapter> = {
  gemini: {
    id: 'gemini',
    name: 'Gemini (Antigravity)',
    outputDir: '.gemini/skills',
    formatter: geminiFormatter,
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    outputDir: '.cursor/rules',
    formatter: cursorFormatter,
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    outputDir: '.claude/skills',
  },
}

export function getTargetAdapter(id: string): TargetAdapter | undefined {
  return adapters[id]
}

export function getAllAdapters(): TargetAdapter[] {
  return Object.values(adapters)
}
