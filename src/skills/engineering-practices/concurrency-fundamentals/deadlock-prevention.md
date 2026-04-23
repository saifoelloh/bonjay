---
id: deadlock-prevention
priority: CRITICAL
tags: [concurrency, deadlock, mutex]
---

# Rule: Prevent Deadlocks — Always Acquire Locks in the Same Order

## Context
A deadlock occurs when two goroutines each hold a lock the other needs, causing both to wait forever.

## Classic Deadlock Pattern
```
// Goroutine 1          Goroutine 2
locks A                 locks B
waits for B    ←→      waits for A
// Neither can proceed — deadlock!
```

## Prevention Rules
1. **Always acquire multiple locks in the same order** across all goroutines
2. **Use defer for unlock** — ensures unlock even if function panics
3. **Prefer single locks** over multiple locks when possible
4. **Use timeout contexts** to detect deadlocks in production

## Bad ❌
```
// Goroutine 1: locks A then B
muA.Lock(); muB.Lock()

// Goroutine 2: locks B then A — different order = potential deadlock
muB.Lock(); muA.Lock()
```

## Good ✅
```
// Both goroutines lock in the same order: A → B
func transfer(from, to *Account, amount float64) {
    muA.Lock()
    defer muA.Unlock()
    muB.Lock()
    defer muB.Unlock()
    // ...
}
```
