---
id: db-connection-pooling
priority: HIGH
tags: [database, connections, pooling, performance]
---

# Rule: Always Use a Database Connection Pool

## Context
Opening a new database connection is extremely expensive (TCP handshake, auth, allocating backend processes). Doing this per-request will destroy both app and DB performance under load.

## Good ✅
```
// Configure a connection pool once at startup
db.SetMaxOpenConns(25)     // Max concurrent connections
db.SetMaxIdleConns(25)     // Max idle connections to keep open
db.SetConnMaxLifetime(5 * time.Minute) // Retire old connections safely
```

## Rule
1. Set `MaxOpenConns` to prevent your app from DDoSing the database.
2. Set `MaxIdleConns` equal to `MaxOpenConns` to avoid constantly opening/closing connections.
3. Set `ConnMaxLifetime` to gracefully cycle connections before the DB firewall kills them.
