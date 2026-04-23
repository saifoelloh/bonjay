import { registry } from '../registry.js'

import formalCasualEnglishRule from './communication-style/formal-casual-english.md'

registry.registerGroup({
  id: 'ai-persona',
  name: 'AI Persona & Rules of Engagement',
  icon: '🤖',
  description: 'Global instructions defining how the AI should behave, speak, and format responses',
  skills: [
    { id: 'communication-style', description: 'Tone of voice, language preferences, formatting rules' },
  ],
})

// ──────────────────────────────────────────────
// Skill: communication-style
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'communication-style',
  name: 'Communication Style',
  groupId: 'ai-persona',
  description: 'Defines how the AI assistant should talk to the developer.',
  howToUse: `
- These rules are usually applied globally to the AI system prompt.
- "Respond in the project's preferred tone."
`,
  routingLogic: `
- Always apply these rules implicitly to all interactions if this skill is installed.
`,
  rules: [
    {
      id: 'formal-casual-english',
      priority: 'CRITICAL',
      content: formalCasualEnglishRule,
    },
  ],
})
