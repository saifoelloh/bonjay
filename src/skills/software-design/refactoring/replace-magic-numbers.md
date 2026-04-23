---
id: replace-magic-numbers
priority: MEDIUM
tags: [refactoring, magic-numbers, constants, readability]
---

# Rule: Replace Magic Numbers and Strings with Named Constants

## Context
Literals scattered through code are "magic" — their purpose is unclear, and changing them requires hunting through the codebase.

## Bad ❌
```
if user.age < 18 { return errors.New("access denied") }
time.Sleep(300 * time.Millisecond)
if status == 2 { sendAlert() }
```

## Good ✅
```
const (
    MinimumAge         = 18
    RetryDelay         = 300 * time.Millisecond
    StatusNeedsReview  = 2
)

if user.age < MinimumAge { return errors.New("access denied") }
time.Sleep(RetryDelay)
if status == StatusNeedsReview { sendAlert() }
```

## Why
Constants are self-documenting, searchable, and changeable in one place. Magic numbers have no explanation and can be confused with each other.
