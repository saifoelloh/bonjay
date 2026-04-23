---
id: dynamic-programming-pattern
priority: HIGH
tags: [dynamic-programming, memoization, optimization]
---

# Rule: Recognize and Apply Dynamic Programming

## Context
DP applies when a problem has: 1) overlapping subproblems, 2) optimal substructure. Without DP, solutions are often exponential. With DP, they become polynomial.

## Identifying DP Problems
- "Maximum/minimum" of something
- "How many ways" to do something
- "Can we reach/achieve" something
- Subproblems repeat (you recalculate the same thing)

## Two Approaches

### Top-Down (Memoization)
```
memo = {}
def solve(state):
    if state in memo: return memo[state]
    # base case
    if is_base(state): return base_value
    # recursive case
    result = combine(solve(sub1), solve(sub2))
    memo[state] = result
    return result
```

### Bottom-Up (Tabulation)
```
dp = [0] * (n + 1)
dp[0] = base_case
for i in range(1, n + 1):
    dp[i] = dp[i-1] + dp[i-2]  // or whatever the recurrence is
```

## Rule
Start with top-down (easier to reason about), optimize to bottom-up if needed for space.
