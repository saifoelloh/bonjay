---
id: acid-properties
priority: CRITICAL
tags: [database, acid, transactions]
---

# Rule: Understand and Enforce ACID Properties

## The Four Properties

| Property | Meaning | Violation Example |
|---|---|---|
| **Atomicity** | All operations succeed or all fail | Charge card but don't create order |
| **Consistency** | DB moves from one valid state to another | FK constraint violated |
| **Isolation** | Concurrent transactions don't see each other's intermediate state | Dirty read |
| **Durability** | Committed data survives crashes | Write-ahead log |

## When to Use Transactions
Any operation that involves **multiple related writes** must be wrapped in a transaction.

## Bad ❌
```
// Not atomic — if second query fails, first is already committed
db.Execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
db.Execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
```

## Good ✅
```
tx := db.Begin()
defer tx.Rollback()
if err := tx.Execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1"); err != nil {
    return err
}
if err := tx.Execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2"); err != nil {
    return err
}
return tx.Commit()
```
