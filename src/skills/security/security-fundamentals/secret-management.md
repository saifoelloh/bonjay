---
id: secret-management
priority: CRITICAL
tags: [security, secrets, environment-variables, credentials]
---

# Rule: Never Hardcode Secrets — Use Environment Variables or Secret Managers

## Context
Hardcoded secrets in source code are exposed to anyone with repo access, including contributors, CI logs, and git history (forever, even after deletion).

## Bad ❌
```
// Hardcoded in source code
const dbPassword = "super_secret_password_123"
const apiKey = "sk-live-abc123xyz"
const jwtSecret = "myapp_jwt_secret"
```

## Good ✅
```
// Read from environment variables
dbPassword := os.Getenv("DB_PASSWORD")
apiKey := os.Getenv("PAYMENT_API_KEY")
jwtSecret := os.Getenv("JWT_SECRET")

// Validate at startup
if jwtSecret == "" {
    log.Fatal("JWT_SECRET environment variable is required")
}
```

## Secret Management Tools
- **Development**: `.env` file (in `.gitignore`!)
- **Production**: AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager
- **CI/CD**: GitHub Actions Secrets, GitLab CI Variables

## Git History Warning
If a secret was EVER committed, rotate it immediately. `git rm` does NOT remove it from history.
