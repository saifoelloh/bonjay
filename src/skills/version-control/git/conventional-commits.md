---
id: conventional-commits
priority: HIGH
tags: [git, version-control, commits, conventional-commits]
---

# Rule: Use Conventional Commits

## Context
Conventional Commits provide an easy set of rules for creating an explicit commit history. This makes it easier to write automated tools on top of, dovetails with SemVer, and communicates the nature of changes clearly to teammates.

## Structure
The commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types
- **feat**: Introduces a new feature to the codebase (correlates with MINOR in Semantic Versioning).
- **fix**: Patches a bug in your codebase (correlates with PATCH in Semantic Versioning).
- **chore**: Updating grunt tasks etc; no production code change.
- **docs**: Changes to documentation.
- **style**: Formatting, missing semi colons, etc; no code change.
- **refactor**: Refactoring production code.
- **test**: Adding missing tests, refactoring tests; no production code change.
- **perf**: A code change that improves performance.
- **ci**: CI related changes.
- **build**: Build system or external dependencies changes.

## Breaking Changes
A commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning).
Example:
```
feat(api)!: send an email to the customer when a product is shipped
```

## Guidelines
- A scope MAY be provided after a type, surrounded by parenthesis.
- The description MUST immediately follow the colon and space after the type/scope prefix.
- The body MUST begin one blank line after the description.
- Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.
