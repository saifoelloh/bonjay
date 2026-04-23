---
id: solid-single-responsibility
priority: HIGH
tags: [solid, srp, single-responsibility]
---

# Rule: Single Responsibility Principle (SRP)

## Definition
A class/module should have only one reason to change. It should be responsible for only one actor.

## How to Detect Violations
Ask: "Who would request changes to this code?"
If the answer is "multiple different stakeholders" — it violates SRP.

## Bad ❌
```
type Report struct { data []Row }

func (r *Report) CalculateRevenue() float64 { ... }  // Finance requests changes
func (r *Report) FormatAsHTML() string { ... }        // UI team requests changes
func (r *Report) SaveToDB() error { ... }             // Backend requests changes
// Three different reasons to change = SRP violation
```

## Good ✅
```
type RevenueCalculator struct { data []Row }
func (r *RevenueCalculator) Calculate() float64 { ... }  // Only finance changes this

type HTMLFormatter struct{}
func (f *HTMLFormatter) Format(data []Row) string { ... }  // Only UI changes this

type ReportRepository struct { db *DB }
func (r *ReportRepository) Save(data []Row) error { ... }  // Only DB changes this
```
