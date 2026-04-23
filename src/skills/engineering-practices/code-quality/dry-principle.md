---
id: dry-principle
priority: HIGH
tags: [dry, duplication, reusability]
---

# Rule: DRY — Don't Repeat Yourself

## Definition
Every piece of knowledge must have a single, unambiguous, authoritative representation in the system.

## Signal of Violation
Copy-paste code. The same logic (not just similar-looking code) appears in multiple places.

## Important Distinction
DRY is about **knowledge duplication**, not syntactic duplication. Two functions that look similar but represent different business rules are NOT a DRY violation.

## Bad ❌
```
// Same validation logic duplicated in 3 places
func CreateUser(email string) error {
    if !strings.Contains(email, "@") || len(email) < 5 {
        return errors.New("invalid email")
    }
    // ...
}

func UpdateUser(email string) error {
    if !strings.Contains(email, "@") || len(email) < 5 { // Same check!
        return errors.New("invalid email")
    }
    // ...
}
```

## Good ✅
```
func validateEmail(email string) error {
    if !strings.Contains(email, "@") || len(email) < 5 {
        return errors.New("invalid email")
    }
    return nil
}

func CreateUser(email string) error {
    if err := validateEmail(email); err != nil { return err }
    // ...
}
```
