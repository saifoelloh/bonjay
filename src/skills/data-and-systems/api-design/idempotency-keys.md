---
id: idempotency-keys
priority: CRITICAL
tags: [rest, api, idempotency, retries]
---

# Rule: Require Idempotency Keys for State-Changing Operations

## Context
Networks are unreliable. A client might send a POST request, the server processes it successfully, but the network drops the response. The client retries. Without idempotency, they just charged the credit card twice.

## How it works
1. Client generates a unique UUID (Idempotency Key) for the operation.
2. Client sends `Idempotency-Key: <uuid>` header with the POST request.
3. Server checks if it has seen this key before.
   - If yes: return the saved response from the first attempt.
   - If no: process the request, save the response mapped to the key, return it.

## Rule
All endpoints that handle payments, emails, or critical state transitions must be idempotent.
