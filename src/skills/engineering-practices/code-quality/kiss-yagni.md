---
id: kiss-yagni
priority: MEDIUM
tags: [kiss, yagni, simplicity, over-engineering]
---

# Rule: KISS & YAGNI — Don't Over-Engineer

## KISS — Keep It Simple, Stupid
The simplest solution that correctly solves the problem is usually the best one.

## YAGNI — You Ain't Gonna Need It
Don't build features "just in case" they're needed in the future. Build what's needed now.

## Signs of KISS/YAGNI Violation
- Abstract base classes with only one implementation
- Plugin systems when there's only one plugin
- Generic frameworks built for one use case
- "We might need this later" code
- Premature optimization

## Bad ❌
```
// YAGNI violation — building a plugin system for one formatter
type FormatterPlugin interface {
    Format(data interface{}) string
    GetName() string
    GetVersion() string
    GetPriority() int
}
type FormatterRegistry struct { plugins []FormatterPlugin }
// When you only ever need JSON formatting
```

## Good ✅
```
// KISS — solve the actual problem
func formatAsJSON(data interface{}) (string, error) {
    b, err := json.Marshal(data)
    return string(b), err
}
// Add complexity only when you actually need it
```
