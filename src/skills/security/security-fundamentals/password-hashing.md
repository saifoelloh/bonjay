---
id: password-hashing
priority: CRITICAL
tags: [security, passwords, hashing, bcrypt]
---

# Rule: Always Hash Passwords with a Slow, Salted Algorithm

## Context
Storing plain-text or MD5/SHA1 passwords means a database breach exposes all user passwords. Use adaptive hashing algorithms designed for passwords.

## Approved Algorithms
- **bcrypt** (most common, recommended)
- **argon2id** (winner of Password Hashing Competition — best for new systems)
- **scrypt** (memory-hard, good alternative)

## Never Use for Passwords
- MD5, SHA1, SHA256 — too fast, vulnerable to rainbow tables
- Encryption — passwords should be verifiable, not reversible

## Bad ❌
```
// Plain text
user.password = password

// Fast hash — crackable in seconds with GPU
user.password = sha256(password)
```

## Good ✅
```
// bcrypt — slow and salted by design
hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
user.password = string(hashedPassword)

// Verify
err := bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(inputPassword))
```
