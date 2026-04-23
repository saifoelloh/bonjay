---
id: decorator-pattern
priority: MEDIUM
tags: [structural, decorator, middleware, composition]
---

# Rule: Use Decorator to Add Behavior Without Modifying Code

## Context
When you need to add cross-cutting concerns (logging, caching, retry, authentication) to an existing interface, wrap it with a Decorator instead of modifying the original.

## Bad ❌
```
// Adding logging directly pollutes business logic
func (s *UserService) GetUser(id string) (*User, error) {
    log.Info("getting user", "id", id)  // Logging mixed with business logic
    start := time.Now()
    user, err := s.db.FindUser(id)
    log.Info("got user", "duration", time.Since(start))
    return user, err
}
```

## Good ✅
```
// Logging Decorator wraps the interface
type LoggingUserService struct {
    inner UserService
    log   Logger
}

func (l *LoggingUserService) GetUser(id string) (*User, error) {
    l.log.Info("getting user", "id", id)
    start := time.Now()
    user, err := l.inner.GetUser(id)
    l.log.Info("got user", "duration", time.Since(start), "error", err)
    return user, err
}
```

## Why
The original UserService stays clean. Decorators are composable: stack logging + caching + retry without touching the original.
