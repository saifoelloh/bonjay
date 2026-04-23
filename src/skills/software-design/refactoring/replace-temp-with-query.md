---
id: replace-temp-with-query
priority: MEDIUM
tags: [refactoring, variables, queries]
---

# Rule: Replace Temp with Query to Reduce Local State

## Context
Local variables (temps) that are only calculated once and then read multiple times can make a function longer and harder to extract parts from.

## Bad ❌
```
func calculateTotal(order Order) float64 {
    basePrice := order.Quantity * order.ItemPrice
    
    var discountFactor float64
    if basePrice > 1000 {
        discountFactor = 0.95
    } else {
        discountFactor = 0.98
    }
    
    return basePrice * discountFactor
}
```

## Good ✅
```
func calculateTotal(order Order) float64 {
    return basePrice(order) * discountFactor(order)
}

func basePrice(order Order) float64 {
    return order.Quantity * order.ItemPrice
}

func discountFactor(order Order) float64 {
    if basePrice(order) > 1000 { return 0.95 }
    return 0.98
}
```

## Why
Reduces local state. Makes the code read like a mathematical formula. Enables easier testing of the sub-calculations.
