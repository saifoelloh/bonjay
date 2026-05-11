---
id: data-minimization
priority: HIGH
tags: [api, design, data-minimization, least-privilege, performance, dto]
---

# Rule: Practice Data Minimization & Use DTOs

## Context
Data Minimization is the architectural principle of only returning the minimum amount of data required for a specific UI or business task. It is the primary architectural defense against data exposure and improves API performance.

## Principles
1. **Purpose Limitation**: Create specific responses for specific views (e.g., `UserSummaryResponse` vs `UserDetailResponse`).
2. **DTO Layer**: Always use a Data Transfer Object (DTO) layer to shape the outgoing response, creating a boundary between the database model and the API contract.

## Bad ❌
```typescript
// Returning 50+ fields for a "User List" view that only needs name and avatar
// This tightly couples the database schema to the API response.
const users = await db.user.findMany();
return res.json(users);
```

## Good ✅
```typescript
// Defining a specific DTO for the response (NestJS style)
export class UserListResponseDto {
  @Expose()
  id: string;

  @Expose()
  displayName: string;

  @Expose()
  avatarUrl: string;
}

// In the controller:
const users = await db.user.findMany();
// Only fields marked with @Expose() will be returned, everything else is stripped.
return plainToInstance(UserListResponseDto, users, { excludeExtraneousValues: true });
```
