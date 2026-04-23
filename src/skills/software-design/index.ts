import { registry } from '../registry.js'

import factoryPatternRule from './design-patterns/factory-pattern.md'
import observerPatternRule from './design-patterns/observer-pattern.md'
import strategyPatternRule from './design-patterns/strategy-pattern.md'
import godObjectAntipatternRule from './design-patterns/god-object-antipattern.md'
import decoratorPatternRule from './design-patterns/decorator-pattern.md'
import extractMethodRule from './refactoring/extract-method.md'
import replaceMagicNumbersRule from './refactoring/replace-magic-numbers.md'
import introduceParameterObjectRule from './refactoring/introduce-parameter-object.md'
import decomposeConditionalRule from './refactoring/decompose-conditional.md'
import replaceTempWithQueryRule from './refactoring/replace-temp-with-query.md'

registry.registerGroup({
  id: 'software-design',
  name: 'Software Design',
  icon: '🏗️',
  description: 'Design Patterns, Architecture, Refactoring — how to structure code well',
  skills: [
    { id: 'design-patterns', description: 'GoF 23 patterns — Creational, Structural, Behavioral' },
    { id: 'software-architecture', description: 'Clean Architecture, Hexagonal, CQRS, Event-Driven' },
    { id: 'refactoring', description: 'Martin Fowler catalog — Extract, Move, Rename, Inline, and more' },
  ],
})

// ──────────────────────────────────────────────
// Skill: design-patterns
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'design-patterns',
  name: 'Design Patterns',
  groupId: 'software-design',
  description: 'GoF 23 design patterns — recognizing and applying proven solutions to recurring problems.',
  howToUse: `
- "Does this code follow a known design pattern?"
- "What pattern should I use for this problem?"
- "Review this implementation for pattern anti-patterns"
`,
  routingLogic: `
- Object creation complexity → Creational patterns
- Structural composition → Structural patterns
- Object communication/behavior → Behavioral patterns
- "Code smell" detection → Code Smells + refactoring patterns
`,
  rules: [
    {
      id: 'factory-pattern',
      priority: 'HIGH',
      content: factoryPatternRule,
    },
    {
      id: 'observer-pattern',
      priority: 'HIGH',
      content: observerPatternRule,
    },
    {
      id: 'strategy-pattern',
      priority: 'HIGH',
      content: strategyPatternRule,
    },
    {
      id: 'god-object-antipattern',
      priority: 'CRITICAL',
      content: godObjectAntipatternRule,
    },
    {
      id: 'decorator-pattern',
      priority: 'MEDIUM',
      content: decoratorPatternRule,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: software-architecture
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'software-architecture',
  name: 'Software Architecture',
  groupId: 'software-design',
  description: 'Clean Architecture, layering, dependency rules, CQRS, and event-driven patterns.',
  howToUse: `
- "Review this codebase for architecture violations"
- "Is this layer dependency correct?"
- "Should I use CQRS here?"
`,
  routingLogic: `
- Layer violations (domain importing infra) → software-architecture
- Dependency direction questions → software-architecture
- Event-driven / messaging design → software-architecture
`,
  rules: [
    {
      id: 'dependency-rule',
      priority: 'CRITICAL',
      content: `---
id: dependency-rule
priority: CRITICAL
tags: [clean-architecture, dependency, layers]
---

# Rule: Dependencies Must Point Inward (Dependency Rule)

## Context
In Clean Architecture, code in inner layers (domain/business) must NEVER depend on outer layers (infrastructure/frameworks). This is the cardinal rule.

## Layers (Inner → Outer)
\`\`\`
Entities (Domain)
    ↑ depended on by
Use Cases (Application)
    ↑ depended on by
Interface Adapters (Controllers, Repos)
    ↑ depended on by
Frameworks & Drivers (DB, HTTP, External APIs)
\`\`\`

## Bad ❌
\`\`\`
// domain/user.go importing database driver — VIOLATION!
import "gorm.io/gorm"  // Infrastructure in domain layer

type User struct {
    gorm.Model  // Domain depends on infrastructure!
    Name string
}
\`\`\`

## Good ✅
\`\`\`
// domain/user.go — pure domain, no external imports
type User struct {
    ID   string
    Name string
    Email string
}

// infrastructure/repository/user_repo.go — infra depends on domain
import "myapp/domain"
type UserRepo struct { db *gorm.DB }
func (r *UserRepo) FindByID(id string) (*domain.User, error) { ... }
\`\`\`
`,
    },
    {
      id: 'repository-pattern',
      priority: 'HIGH',
      content: `---
id: repository-pattern
priority: HIGH
tags: [repository, abstraction, testability]
---

# Rule: Use Repository to Abstract Data Access

## Context
Business logic should never directly query a database. The Repository pattern provides a domain-centric abstraction over data storage, making code testable and storage-agnostic.

## Bad ❌
\`\`\`
// Use case directly using GORM — couples business logic to database
func (uc *OrderUseCase) GetUserOrders(userID string) ([]*Order, error) {
    var orders []Order
    return orders, uc.db.Where("user_id = ? AND status != ?", userID, "deleted").Find(&orders).Error
}
\`\`\`

## Good ✅
\`\`\`
// Domain interface — use case only knows about this
type OrderRepository interface {
    FindByUserID(userID string) ([]*Order, error)
    Save(order *Order) error
}

// Use case depends on interface (testable!)
type OrderUseCase struct { repo OrderRepository }
func (uc *OrderUseCase) GetUserOrders(userID string) ([]*Order, error) {
    return uc.repo.FindByUserID(userID)
}

// Infrastructure implements the interface
type GormOrderRepo struct { db *gorm.DB }
func (r *GormOrderRepo) FindByUserID(userID string) ([]*Order, error) { ... }
\`\`\`
`,
    },
    {
      id: 'cqrs-pattern',
      priority: 'MEDIUM',
      content: `---
id: cqrs-pattern
priority: MEDIUM
tags: [cqrs, command, query, separation]
---

# Rule: Separate Read and Write Models with CQRS

## Context
Command Query Responsibility Segregation (CQRS) separates operations that change state (Commands) from operations that read state (Queries). This allows independent scaling and optimization.

## When to Use CQRS
- Read and write workloads have very different performance needs
- Complex domain with many business rules on writes
- Need audit trails / event sourcing
- Read models need different shapes than write models

## Basic Structure
\`\`\`
// Command (write) — validates and changes state
type CreateOrderCommand struct { UserID, Items string }
type CreateOrderHandler struct { repo OrderRepo }
func (h *CreateOrderHandler) Handle(cmd CreateOrderCommand) error { ... }

// Query (read) — optimized for display, no business rules
type GetOrdersQuery struct { UserID string }
type GetOrdersHandler struct { readDB *DB }
func (h *GetOrdersHandler) Handle(q GetOrdersQuery) ([]*OrderDTO, error) { ... }
\`\`\`

## When NOT to Use
Simple CRUD applications. CQRS adds complexity — only use when the benefits outweigh the overhead.
`,
    },
    {
      id: 'hexagonal-architecture',
      priority: 'HIGH',
      content: `---
id: hexagonal-architecture
priority: HIGH
tags: [architecture, hexagonal, ports-adapters]
---

# Rule: Use Ports and Adapters (Hexagonal) to Isolate Core Logic

## Context
The core application should not know about the delivery mechanism (HTTP, CLI, gRPC) or the storage mechanism (Postgres, MongoDB, Redis).

## Ports (Interfaces)
Define how the application communicates with the outside world.
- **Inbound Ports**: Interfaces the outside world uses to talk to the app (Use Cases).
- **Outbound Ports**: Interfaces the app uses to talk to the outside world (Repositories, external clients).

## Adapters (Implementations)
Implement the ports.
- **Inbound Adapters**: HTTP Handlers, gRPC servers, CLI commands.
- **Outbound Adapters**: SQL Repositories, Redis clients, third-party API clients.

## Why
This makes the application entirely agnostic of its environment. You can swap a REST API for a gRPC server, or Postgres for MongoDB, without touching a single line of business logic.
`,
    },
    {
      id: 'microservices-vs-monolith',
      priority: 'MEDIUM',
      content: `---
id: microservices-vs-monolith
priority: MEDIUM
tags: [architecture, microservices, monolith, tradeoff]
---

# Rule: Default to a Modular Monolith Before Microservices

## Context
Microservices solve organizational scaling problems, not just technical ones. They introduce immense operational complexity (network latency, distributed transactions, tracing, deployment overhead).

## Bad ❌
Starting a new project with 10 microservices for a team of 3 developers.

## Good ✅
Starting with a **Modular Monolith**:
1. Single deployment unit.
2. Strictly separated internal modules (enforced via linters or internal packages).
3. Modules communicate via in-memory interfaces, not network calls.

## When to Extract a Microservice
- When a specific module needs to scale independently (e.g., heavy image processing).
- When a module requires a different technology stack.
- When the team grows so large that coordinating deployments becomes a bottleneck.
`,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: refactoring
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'refactoring',
  name: 'Refactoring',
  groupId: 'software-design',
  description: 'Martin Fowler refactoring catalog — improving code structure without changing behavior.',
  howToUse: `
- "This function is too long, how should I refactor it?"
- "Identify refactoring opportunities in this code"
- "How do I remove this duplication?"
`,
  routingLogic: `
- Long functions/methods → Extract Method
- Duplicated code → Extract / DRY
- Complex conditionals → Decompose Conditional
- Too many parameters → Introduce Parameter Object
`,
  rules: [
    {
      id: 'extract-method',
      priority: 'HIGH',
      content: extractMethodRule,
    },
    {
      id: 'replace-magic-numbers',
      priority: 'MEDIUM',
      content: replaceMagicNumbersRule,
    },
    {
      id: 'introduce-parameter-object',
      priority: 'MEDIUM',
      content: introduceParameterObjectRule,
    },
    {
      id: 'decompose-conditional',
      priority: 'HIGH',
      content: decomposeConditionalRule,
    },
    {
      id: 'replace-temp-with-query',
      priority: 'MEDIUM',
      content: replaceTempWithQueryRule,
    },
  ],
})
