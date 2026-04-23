---
id: understand-big-o
priority: HIGH
tags: [complexity, big-o, performance]
---

# Rule: Understand and Communicate Big O Complexity

## Context
Every non-trivial algorithm has a measurable growth rate. Failing to reason about complexity leads to code that works in development but collapses under real-world load.

## Common Complexities (Best → Worst)

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | HashMap lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci (naive) |
| O(n!) | Factorial | Brute-force permutations |

## Bad ❌
```
// O(n²) — checking duplicates with nested loop
for item in list:
    for other in list:
        if item == other and item != other: ...
```

## Good ✅
```
// O(n) — using a hash set
seen = {}
for item in list:
    if item in seen: return true
    seen[item] = true
```

## Why
The nested loop approach is 10,000x slower on 10,000 items vs the hash set approach. Always reason about the worst-case growth rate before choosing an approach.
