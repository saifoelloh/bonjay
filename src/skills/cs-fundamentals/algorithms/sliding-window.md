---
id: sliding-window
priority: HIGH
tags: [algorithms, sliding-window, subarray, optimization]
---

# Rule: Use Sliding Window for Contiguous Subarray Problems

## Context
Problems asking for the maximum/minimum/sum of a contiguous subarray of size k can be solved in O(n) with a sliding window, instead of O(n²) with nested loops.

## Fixed Window
```
window_sum = sum(arr[:k])
max_sum = window_sum
for i in range(k, len(arr)):
    window_sum += arr[i] - arr[i - k]  // Slide: add new, remove old
    max_sum = max(max_sum, window_sum)
```

## Variable Window (expand/shrink)
```
left = 0
for right in range(len(arr)):
    // Expand window
    window.add(arr[right])
    // Shrink if constraint violated
    while not valid(window):
        window.remove(arr[left])
        left += 1
    // Update result
    result = max(result, right - left + 1)
```

## Use Cases
Longest substring without repeating characters, minimum size subarray sum, maximum sum subarray of size K.
