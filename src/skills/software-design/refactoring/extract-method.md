---
id: extract-method
priority: HIGH
tags: [refactoring, extract-method, readability]
---

# Rule: Extract Method When a Function Does More Than One Thing

## Context
A function should do one thing and do it well. When a function grows, extract logical chunks into named sub-functions. The name of the extracted function becomes documentation.

## Signal to Extract
- Comment before a block of code ("// calculate total", "// validate input")
- Block is more than ~10 lines
- Same block appears multiple times (duplication)

## Bad ❌
```
func processOrder(order Order) error {
    // Validate
    if order.UserID == "" { return errors.New("user required") }
    if len(order.Items) == 0 { return errors.New("items required") }
    if order.Total <= 0 { return errors.New("invalid total") }

    // Calculate discount
    discount := 0.0
    if order.Total > 1000 { discount = 0.1 }
    if order.Total > 5000 { discount = 0.2 }
    order.Total = order.Total * (1 - discount)

    // Save
    return db.Save(order)
}
```

## Good ✅
```
func processOrder(order Order) error {
    if err := validateOrder(order); err != nil { return err }
    order.Total = applyDiscount(order.Total)
    return db.Save(order)
}

func validateOrder(o Order) error { ... }
func applyDiscount(total float64) float64 { ... }
```
