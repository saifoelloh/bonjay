---
id: stack-vs-heap
priority: HIGH
tags: [memory, stack, heap, allocation]
---

# Rule: Understand Stack vs Heap Allocation

## Stack
- **Fast** — allocation/deallocation is just moving a pointer
- **Automatic** — cleaned up when function returns
- **Limited** — typically 1-8MB per thread
- Best for: small, short-lived values (function locals, small structs)

## Heap
- **Slower** — requires allocator + GC tracking
- **Explicit** (in manual-memory languages) or **GC'd** (Go, Java, JS)
- **Large** — limited only by available RAM
- Best for: large data, data that outlives function scope, dynamic sizes

## In GC Languages (Go, Java, JavaScript)
- Compiler/runtime decides stack vs heap (escape analysis)
- Values that escape a function go to heap automatically
- Reducing heap allocations → less GC pressure → better performance

## Go Escape Analysis
```
// Stack allocated — value doesn't escape
func sum(a, b int) int { return a + b }

// Heap allocated — pointer escapes function scope
func newUser(name string) *User {
    return &User{Name: name}  // Escapes to heap (returned pointer)
}
```
