---
id: two-pointer-technique
priority: HIGH
tags: [algorithms, two-pointer, arrays, optimization]
---

# Rule: Use Two Pointers to Reduce O(n²) to O(n)

## Context
Many problems that naively require nested loops can be solved in O(n) with two pointers moving toward each other or in the same direction.

## Pattern
```
left, right = 0, len(arr) - 1
while left < right:
    current = arr[left] + arr[right]
    if current == target:
        return (left, right)
    elif current < target:
        left += 1   // Need bigger sum
    else:
        right -= 1  // Need smaller sum
```

## When to Use
- Two sum on sorted array
- Palindrome check
- Container with most water
- Remove duplicates from sorted array
- Merge two sorted arrays

## Key Requirement
Usually requires sorted input or a specific monotonic property.
