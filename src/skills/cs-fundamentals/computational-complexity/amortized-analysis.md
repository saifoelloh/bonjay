---
id: amortized-analysis
priority: MEDIUM
tags: [complexity, amortized, arrays]
---

# Rule: Understand Amortized Complexity

## Context
Some operations are occasionally expensive but cheap on average. Dynamic arrays (like slices in Go, ArrayList in Java) use amortized O(1) for append.

## Example
A dynamic array doubles capacity when full. Most appends are O(1), but occasionally one is O(n) to copy. Amortized over all operations: O(1).

## Practical Rule
When you see occasional O(n) in an otherwise O(1) operation, check if it's amortized. Don't prematurely optimize unless the expensive case happens frequently.
