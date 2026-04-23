---
id: escape-analysis
priority: HIGH
tags: [memory, escape-analysis, allocation]
---

# Rule: Avoid Unnecessary Heap Allocations (Escape Analysis)

## Context
In GC languages, short-lived heap allocations create garbage, which causes GC pauses. Keeping data on the stack is practically free.

## How Pointers Cause Escapes
Returning a pointer to a local variable forces the compiler to move it to the heap.

## Bad ❌
```
// Returning a pointer forces 'User' to the heap
func makeUser() *User {
    u := User{Name: "Bob"}
    return &u 
}
```

## Good ✅
```
// Returning a value keeps it on the stack
func makeUser() User {
    return User{Name: "Bob"}
}
```

## Rule
Pass by value unless the struct is massive or you need to mutate it. Don't use pointers "for performance" without profiling — it often makes things slower due to GC overhead.
