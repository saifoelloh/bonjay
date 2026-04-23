---
id: solid-dependency-inversion
priority: HIGH
tags: [solid, dip, dependency-inversion, interfaces]
---

# Rule: Dependency Inversion Principle (DIP)

## Definition
1. High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
2. Abstractions should not depend on details. Details should depend on abstractions.

## Bad ❌
High-level `OrderService` depends directly on low-level `MySQLDatabase`.
```
type OrderService struct {
    db *MySQLDatabase  // Tight coupling to specific DB!
}
```

## Good ✅
Both depend on the `OrderRepository` interface.
```
type OrderRepository interface {
    Save(Order) error
}

type OrderService struct {
    repo OrderRepository  // Loose coupling!
}

// MySQLDatabase implements OrderRepository
```

## Why
Allows swapping implementations (e.g., MySQL to Postgres, or adding a Mock for testing) without changing the high-level business logic.
