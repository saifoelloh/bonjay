---
id: memory-leak-patterns
priority: CRITICAL
tags: [memory, memory-leak, goroutine, gc]
---

# Rule: Know the Common Memory Leak Patterns

## Pattern 1: Goroutine Leaks (Go)
```
// Goroutine blocked forever = memory never freed
go func() {
    result := <-someChannel  // If channel is never sent to, this leaks!
}()
```
Fix: Always use context cancellation.

## Pattern 2: Event Listener Not Removed
```
// JavaScript — listener added but never removed
element.addEventListener('click', handler)
// When element is "removed", handler still holds reference to it
```
Fix: Remove listeners in cleanup/destructor.

## Pattern 3: Cache Without Eviction
```
cache := make(map[string]*LargeObject)
// Items added but never removed — grows forever
```
Fix: Use LRU cache with max size, or add TTL expiry.

## Pattern 4: Closed-Over References
```
// Closure captures the entire outer object, preventing GC
let cache = [];
function createHandler(bigData) {
    return function() { /* uses only 1 field of bigData */ };
    // bigData cannot be GC'd as long as handler exists!
}
```
Fix: Capture only what you need, not the whole object.
