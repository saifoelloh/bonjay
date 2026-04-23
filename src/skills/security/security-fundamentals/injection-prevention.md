---
id: injection-prevention
priority: CRITICAL
tags: [security, owasp, sql-injection, injection]
---

# Rule: Never Interpolate User Input into Queries or Commands

## Context
Injection is the #1 vulnerability (OWASP A03). Occurs when untrusted data is sent to an interpreter (SQL, shell, LDAP) as part of a command.

## SQL Injection

### Bad ❌
```
// User input directly in query — SQL injection possible!
query := "SELECT * FROM users WHERE email = '" + userInput + "'"
db.Execute(query)
// Input: "admin@x.com' OR '1'='1" → returns all users!
```

### Good ✅
```
// Parameterized query — input is NEVER interpreted as SQL
db.Query("SELECT * FROM users WHERE email = $1", userInput)
```

## Command Injection
```
// Bad — shell injection
exec("convert " + filename + " output.jpg")
// filename = "file.jpg; rm -rf /"

// Good — pass as args, not string interpolation
exec("convert", [filename, "output.jpg"])
```

## Rule
User input MUST NEVER be directly interpolated into any interpreted string. Always use parameterized queries, prepared statements, or argument arrays.
