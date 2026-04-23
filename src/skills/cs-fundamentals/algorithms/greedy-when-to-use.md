---
id: greedy-when-to-use
priority: MEDIUM
tags: [greedy, optimization, local-optimal]
---

# Rule: Only Use Greedy When Local Optimal = Global Optimal

## Context
Greedy algorithms make the locally optimal choice at each step. They're fast (usually O(n) or O(n log n)) but only correct when the greedy choice leads to a globally optimal solution.

## Safe Greedy Scenarios
- **Interval scheduling** — always pick the interval that ends earliest
- **Huffman coding** — always merge two lowest-frequency nodes
- **Dijkstra's** — always visit the unvisited node with minimum distance
- **Coin change (canonical systems)** — always use the largest coin

## Dangerous Greedy Scenarios
- **0/1 Knapsack** — greedy by value/weight ratio FAILS, need DP
- **Shortest path with negative edges** — greedy fails, need Bellman-Ford

## Verification
Prove your greedy works with an "exchange argument": show that swapping any greedy choice for a different one can only make the result worse or equal.
