---
id: information-disclosure-prevention
priority: CRITICAL
tags: [security, data-privacy, information-disclosure, sensitive-data, error-handling]
---

# Rule: Prevent Sensitive Information Disclosure

## Context
Information disclosure occurs when an application reveals sensitive information to an unauthorized party. This often happens in APIs that return entire database rows or when error messages leak technical details.

## Sensitive Fields (Never Return in APIs)
- **Authentication**: `password`, `password_hash`, `salt`, `mfa_secret`.
- **Tokens**: `access_token`, `refresh_token`, `session_id`, `api_key`.

## Error Response Disclosure
- **Infrastructure**: `server_ip`, `internal_host`, `stack_trace`, `debug_log`.
- Never return database errors (e.g., SQL syntax errors) or stack traces to the client.
- Always catch exceptions and return generic messages like "An internal server error occurred."
- Log the actual stack trace server-side only.

## Principles
1. **Explicit Selection**: Always select only the fields you need. Never use `SELECT *`.
2. **Generic Errors**: Use generic error messages for 500 errors.

## Bad ❌
```typescript
// Returning the whole user object including password_hash
const user = await db.user.findUnique({ where: { id } });
return res.json(user);

// Leaking stack trace
catch (error) {
  return res.status(500).json({ error: error.stack });
}
```

## Good ✅
```typescript
// Using a projection/select to exclude sensitive fields
const user = await db.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true }
});
return res.json(user);

// Generic error
catch (error) {
  logger.error(error); // log server-side
  return res.status(500).json({ message: "Internal server error" });
}
```
