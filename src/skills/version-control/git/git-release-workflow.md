---
id: git-release-workflow
priority: HIGH
tags: [git, version-control, releases, tags, semver]
---

# Rule: Git Release & Tagging Workflow

## Context
When maintaining open-source projects or libraries, consumers rely on version numbers to know if an update contains bug fixes, new features, or breaking changes. This requires a combination of Semantic Versioning (SemVer) and Git Tags.

## Semantic Versioning (SemVer)
Releases should be versioned as `v[MAJOR].[MINOR].[PATCH]` (e.g., `v1.2.3`).
- **MAJOR**: Breaking changes (consumers must update their code to use the new version).
- **MINOR**: New features added in a backwards-compatible manner.
- **PATCH**: Backwards-compatible bug fixes.

## Git Tagging
A Git Tag acts as an immutable pointer to a specific commit. When you release a version, you must tag the commit so developers can easily find the exact code for that version.

## The Release Workflow
1. **Develop**: Work on `feature/*` and `fix/*` branches, merge them into `main` via Pull Requests.
2. **Version Bump**: When ready to release, update the version in your project file (e.g., `package.json`). Tools like `npm version minor` will automatically bump the version and create a Git Tag for you.
3. **Push Tags**: Push the commit and the tag to the remote repository (`git push && git push --tags`).
4. **Publish**: Publish the release to your package registry (e.g., `npm publish`) or create a GitHub Release.

## Bad Practices ❌
- Manually editing version numbers without creating a corresponding Git tag.
- Mutating an existing tag (e.g., deleting `v1.0.0` and recreating it on a different commit). Tags must be immutable.
- Pushing breaking changes in a `PATCH` or `MINOR` release.
