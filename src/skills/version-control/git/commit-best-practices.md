---
id: commit-best-practices
priority: HIGH
tags: [git, version-control, commits, best-practices]
---

# Rule: Git Commit Best Practices

## Characteristics of a Good Commit

1. **Atomic and Focused**: A commit should represent one and only one logical change. Do not mix several independent changes in one commit.
   - **Good**: `git commit -m "Add user authentication"`
   - **Bad**: `git commit -m "Add user authentication and update UI styles"`

2. **Descriptive Commit Message**: Explains what the commit does and why the change was made.
   - **Good**: `git commit -m "fix: correct null pointer exception in user login"`
   - **Bad**: `git commit -m "fix bug"`

3. **Tested and Verified**: Ensure that the changes in your commit have been tested and properly run before committing.

4. **Properly Scoped**: If you're working on a specific feature or fixing a bug, ensure that all changes related to that task are included in a single commit. Avoid partial changes.

## Characteristics of a Bad Commit

1. **Large and Unfocused**: A commit with too many changes is difficult to review and debug.
2. **Vague or Misleading Messages**: Messages like "Stuff", "Fixes", or "Update project" provide no useful information.
3. **Unrelated Changes**: Combining unrelated changes makes it difficult to isolate specific changes.
4. **Incomplete or Untested Code**: Can disrupt the workflow and break the build.

## General Best Practices

- **Commit Often, but Not Too Often**: Balance between committing too frequently and not enough. Each commit should represent a meaningful change.
- **Use Branches Effectively**: Use feature branches for new features, bug fixes, and experiments.
- **Review and Squash Commits**: Before merging a branch, squash small or fixup commits into logical units to keep history clean.
- **Write in the Imperative Mood**: Use imperative mood in the subject line (e.g., "Add feature" not "Added feature" or "Adds feature").
- **Limit Subject Line**: Keep the subject line under 50 characters.
- **Wrap Body**: Wrap the body at 72 characters.
- **Explain What and Why**: Use the body to explain what and why, not how.
