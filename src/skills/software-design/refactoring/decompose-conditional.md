---
id: decompose-conditional
priority: HIGH
tags: [refactoring, conditionals, readability]
---

# Rule: Decompose Complex Conditionals

## Context
Complex boolean logic in `if` statements is hard to read and understand. Extract the condition into a well-named variable or function.

## Bad ❌
```
if date.Before(SUMMER_START) || date.After(SUMMER_END) && !isHoliday && (user.Age > 65 || user.IsStudent) {
    charge = quantity * winterRate
}
```

## Good ✅
```
isWinter := date.Before(SUMMER_START) || date.After(SUMMER_END)
isEligibleForDiscount := !isHoliday && (user.Age > 65 || user.IsStudent)

if isWinter && isEligibleForDiscount {
    charge = quantity * winterRate
}
```

## Why
The extracted variables act as documentation. It separates *what* you are testing from *why* you are testing it.
