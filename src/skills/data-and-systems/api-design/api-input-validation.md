---
id: api-input-validation
priority: HIGH
tags: [api, validation, dto, strong-types]
---

# Rule: Always Validate API Input Strongly

## Context
Input validation ensures only properly formed data enters your system. It is the first line of defense against many vulnerabilities.

## Rule
1. Do not trust input parameters or objects.
2. Achieve implicit input validation by using strong types, enums, and strict formats.
3. Use a validation library (like `class-validator` or `zod`) at the controller boundary.

## Good ✅ (NestJS / class-validator style)
```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

// Controller
@Post()
create(@Body() createUserDto: CreateUserDto) {
  // We can trust that createUserDto exactly matches the schema
  return this.usersService.create(createUserDto);
}
```
