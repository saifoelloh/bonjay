---
id: introduce-parameter-object
priority: MEDIUM
tags: [refactoring, parameter-object, long-parameter-list]
---

# Rule: Replace Long Parameter Lists with Parameter Objects

## Context
Functions with more than 3-4 parameters are hard to call correctly, hard to remember the order, and painful to extend.

## Bad ❌
```
func createUser(name, email, phone, address, city, country string, age int, newsletter bool) error {
    // ...
}

// Caller — what does 'true' mean here?
createUser("John", "j@example.com", "+1234", "123 St", "NY", "US", 25, true)
```

## Good ✅
```
type CreateUserInput struct {
    Name       string
    Email      string
    Phone      string
    Address    Address
    Age        int
    Newsletter bool
}

func createUser(input CreateUserInput) error { ... }

// Caller — self-documenting
createUser(CreateUserInput{
    Name:       "John",
    Email:      "j@example.com",
    Newsletter: true,
})
```
