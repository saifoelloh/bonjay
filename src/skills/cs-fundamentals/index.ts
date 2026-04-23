import { registry } from '../registry.js'

import understandBigORule from './computational-complexity/understand-big-o.md'
import spaceTimeTradeoffRule from './computational-complexity/space-time-tradeoff.md'
import avoidHiddenComplexityRule from './computational-complexity/avoid-hidden-complexity.md'
import amortizedAnalysisRule from './computational-complexity/amortized-analysis.md'
import recursionComplexityRule from './computational-complexity/recursion-complexity.md'
import binarySearchPatternRule from './algorithms/binary-search-pattern.md'
import dynamicProgrammingPatternRule from './algorithms/dynamic-programming-pattern.md'
import greedyWhenToUseRule from './algorithms/greedy-when-to-use.md'
import twoPointerTechniqueRule from './algorithms/two-pointer-technique.md'
import slidingWindowRule from './algorithms/sliding-window.md'

registry.registerGroup({
  id: 'cs-fundamentals',
  name: 'CS Fundamentals',
  icon: '📦',
  description: 'Big O, Data Structures, Algorithms — the language-agnostic foundation',
  skills: [
    { id: 'computational-complexity', description: 'Big O notation, time & space complexity analysis' },
    { id: 'data-structures', description: 'Array, LinkedList, Stack, Queue, HashMap, Tree, Graph, Heap' },
    { id: 'algorithms', description: 'Sorting, Searching, Dynamic Programming, Greedy, Divide & Conquer' },
  ],
})

// ──────────────────────────────────────────────
// Skill: computational-complexity
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'computational-complexity',
  name: 'Computational Complexity',
  groupId: 'cs-fundamentals',
  description: 'Big O notation, time & space complexity analysis and tradeoffs.',
  longDescription: 'Teaches AI to reason about algorithm efficiency — how code scales as input grows, and how to evaluate time vs space tradeoffs.',
  howToUse: `
- "Analyze the time complexity of this function"
- "Is there a more efficient approach with better Big O?"
- "What's the space complexity of this algorithm?"
`,
  routingLogic: `
- Loops, nested loops, recursion → complexity analysis
- "Is this efficient?" / "Will this scale?" → complexity review
- Sorting, searching implementations → Big O evaluation
`,
  rules: [
    {
      id: 'understand-big-o',
      priority: 'HIGH',
      content: understandBigORule,
    },
    {
      id: 'space-time-tradeoff',
      priority: 'HIGH',
      content: spaceTimeTradeoffRule,
    },
    {
      id: 'avoid-hidden-complexity',
      priority: 'CRITICAL',
      content: avoidHiddenComplexityRule,
    },
    {
      id: 'amortized-analysis',
      priority: 'MEDIUM',
      content: amortizedAnalysisRule,
    },
    {
      id: 'recursion-complexity',
      priority: 'HIGH',
      content: recursionComplexityRule,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: data-structures
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'data-structures',
  name: 'Data Structures',
  groupId: 'cs-fundamentals',
  description: 'Choosing and using the right data structure for the right problem.',
  longDescription: 'The right data structure can make the difference between O(1) and O(n) operations. This skill covers selection, tradeoffs, and common patterns.',
  howToUse: `
- "What data structure should I use for this use case?"
- "Review my use of maps/arrays/trees here"
- "Is there a better structure for fast lookups?"
`,
  routingLogic: `
- Choosing between list/map/set/tree → data-structures
- Lookup performance questions → data-structures
- "How should I organize this data?" → data-structures
`,
  rules: [
    {
      id: 'choose-right-structure',
      priority: 'HIGH',
      content: `---
id: choose-right-structure
priority: HIGH
tags: [data-structures, selection, performance]
---

# Rule: Choose Data Structures Based on Access Patterns

## Quick Reference

| Need | Best Structure | Lookup | Insert | Delete |
|---|---|---|---|---|
| Fast key lookup | HashMap / HashSet | O(1) | O(1) | O(1) |
| Ordered data | Array / Slice | O(1) index | O(n) | O(n) |
| Sorted data | Balanced BST | O(log n) | O(log n) | O(log n) |
| LIFO (undo/stack) | Stack | O(1) top | O(1) | O(1) |
| FIFO (queues) | Queue / Deque | O(1) front | O(1) | O(1) |
| Priority ordering | Heap / PriorityQueue | O(1) min/max | O(log n) | O(log n) |
| Graph relationships | Adjacency List | O(V+E) | O(1) | O(E) |

## Bad ❌
\`\`\`
// Using array for fast membership checks
users = [user1, user2, user3, ...]
if target_id in users:  // O(n) linear scan every time!
    ...
\`\`\`

## Good ✅
\`\`\`
// Use a set for O(1) membership
user_ids = Set([user1.id, user2.id, ...])
if target_id in user_ids:  // O(1)
    ...
\`\`\`
`,
    },
    {
      id: 'hashmap-collision',
      priority: 'MEDIUM',
      content: `---
id: hashmap-collision
priority: MEDIUM
tags: [hashmap, hashing, performance]
---

# Rule: Understand Hash Collisions and Load Factor

## Context
HashMaps achieve O(1) average-case lookup, but degrade to O(n) in the worst case due to collisions. High load factors cause more collisions.

## Key Concepts
- **Load Factor** = elements / capacity. Most implementations resize at ~0.75
- **Collision** = two keys hash to the same bucket
- **Rehashing** = resizing the underlying array (O(n) operation, amortized)

## Practical Rules
1. Use keys with good hash distribution (avoid using mutable objects as keys)
2. Pre-size maps when you know approximate capacity upfront
3. Beware of maps keyed by floating-point numbers (precision issues)

## Bad ❌
\`\`\`
// Keying by a mutable list — hash can change!
cache = {}
key = [1, 2, 3]  // mutable
cache[key] = "value"  // Will fail or give wrong results
\`\`\`

## Good ✅
\`\`\`
// Use immutable, hashable keys
cache = {}
key = (1, 2, 3)  // tuple (immutable)
cache[key] = "value"
\`\`\`
`,
    },
    {
      id: 'stack-vs-heap-memory',
      priority: 'HIGH',
      content: `---
id: stack-vs-heap-memory
priority: HIGH
tags: [stack, queue, usage]
---

# Rule: Use Stack for LIFO, Queue for FIFO — Don't Improvise

## Context
Stacks and queues are simple but frequently misused. Using a plain array for a queue leads to O(n) dequeue operations.

## Stack (LIFO) — Last In, First Out
Use for: undo/redo, call stack simulation, DFS traversal, bracket matching.

## Queue (FIFO) — First In, First Out
Use for: BFS traversal, job queues, rate limiting, event processing.

## Bad ❌
\`\`\`
// Using array as queue — O(n) dequeue!
queue = []
queue.append(item)    // O(1)
queue.pop(0)          // O(n) — shifts entire array!
\`\`\`

## Good ✅
\`\`\`
// Use deque for O(1) on both ends
from collections import deque
queue = deque()
queue.append(item)     // O(1)
queue.popleft()        // O(1)
\`\`\`
`,
    },
    {
      id: 'tree-traversal-patterns',
      priority: 'HIGH',
      content: `---
id: tree-traversal-patterns
priority: HIGH
tags: [tree, traversal, dfs, bfs]
---

# Rule: Choose the Right Tree Traversal Strategy

## Traversal Types

| Type | Order | Best For |
|---|---|---|
| **In-order** (DFS) | Left → Root → Right | BST sorted output |
| **Pre-order** (DFS) | Root → Left → Right | Copy/serialize tree |
| **Post-order** (DFS) | Left → Right → Root | Delete tree, eval expression |
| **BFS (Level-order)** | Level by level | Shortest path, closest node |

## Key Rule
- Use **DFS** when you need to explore depth first (recursion is natural)
- Use **BFS** when you need the shortest path or closest result (use a queue)

## Bad ❌
\`\`\`
// Using DFS to find shortest path — WRONG!
// DFS finds A path, not necessarily the SHORTEST path
\`\`\`

## Good ✅
\`\`\`
// BFS always finds shortest path in unweighted graphs
def bfs(root, target):
    queue = deque([root])
    visited = set()
    while queue:
        node = queue.popleft()
        if node == target: return True
        for child in node.children:
            if child not in visited:
                visited.add(child)
                queue.append(child)
\`\`\`
`,
    },
    {
      id: 'heap-priority-queue',
      priority: 'MEDIUM',
      content: `---
id: heap-priority-queue
priority: MEDIUM
tags: [heap, priority-queue, scheduling]
---

# Rule: Use Heaps for Efficient Min/Max Retrieval

## Context
When you need to repeatedly get the minimum or maximum element from a collection, a heap (priority queue) is O(log n) insert/delete vs O(n) for an unsorted array.

## Use Cases
- Task scheduling (process highest priority first)
- Dijkstra's shortest path algorithm
- Median maintenance (two heaps)
- Top-K problems

## Bad ❌
\`\`\`
// Sorting to find min every time — O(n log n) per iteration
for _ in range(k):
    items.sort()      // O(n log n) — too slow!
    result.append(items.pop(0))
\`\`\`

## Good ✅
\`\`\`
// Use a min-heap — O(log n) per operation
import heapq
heap = list(items)
heapq.heapify(heap)  // O(n) once
for _ in range(k):
    result.append(heapq.heappop(heap))  // O(log n)
\`\`\`
`,
    },
  ],
})

// ──────────────────────────────────────────────
// Skill: algorithms
// ──────────────────────────────────────────────
registry.registerSkill({
  id: 'algorithms',
  name: 'Algorithms',
  groupId: 'cs-fundamentals',
  description: 'Sorting, searching, dynamic programming, greedy, and divide & conquer strategies.',
  howToUse: `
- "What algorithm should I use to solve this?"
- "Is there a more efficient approach?"
- "Review this sorting / searching implementation"
`,
  routingLogic: `
- Sorting implementations → algorithms
- Search problems (find, locate, filter) → algorithms
- Optimization problems → dynamic programming / greedy
- "Split and conquer" patterns → divide & conquer
`,
  rules: [
    {
      id: 'binary-search-pattern',
      priority: 'HIGH',
      content: binarySearchPatternRule,
    },
    {
      id: 'dynamic-programming-pattern',
      priority: 'HIGH',
      content: dynamicProgrammingPatternRule,
    },
    {
      id: 'greedy-when-to-use',
      priority: 'MEDIUM',
      content: greedyWhenToUseRule,
    },
    {
      id: 'two-pointer-technique',
      priority: 'HIGH',
      content: twoPointerTechniqueRule,
    },
    {
      id: 'sliding-window',
      priority: 'HIGH',
      content: slidingWindowRule,
    },
  ],
})
