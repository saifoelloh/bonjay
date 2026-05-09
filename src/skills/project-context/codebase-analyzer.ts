import { registry } from '../registry.js'

registry.registerSkill({
  id: 'codebase-analyzer',
  name: 'Codebase Analyzer',
  groupId: 'project-context',
  description: 'Instructs the AI on how to systematically scan and map the project architecture.',
  howToUse: 'Activate when the user types /map-architecture or asks to analyze the codebase structure.',
  routingLogic: 'Triggered explicitly by /map-architecture or when deep project understanding is required before refactoring.',
  rules: [
    {
      id: 'repository-scanning-protocol',
      priority: 'CRITICAL',
      content: `
# Repository Scanning Protocol

When asked to analyze or understand the codebase, do NOT guess. Follow this systematic approach:
1. **Entry Points:** Read \`package.json\`, \`Makefile\`, or similar config files to identify the entry points (e.g., \`src/index.ts\`, \`cmd/main.go\`).
2. **Directory Structure:** Scan the root directory and identify the core folders (e.g., \`src\`, \`tests\`, \`docs\`).
3. **Dependency Graph:** Identify the core third-party libraries being used (e.g., React, Express, GORM) as they dictate the architectural style.
`
    },
    {
      id: 'architectural-layer-mapping',
      priority: 'HIGH',
      content: `
# Architectural Layer Mapping

Classify the directories and files you scan into these standard layers:
- **Presentation/UI Layer:** Controllers, Routers, Views, React Components.
- **Service/Business Logic Layer:** Use cases, Services, Domain logic.
- **Data/Infrastructure Layer:** Repositories, Database models, External API clients.
- **Cross-cutting/Utility:** Helpers, Configs, Middlewares.

When describing the architecture to the user, explicitly state which folders correspond to which layers.
`
    },
    {
      id: 'impact-analysis-tracing',
      priority: 'CRITICAL',
      content: `
# Impact Analysis & Diff Tracing

Before suggesting a code modification or writing a refactor:
1. Identify all callers of the function/class you are modifying.
2. Trace the data flow up to the API/UI layer and down to the Database layer.
3. Explicitly list the "Ripple Effects" (files that might break because of this change) in your response.
`
    },
    {
      id: 'knowledge-graph-generation',
      priority: 'HIGH',
      content: `
# Knowledge Graph Generation (/map-architecture)

When the user types \`/map-architecture\`, you MUST generate a Mermaid.js graph visualizing the core components of the system and their relationships.
- Use a \`graph TD\` or \`graph LR\` syntax.
- Group related nodes using \`subgraph\` to represent Architectural Layers.
- Provide a brief textual summary below the graph explaining the flow of data.
`
    }
  ]
})
