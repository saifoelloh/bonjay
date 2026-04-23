---
id: god-object-antipattern
priority: CRITICAL
tags: [code-smell, god-object, single-responsibility]
---

# Rule: Detect and Break Down God Objects

## Context
A God Object is a class/struct that knows too much or does too much. It's the most common architecture killer in growing codebases.

## Symptoms
- More than ~300 lines in a single file
- More than ~10 methods on a single struct
- Name contains "Manager", "Handler", "Service", "Controller" AND it does 5+ things
- Dozens of dependencies injected into a single struct

## Bad ❌
```
type UserManager struct {  // Does EVERYTHING
    db         *DB
    cache      *Cache
    email      EmailService
    sms        SMSService
    analytics  AnalyticsService
    payment    PaymentService

    // Registration, login, profile update, password reset,
    // email verification, subscription management,
    // notification preferences, payment methods... all here
}
```

## Good ✅
```
// Split by domain responsibility
type UserAuthService struct { db *DB, cache *Cache }
type UserProfileService struct { db *DB }
type UserNotificationService struct { email EmailService, sms SMSService }
type UserSubscriptionService struct { db *DB, payment PaymentService }
```

## Why
God Objects are untestable, unreadable, and constantly cause merge conflicts. Each piece should have a single reason to change.
