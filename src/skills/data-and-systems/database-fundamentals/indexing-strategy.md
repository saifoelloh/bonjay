---
id: indexing-strategy
priority: HIGH
tags: [database, indexing, performance, query]
---

# Rule: Index Columns Used in WHERE, JOIN, and ORDER BY

## Context
Without an index, a query does a full table scan — O(n). With an index, it's O(log n). For large tables, this is the difference between milliseconds and minutes.

## When to Add an Index
1. Column appears in a **WHERE** clause frequently
2. Column is used in a **JOIN** condition
3. Column is used in **ORDER BY**
4. Column is a **Foreign Key** (always index FKs)

## When NOT to Add an Index
- Small tables (< 1000 rows) — full scan may be faster
- Columns that change very frequently — index maintenance overhead
- Columns with very low cardinality (boolean, status with 2 values)

## Index Trade-off
Indexes speed up reads (SELECT) but slow down writes (INSERT, UPDATE, DELETE) because the index must be maintained.

## Bad ❌
```sql
-- No index on user_id — full table scan!
SELECT * FROM orders WHERE user_id = 123;

-- EXPLAIN shows: Seq Scan on orders (cost=0.00..8234.00 rows=100000)
```

## Good ✅
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
-- Now: Index Scan on orders (cost=0.00..8.27 rows=3)
```
