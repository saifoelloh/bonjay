import { registry } from '../registry.js'
import './codebase-analyzer.js'

registry.registerGroup({
  id: 'project-context',
  name: 'Project Context & Memory',
  icon: '🧠',
  description: 'Project-specific knowledge, architecture decisions, and historical context',
  skills: [
    { id: 'memory', description: 'Injects local knowledge items from the knowledge/ folder' },
    { id: 'codebase-analyzer', description: 'Systematic codebase scanning and architecture mapping' },
  ],
})

registry.registerSkill({
  id: 'memory',
  name: 'Project Memory',
  groupId: 'project-context',
  description: 'Contains project-specific context and knowledge items.',
  howToUse: 'Refer to these rules for project-specific decisions and history.',
  routingLogic: 'Always relevant for project-specific questions.',
  rules: [] // This will be populated dynamically during generation
})
