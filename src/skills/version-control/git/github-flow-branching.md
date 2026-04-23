---
id: github-flow-branching
priority: HIGH
tags: [git, version-control, branching, github-flow]
---

# Rule: GitHub Flow Branching Strategy

## Context
A clean and simple branching strategy prevents merge conflicts, ensures the main branch is always deployable, and makes collaboration easier. The GitHub Flow is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly.

## Core Principles

1. **`main` is sacred**: The `main` branch must always be stable, tested, and deployable. Never commit directly to `main`.
2. **Create a branch**: When working on a feature or fixing a bug, branch off from `main` with a descriptive name.
3. **Open a Pull Request (PR)**: Once the work is ready (or you want feedback), open a PR to merge your branch back into `main`.
4. **Merge and Delete**: After review and approval, merge the PR into `main` and delete the feature branch.

## Branch Naming Convention
Prefix your branches to indicate the type of work being done:
- `feature/<name>` or `feat/<name>`: For new features (e.g., `feature/add-login`).
- `fix/<name>` or `bugfix/<name>`: For bug fixes (e.g., `fix/header-alignment`).
- `docs/<name>`: For documentation updates.
- `chore/<name>`: For maintenance tasks.

## Bad Practices ❌
- Committing incomplete code directly to `main`.
- Using generic branch names like `my-branch` or `update`.
- Keeping feature branches alive for weeks without syncing with `main` (leads to massive merge conflicts).
