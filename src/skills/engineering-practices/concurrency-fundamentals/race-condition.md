---
id: race-condition
priority: CRITICAL
tags: [concurrency, race-condition, mutex]
---

# Rule: Protect Shared State with Synchronization

## Context
A race condition occurs when two concurrent operations access shared state, and at least one is a write, without synchronization. Results are unpredictable and non-deterministic.

## Detection
- Multiple goroutines/threads accessing the same variable
- At least one access is a write (not just reads)
- No mutex, lock, or atomic operation protecting access

## Bad ❌
```
var counter int  // Shared state

func increment() {
    for i := 0; i < 1000; i++ {
        counter++  // NOT thread-safe! Read-modify-write is 3 operations
    }
}

go increment()
go increment()  // Race condition — final value is unpredictable
```

## Good ✅
```
var (
    counter int
    mu      sync.Mutex
)

func increment() {
    for i := 0; i < 1000; i++ {
        mu.Lock()
        counter++
        mu.Unlock()
    }
}
```

## Or use atomics for simple counters:
```
var counter atomic.Int64
counter.Add(1)  // Thread-safe, no lock needed
```
