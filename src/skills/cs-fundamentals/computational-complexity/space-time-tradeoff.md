---
id: space-time-tradeoff
priority: HIGH
tags: [complexity, memory, tradeoff]
---

# Rule: Recognize Space-Time Tradeoffs

## Context
Often, you can make code faster by using more memory, or use less memory at the cost of speed. Understanding this tradeoff is critical.

## Principle
Caching (memoization) is the most common space-time tradeoff: store computed results to avoid recomputation.

## Bad ❌ (Exponential time, O(1) space)
```
function fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)  // O(2ⁿ) — recalculates everything
```

## Good ✅ (Linear time, O(n) space)
```
cache = {}
function fib(n):
    if n in cache: return cache[n]  // O(1) lookup
    cache[n] = fib(n-1) + fib(n-2)
    return cache[n]
```

## Why
The memoized version reduces Fibonacci from O(2ⁿ) to O(n) time, using O(n) extra space. For fib(50), that's the difference between seconds and nanoseconds.
