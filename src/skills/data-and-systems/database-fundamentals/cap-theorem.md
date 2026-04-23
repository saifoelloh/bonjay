---
id: cap-theorem
priority: MEDIUM
tags: [database, cap-theorem, distributed, consistency]
---

# Rule: Understand CAP Theorem Trade-offs in Distributed Systems

## CAP Properties
- **Consistency (C)**: Every read receives the most recent write
- **Availability (A)**: Every request receives a response (not necessarily latest)
- **Partition Tolerance (P)**: System continues despite network partitions

## The Theorem
In a distributed system, you can only guarantee 2 of 3 simultaneously. Since network partitions always happen in production, you're really choosing between **CP** or **AP**.

## Practical Choices

| System | Choice | Why |
|---|---|---|
| PostgreSQL, MySQL | CP | Consistency over availability |
| Cassandra, DynamoDB | AP | Availability over strong consistency |
| Redis (cluster) | CP | Consistency for caching |
| DNS | AP | Availability, eventually consistent |

## Rule
When designing a distributed feature, explicitly decide: "Is it worse to show stale data, or to show an error?" That determines your CP vs AP choice.
