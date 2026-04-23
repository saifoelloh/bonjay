---
id: object-pools
priority: MEDIUM
tags: [memory, object-pool, gc-pressure]
---

# Rule: Use Object Pools for High-Frequency Allocations

## Context
When your application creates and destroys millions of the same object type per second, the Garbage Collector will struggle to keep up.

## Solution: sync.Pool (Go)
Reuse objects instead of allocating new ones.

```
var bufferPool = sync.Pool{
    New: func() interface{} { return new(bytes.Buffer) },
}

func handleRequest() {
    // Get from pool instead of allocating
    buf := bufferPool.Get().(*bytes.Buffer)
    buf.Reset() // Always reset before use!
    
    defer bufferPool.Put(buf) // Return to pool when done
    
    // ... use buf
}
```

## When NOT to use
Do not use object pools for long-lived objects or low-frequency allocations. It adds complexity and can cause memory leaks if objects aren't reset properly.
