---
id: channels-vs-mutex
priority: HIGH
tags: [concurrency, channels, mutex, state]
---

# Rule: Share Memory by Communicating, Don't Communicate by Sharing Memory

## Context
A core Go proverb. While mutexes are fine for simple state protection, complex concurrent workflows are better modeled by passing ownership of data via channels.

## When to use Mutex (sync.Mutex)
- Simple caches, counters, or registries.
- Protecting a single piece of state where the operations are very short.

## When to use Channels
- Passing ownership of data from one goroutine to another.
- Coordinating multiple concurrent tasks (pipelines, worker pools).
- Wait for a signal or timeout (using `select`).

## Rule
If you find yourself using multiple mutexes, condition variables, and complex lock hierarchies, you probably should be using a channel instead.
