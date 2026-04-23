---
id: binary-search-pattern
priority: HIGH
tags: [searching, binary-search, sorted]
---

# Rule: Use Binary Search on Sorted Data — Always O(log n)

## Context
Linear search is O(n). Binary search is O(log n). On sorted data, always use binary search.

## Template
```
left, right = 0, len(arr) - 1
while left <= right:
    mid = left + (right - left) // 2  // Avoid integer overflow
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1  // Not found
```

## Common Mistakes
1. **Off-by-one errors** — use `left <= right` not `left < right`
2. **Integer overflow** — use `mid = left + (right - left) // 2`, not `(left + right) // 2`
3. **Unsorted input** — binary search requires sorted data!

## When to Use
Any time you have a monotonic condition: "find the first element where X is true" — binary search on the answer.
