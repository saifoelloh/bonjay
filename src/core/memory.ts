import path from 'path'
import fs from 'fs-extra'
import yaml from 'js-yaml'

export interface KnowledgeItem {
  id: string
  title: string
  content: string
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
        const fullPath = path.join(this.knowledgeDir, file)
        const rawContent = await fs.readFile(fullPath, 'utf-8')
        
        // Simple frontmatter parsing (could be improved)
        const id = path.basename(file, '.md')
        const isEvolved = id === 'evolved-rules'
        
        items.push({
          id,
          title: isEvolved ? '🚀 EVOLVED PROJECT RULES' : id.replace(/-/g, ' ').toUpperCase(),
          content: rawContent,
          metadata: { isEvolved }
        })
      }
    }

    return items
  }
}
