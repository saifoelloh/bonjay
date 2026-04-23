---
id: strategy-pattern
priority: HIGH
tags: [behavioral, strategy, polymorphism]
---

# Rule: Replace Conditionals with Strategy Pattern

## Context
When you have a chain of if/else or switch statements selecting between algorithms/behaviors, extract each branch into a Strategy object.

## Bad ❌
```
func sort(data []int, algorithm string) {
    switch algorithm {
    case "bubble":
        bubbleSort(data)
    case "quick":
        quickSort(data)
    case "merge":
        mergeSort(data)
    // Adding a new algorithm requires modifying this function
    }
}
```

## Good ✅
```
type SortStrategy interface {
    Sort(data []int) []int
}

type Sorter struct {
    strategy SortStrategy
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
    s.strategy = strategy
}

func (s *Sorter) Sort(data []int) []int {
    return s.strategy.Sort(data)
}

// Adding new algorithm = new struct, zero changes to Sorter
type MergeSort struct{}
func (m MergeSort) Sort(data []int) []int { ... }
```

## Why
Open/Closed Principle: open for extension, closed for modification. Each strategy is independently testable.
