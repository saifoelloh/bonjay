---
id: avoid-hidden-complexity
priority: CRITICAL
tags: [complexity, loops, performance]
---

# Rule: Beware of Hidden Complexity Inside Loops

## Context
Calling an O(n) operation inside a loop creates O(n²) total complexity. This is often not obvious when the inner operation is a library call or method.

## Bad ❌
```
// Looks like O(n), but list.contains() is O(n) → total: O(n²)
for item in items:
    if expensive_list.contains(item):  // O(n) hidden here!
        process(item)
```

## Good ✅
```
// Convert to Set first → O(n) total
lookup = Set(expensive_list)  // O(n) once
for item in items:             // O(n)
    if item in lookup:         // O(1)
        process(item)
```

## Why
Always ask: "What is the complexity of every call inside this loop?" Library methods, database queries, and API calls inside loops are common sources of hidden O(n²) or worse.
