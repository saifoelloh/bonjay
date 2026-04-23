---
id: authn-vs-authz
priority: CRITICAL
tags: [security, authentication, authorization, jwt]
---

# Rule: Distinguish Authentication from Authorization

## Definitions
- **Authentication (AuthN)**: "Who are you?" — verifying identity (login, JWT validation)
- **Authorization (AuthZ)**: "What can you do?" — verifying permissions (RBAC, ACL)

## Common Mistakes
1. **Checking only AuthN, skipping AuthZ**: User is logged in, but can access OTHER users' data
2. **Trusting user-supplied IDs**: `/orders?user_id=123` — user could change to any ID
3. **Exposing admin endpoints with only AuthN**: "Logged in" ≠ "is admin"

## Bad ❌
```
// Gets user_id from request body — user can fake it!
func getOrders(req Request) {
    userID := req.Body["user_id"]  // NEVER trust user-supplied identity
    orders := db.GetOrdersByUser(userID)
    return orders
}
```

## Good ✅
```
// Gets user_id from VERIFIED JWT token, not request body
func getOrders(req Request) {
    claims := req.Context.Value("jwt_claims").(JWTClaims)
    userID := claims.UserID  // Verified by middleware, tamper-proof
    orders := db.GetOrdersByUser(userID)
    return orders
}
```
