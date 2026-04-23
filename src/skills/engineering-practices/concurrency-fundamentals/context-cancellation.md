---
id: context-cancellation
priority: CRITICAL
tags: [concurrency, context, cancellation, timeout]
---

# Rule: Always Propagate Context for Cancellation and Timeouts

## Context
When a user cancels a request or a timeout is reached, all concurrent work spawned by that request should stop immediately to free resources.

## Bad ❌
```
func ProcessRequest(req Request) {
    // If DB takes 10s, but user disconnected after 1s, we still waste 9s of DB time
    db.ExecuteLongQuery() 
    api.FetchExternalData()
}
```

## Good ✅
```
func ProcessRequest(ctx context.Context, req Request) {
    // Passes context down. If ctx is cancelled, DB and API calls abort immediately.
    db.ExecuteLongQuery(ctx)
    api.FetchExternalData(ctx)
}
```

## Rule
The first argument to any function that does I/O or takes significant time should be `ctx context.Context`. Always pass it down the call stack.
