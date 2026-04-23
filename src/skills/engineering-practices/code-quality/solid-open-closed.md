---
id: solid-open-closed
priority: HIGH
tags: [solid, ocp, open-closed]
---

# Rule: Open/Closed Principle (OCP)

## Definition
Software entities should be open for extension, closed for modification. Add new behavior by adding new code, not by changing existing code.

## Signal of Violation
Every time you add a new "type" or "case", you modify existing functions with new if/else or switch branches.

## Bad ❌
```
// Every new shape requires modifying this function
func TotalArea(shapes []Shape) float64 {
    total := 0.0
    for _, s := range shapes {
        switch s.Type {
        case "circle":   total += math.Pi * s.Radius * s.Radius
        case "square":   total += s.Side * s.Side
        // Adding "triangle" = modify this existing function
        }
    }
    return total
}
```

## Good ✅
```
type Shape interface { Area() float64 }

type Circle struct { Radius float64 }
func (c Circle) Area() float64 { return math.Pi * c.Radius * c.Radius }

type Square struct { Side float64 }
func (s Square) Area() float64 { return s.Side * s.Side }

// Adding Triangle = new struct only, zero changes here
func TotalArea(shapes []Shape) float64 {
    total := 0.0
    for _, s := range shapes { total += s.Area() }
    return total
}
```
