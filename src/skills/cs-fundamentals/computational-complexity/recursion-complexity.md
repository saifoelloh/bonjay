---
id: recursion-complexity
priority: HIGH
tags: [complexity, recursion, trees]
---

# Rule: Always Analyze Recursive Call Trees

## Context
Recursive algorithms often hide their true complexity. A function calling itself twice per step creates an exponential O(2ⁿ) call tree.

## Rule of Thumb
For recursive functions, Time Complexity = (Branches per node) ^ (Depth of tree).
- 1 branch (e.g. binary search): O(log n) or O(n)
- 2 branches (e.g. naive Fibonacci): O(2ⁿ)

## Bad ❌
```
// 2 branches per call, depth N -> O(2ⁿ) time
func solve(n int) int {
    if n <= 1 { return 1 }
    return solve(n-1) + solve(n-2)
}
```

## Good ✅
```
// Memoization reduces it to O(n)
func solve(n int, memo map[int]int) int {
    if n <= 1 { return 1 }
    if val, ok := memo[n]; ok { return val }
    memo[n] = solve(n-1, memo) + solve(n-2, memo)
    return memo[n]
}
```
