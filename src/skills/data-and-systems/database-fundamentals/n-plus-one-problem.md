---
id: n-plus-one-problem
priority: CRITICAL
tags: [database, n+1, orm, performance]
---

# Rule: Detect and Fix N+1 Query Problems

## Context
N+1 occurs when you fetch N records and then issue 1 additional query PER record — resulting in N+1 total queries instead of 2.

## Example
```
// 1 query to get 100 orders
orders = db.Find(&orders)
// Then 100 queries — one per order! = 101 total queries
for _, order := range orders {
    fmt.Println(order.User.Name)  // Lazy load triggers a query each time
}
```

## Detection
- Database query count grows linearly with result count
- Slow pages that load many related records
- ORM "lazy loading" enabled without careful oversight

## Fix with Eager Loading
```
// 2 queries total — JOIN loads users in advance
db.Preload("User").Find(&orders)
// OR
db.Joins("User").Find(&orders)  // Single JOIN query
```

## Rule
Any time you loop over a result set and access a related record inside the loop — you likely have N+1. Use Preload/Eager Load or rewrite as a JOIN.
