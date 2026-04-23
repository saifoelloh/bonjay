import { registry } from '../registry.js'

import conventionalCommitsRule from './git/conventional-commits.md'
import commitBestPracticesRule from './git/commit-best-practices.md'
import githubFlowBranchingRule from './git/github-flow-branching.md'
import gitReleaseWorkflowRule from './git/git-release-workflow.md'

registry.registerGroup({
  id: 'version-control',
  name: 'Version Control',
  icon: '🔀',
  description: 'Git workflows, branching strategies, and commit best practices',
  skills: [
    { id: 'git-commits', description: 'Conventional commits, atomic commits, commit messages' },
    { id: 'git-workflow', description: 'GitHub Flow, branching strategies, semantic versioning, and tags' },
  ],
})

// ──────────────────────────────────────────────
// Skill: git-commits
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'git-commits',
  name: 'Git Commits',
  groupId: 'version-control',
  description: 'Best practices for writing commit messages and structuring commits.',
  howToUse: `
- "Is this a good commit message?"
- "How should I structure my commit for this feature?"
- "Review my commit log"
`,
  routingLogic: `
- Questions about git commit messages -> git-commits
- Conventional Commits questions -> git-commits
- "How to write a good commit?" -> git-commits
`,
  rules: [
    {
      id: 'conventional-commits',
      priority: 'HIGH',
      content: conventionalCommitsRule,
    },
    {
      id: 'commit-best-practices',
      priority: 'HIGH',
      content: commitBestPracticesRule,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: git-workflow
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'git-workflow',
  name: 'Git Workflow & Versioning',
  groupId: 'version-control',
  description: 'GitHub Flow, branching strategies, semantic versioning, and Git tags.',
  howToUse: `
- "How should I branch this feature?"
- "Explain how to release a new version"
- "What is the GitHub flow?"
`,
  routingLogic: `
- Questions about branching or PRs -> git-workflow
- Questions about tags, versions, SemVer -> git-workflow
- "How to release" -> git-workflow
`,
  rules: [
    {
      id: 'github-flow-branching',
      priority: 'HIGH',
      content: githubFlowBranchingRule,
    },
    {
      id: 'git-release-workflow',
      priority: 'HIGH',
      content: gitReleaseWorkflowRule,
    },
  ],
})
