import { registry } from '../registry.js'

import injectionPreventionRule from './security-fundamentals/injection-prevention.md'
import authnVsAuthzRule from './security-fundamentals/authn-vs-authz.md'
import secretManagementRule from './security-fundamentals/secret-management.md'
import passwordHashingRule from './security-fundamentals/password-hashing.md'
import xssPreventionRule from './security-fundamentals/xss-prevention.md'

registry.registerGroup({
  id: 'security',
  name: 'Security',
  icon: '🔒',
  description: 'OWASP Top 10, Authentication, Authorization, Encryption — building secure software',
  skills: [
    { id: 'security-fundamentals', description: 'OWASP Top 10, AuthN/AuthZ, secret management, encryption' },
  ],
})

registry.registerSkill({
  id: 'security-fundamentals',
  name: 'Security Fundamentals',
  groupId: 'security',
  description: 'OWASP Top 10, authentication vs authorization, encryption, and secret management.',
  howToUse: `
- "Review this code for security vulnerabilities"
- "Is this authentication flow secure?"
- "Am I handling secrets correctly?"
`,
  routingLogic: `
- Input handling, SQL, user input → injection prevention
- Auth flows → authn/authz rules
- Credentials in code → secret management
- Data transmission → encryption rules
`,
  rules: [
    {
      id: 'injection-prevention',
      priority: 'CRITICAL',
      content: injectionPreventionRule,
    },
    {
      id: 'authn-vs-authz',
      priority: 'CRITICAL',
      content: authnVsAuthzRule,
    },
    {
      id: 'secret-management',
      priority: 'CRITICAL',
      content: secretManagementRule,
    },
    {
      id: 'password-hashing',
      priority: 'CRITICAL',
      content: passwordHashingRule,
    },
    {
      id: 'xss-prevention',
      priority: 'CRITICAL',
      content: xssPreventionRule,
    },
  ],
})
