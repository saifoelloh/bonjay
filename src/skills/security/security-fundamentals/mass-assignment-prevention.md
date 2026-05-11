---
id: mass-assignment-prevention
priority: CRITICAL
tags: [security, owasp, mass-assignment, dto, input-validation]
---

# Rule: Prevent Mass Assignment Vulnerabilities

## Context
Mass Assignment (or Autobinding) occurs when an application automatically binds HTTP request parameters into program code variables or objects. Attackers can exploit this by injecting fields they shouldn't be able to modify, such as `isAdmin` or `password_hash`.

## Rule
Always use Data Transfer Objects (DTOs) or explicitly allow-list fields when creating or updating records. NEVER bind `req.body` directly to database operations.

## Bad ❌
```typescript
// Attacker sends: { "name": "Bob", "isAdmin": true }
// The database automatically saves isAdmin: true!
app.post('/users', async (req, res) => {
  const user = await db.user.create({ data: req.body });
  return res.json(user);
});
```

## Good ✅
```typescript
// Explicitly pick allowed fields
app.post('/users', async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await db.user.create({ data });
  return res.json(user);
});

// Or using a DTO with a validation framework like class-validator
```
