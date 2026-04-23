import { registry } from '../registry.js'

import acidPropertiesRule from './database-fundamentals/acid-properties.md'
import indexingStrategyRule from './database-fundamentals/indexing-strategy.md'
import nPlusOneProblemRule from './database-fundamentals/n-plus-one-problem.md'
import capTheoremRule from './database-fundamentals/cap-theorem.md'
import dbConnectionPoolingRule from './database-fundamentals/db-connection-pooling.md'
import stackVsHeapRule from './memory-management/stack-vs-heap.md'
import memoryLeakPatternsRule from './memory-management/memory-leak-patterns.md'
import escapeAnalysisRule from './memory-management/escape-analysis.md'
import largeObjectAllocationRule from './memory-management/large-object-allocation.md'
import objectPoolsRule from './memory-management/object-pools.md'

registry.registerGroup({
  id: 'data-and-systems',
  name: 'Data & Systems',
  icon: '🗃️',
  description: 'Database, API Design, Memory Management — working with data and systems',
  skills: [
    { id: 'database-fundamentals', description: 'ACID, normalization, indexing, N+1, CAP theorem' },
    { id: 'api-design', description: 'REST principles, gRPC, versioning, pagination, error handling' },
    { id: 'memory-management', description: 'Stack vs Heap, garbage collection, memory leaks, pointers' },
  ],
})

// ──────────────────────────────────────────────
// Skill: database-fundamentals
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'database-fundamentals',
  name: 'Database Fundamentals',
  groupId: 'data-and-systems',
  description: 'ACID properties, normalization, indexing strategies, N+1 problems, and CAP theorem.',
  howToUse: `
- "Review this database schema"
- "Is this query efficient?"
- "Do I need an index here?"
`,
  routingLogic: `
- Database schema design → database-fundamentals
- Query performance → database-fundamentals + query-performance
- Transaction questions → ACID rules
- N+1 detection → database-fundamentals
`,
  rules: [
    {
      id: 'acid-properties',
      priority: 'CRITICAL',
      content: acidPropertiesRule,
    },
    {
      id: 'indexing-strategy',
      priority: 'HIGH',
      content: indexingStrategyRule,
    },
    {
      id: 'n-plus-one-problem',
      priority: 'CRITICAL',
      content: nPlusOneProblemRule,
    },
    {
      id: 'cap-theorem',
      priority: 'MEDIUM',
      content: capTheoremRule,
    },
    {
      id: 'db-connection-pooling',
      priority: 'HIGH',
      content: dbConnectionPoolingRule,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: api-design
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'api-design',
  name: 'API Design',
  groupId: 'data-and-systems',
  description: 'REST principles, error handling standards, versioning, pagination, and API contracts.',
  howToUse: `
- "Review this API endpoint design"
- "Is this REST-compliant?"
- "How should I handle errors in this API?"
`,
  routingLogic: `
- REST endpoint design → api-design
- HTTP status codes → api-design
- API versioning → api-design
- Pagination design → api-design
`,
  rules: [
    {
      id: 'rest-resource-naming',
      priority: 'HIGH',
      content: `---
id: rest-resource-naming
priority: HIGH
tags: [rest, api, naming, resources]
---

# Rule: Name REST Resources as Nouns, Not Verbs

## Context
REST APIs represent resources (things), not actions (verbs). The HTTP method provides the action.

## Rules
1. Use **nouns** for resource names, not verbs
2. Use **plural** for collections
3. Use **lowercase** with hyphens (not camelCase or underscores)
4. Nest resources to show relationships

## Bad ❌
\`\`\`
GET /getUser/123
POST /createOrder
PUT /updateOrderStatus/456
DELETE /deleteProduct/789
POST /sendEmail
\`\`\`

## Good ✅
\`\`\`
GET    /users/123              # Get user
POST   /orders                 # Create order
PATCH  /orders/456/status      # Update order status
DELETE /products/789           # Delete product
POST   /emails                 # Send email (email is a resource)
GET    /users/123/orders        # User's orders (nested)
\`\`\`
`,
    },
    {
      id: 'http-status-codes',
      priority: 'HIGH',
      content: `---
id: http-status-codes
priority: HIGH
tags: [rest, http, status-codes, error-handling]
---

# Rule: Use HTTP Status Codes Correctly

## Quick Reference

| Code | Meaning | When to Use |
|---|---|---|
| 200 OK | Success | GET, PUT, PATCH success |
| 201 Created | Resource created | POST success |
| 204 No Content | Success, no body | DELETE success |
| 400 Bad Request | Client error | Invalid input, validation fail |
| 401 Unauthorized | Not authenticated | No/invalid token |
| 403 Forbidden | Not authorized | Valid token, but no permission |
| 404 Not Found | Resource missing | ID doesn't exist |
| 409 Conflict | State conflict | Duplicate entry, version conflict |
| 422 Unprocessable | Semantic validation fail | Business rule violation |
| 429 Too Many Requests | Rate limited | Throttling |
| 500 Internal Server Error | Server bug | Unexpected errors |

## Common Mistakes
- Using 200 for errors (returning \`{ "error": "not found" }\` with 200 status)
- Using 400 for authorization errors (should be 401 or 403)
- Using 500 for client errors (validation failures should be 400/422)
`,
    },
    {
      id: 'api-pagination',
      priority: 'MEDIUM',
      content: `---
id: api-pagination
priority: MEDIUM
tags: [rest, api, pagination, performance]
---

# Rule: Always Paginate List Endpoints

## Context
Returning all records from a list endpoint is a performance time bomb. As data grows, the response size and query time grow with it.

## Cursor-Based (Recommended for large datasets)
\`\`\`json
GET /orders?cursor=eyJpZCI6MTAwfQ&limit=20

{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTIwfQ",
    "has_more": true
  }
}
\`\`\`

## Offset-Based (Simpler, good for smaller datasets)
\`\`\`json
GET /orders?page=2&limit=20

{
  "data": [...],
  "pagination": {
    "total": 500,
    "page": 2,
    "limit": 20,
    "total_pages": 25
  }
}
\`\`\`

## Rules
1. Always have a default limit (e.g., 20)
2. Always have a maximum limit (e.g., 100)
3. Cursor-based pagination is more consistent for real-time data
4. Include metadata so clients know if there's more data
`,
    },
    {
      id: 'api-versioning',
      priority: 'HIGH',
      content: `---
id: api-versioning
priority: HIGH
tags: [rest, api, versioning, backwards-compatibility]
---

# Rule: Version Your APIs from Day One

## Context
Once an API is consumed by clients, changing its structure breaks those clients. You must version APIs to allow safe evolution.

## Good ✅ — URI Versioning (Most Common)
\`\`\`
GET /v1/users/123
POST /v2/orders
\`\`\`

## Breaking Changes that Require a New Version
- Renaming or removing a field
- Changing a field's data type (string to int)
- Making an optional field required
- Changing the URL structure

## Non-Breaking Changes (No new version needed)
- Adding new optional fields to a response
- Adding new endpoints
`,
    },
    {
      id: 'idempotency-keys',
      priority: 'CRITICAL',
      content: `---
id: idempotency-keys
priority: CRITICAL
tags: [rest, api, idempotency, retries]
---

# Rule: Require Idempotency Keys for State-Changing Operations

## Context
Networks are unreliable. A client might send a POST request, the server processes it successfully, but the network drops the response. The client retries. Without idempotency, they just charged the credit card twice.

## How it works
1. Client generates a unique UUID (Idempotency Key) for the operation.
2. Client sends \`Idempotency-Key: <uuid>\` header with the POST request.
3. Server checks if it has seen this key before.
   - If yes: return the saved response from the first attempt.
   - If no: process the request, save the response mapped to the key, return it.

## Rule
All endpoints that handle payments, emails, or critical state transitions must be idempotent.
`,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: memory-management
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'memory-management',
  name: 'Memory Management',
  groupId: 'data-and-systems',
  description: 'Stack vs Heap, garbage collection, memory leaks, and pointer/reference semantics.',
  howToUse: `
- "Review this code for memory leaks"
- "Should I use a pointer or value here?"
- "Why is memory usage growing over time?"
`,
  routingLogic: `
- Memory leak suspicion → memory-management
- Pointer vs value choice → memory-management
- GC pressure → memory-management
`,
  rules: [
    {
      id: 'stack-vs-heap',
      priority: 'HIGH',
      content: stackVsHeapRule,
    },
    {
      id: 'memory-leak-patterns',
      priority: 'CRITICAL',
      content: memoryLeakPatternsRule,
    },
    {
      id: 'escape-analysis',
      priority: 'HIGH',
      content: escapeAnalysisRule,
    },
    {
      id: 'large-object-allocation',
      priority: 'HIGH',
      content: largeObjectAllocationRule,
    },
    {
      id: 'object-pools',
      priority: 'MEDIUM',
      content: objectPoolsRule,
    },
  ],
})
