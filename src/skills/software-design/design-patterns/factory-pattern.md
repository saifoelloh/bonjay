---
id: factory-pattern
priority: HIGH
tags: [creational, factory, abstraction]
---

# Rule: Use Factory Pattern to Decouple Object Creation

## Context
When you have complex object creation logic that shouldn't pollute business logic, or when the exact type of object created depends on runtime conditions, use a Factory.

## Bad ❌
```
// Business logic polluted with creation details
func processPayment(method string) {
    var p Payment
    if method == "credit" {
        p = CreditPayment{gateway: "stripe", retries: 3, timeout: 30}
    } else if method == "crypto" {
        p = CryptoPayment{chain: "ethereum", confirmations: 6}
    }
    p.Process()
}
```

## Good ✅
```
// Factory handles creation, business logic stays clean
func NewPayment(method string) (Payment, error) {
    switch method {
    case "credit":
        return CreditPayment{gateway: "stripe", retries: 3}, nil
    case "crypto":
        return CryptoPayment{chain: "ethereum", confirmations: 6}, nil
    default:
        return nil, fmt.Errorf("unknown payment method: %s", method)
    }
}

func processPayment(method string) {
    p, err := NewPayment(method)
    if err != nil { ... }
    p.Process()
}
```

## Why
Single place to change creation logic. Business logic stays clean. Easy to add new types.
