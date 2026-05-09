import path from 'path'
import fs from 'fs-extra'
import yaml from 'js-yaml'

export interface KnowledgeItem {
  id: string
  title: string
  content: string | (() => Promise<string>)
  metadata?: any
}

export class MemoryManager {
  private knowledgeDir: string

  constructor(cwd: string) {
    this.knowledgeDir = path.join(cwd, 'knowledge')
  }

  async scan(): Promise<KnowledgeItem[]> {
    if (!(await fs.pathExists(this.knowledgeDir))) {
      return []
    }

    const items: KnowledgeItem[] = []
    const files = await fs.readdir(this.knowledgeDir)

    for (const file of files) {
      if (file.endsWith('.md')) {
        const id = path.basename(file, '.md')
        const isEvolved = id === 'evolved-rules'
        
        items.push({
          id,
          title: isEvolved ? '🚀 EVOLVED PROJECT RULES' : id.replace(/-/g, ' ').toUpperCase(),
          content: async () => this.loadContent(id),
          metadata: { isEvolved }
        })
      }
    }

    return items
  }

  async loadContent(id: string): Promise<string> {
    const fullPath = path.join(this.knowledgeDir, `${id}.md`)
    if (await fs.pathExists(fullPath)) {
      return fs.readFile(fullPath, 'utf-8')
    }
    return ''
  }
}
