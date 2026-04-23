export interface TargetAdapter {
  id: string
  name: string
  outputDir: string
}

const adapters: Record<string, TargetAdapter> = {
  gemini: {
    id: 'gemini',
    name: 'Gemini (Antigravity)',
    outputDir: '.gemini/skills',
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    outputDir: '.cursor/rules',
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
