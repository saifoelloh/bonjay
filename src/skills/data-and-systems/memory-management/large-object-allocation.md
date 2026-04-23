---
id: large-object-allocation
priority: HIGH
tags: [memory, arrays, capacity, allocation]
---

# Rule: Pre-allocate Capacity for Dynamic Arrays

## Context
When a dynamic array (slice/ArrayList) exceeds its capacity, it must allocate a new, larger backing array and copy all elements over.

## Bad ❌
```
var result []User
for _, id := range userIDs {
    // Reallocates and copies multiple times as it grows
    result = append(result, fetchUser(id))
}
```

## Good ✅
```
// Pre-allocate the exact capacity needed
result := make([]User, 0, len(userIDs))
for _, id := range userIDs {
    result = append(result, fetchUser(id))
}
```
