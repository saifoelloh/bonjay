---
id: goroutine-leak
priority: CRITICAL
tags: [concurrency, goroutine-leak, context, channels]
---

# Rule: Always Provide a Way for Goroutines to Exit

## Context
A goroutine that blocks forever waiting for input that never comes is a "goroutine leak." Leaks accumulate over time, exhausting memory and CPU.

## Common Causes
- Channel receive with no sender and no cancel mechanism
- Infinite loop with no exit condition
- Waiting on a mutex that's never released

## Bad ❌
```
func startWorker(jobs <-chan Job) {
    go func() {
        for job := range jobs {  // Blocks forever if channel is never closed!
            process(job)
        }
    }()
}
```

## Good ✅
```
func startWorker(ctx context.Context, jobs <-chan Job) {
    go func() {
        for {
            select {
            case job, ok := <-jobs:
                if !ok { return }  // Channel closed — clean exit
                process(job)
            case <-ctx.Done():    // Context cancelled — clean exit
                return
            }
        }
    }()
}
```

## Rule
Every goroutine must have an observable, reachable exit condition. Use context cancellation as the primary mechanism.
