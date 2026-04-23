---
id: observer-pattern
priority: HIGH
tags: [behavioral, observer, events, decoupling]
---

# Rule: Use Observer to Decouple Event Producers from Consumers

## Context
When one object's state change should trigger actions in other objects without tight coupling, use Observer. This is the foundation of event-driven systems.

## Bad ❌
```
// Order directly calls all systems — tightly coupled
func (o *Order) Complete() {
    o.status = "complete"
    emailService.SendConfirmation(o)    // Order knows about email
    inventoryService.Reduce(o.items)   // Order knows about inventory
    analyticsService.Track(o)          // Order knows about analytics
}
```

## Good ✅
```
// Observer pattern — Order just emits an event
type OrderObserver interface {
    OnOrderCompleted(order *Order)
}

type Order struct {
    observers []OrderObserver
}

func (o *Order) Subscribe(obs OrderObserver) {
    o.observers = append(o.observers, obs)
}

func (o *Order) Complete() {
    o.status = "complete"
    for _, obs := range o.observers {
        obs.OnOrderCompleted(o)  // Each observer handles its own concern
    }
}
```

## Why
Adding a new reaction to order completion (e.g., push notification) requires zero changes to Order. Each observer is independently testable.
