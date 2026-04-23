# 🤖 Bonjay — AI Skill Generator

[![npm version](https://img.shields.io/npm/v/bonjay.svg?style=flat-square)](https://www.npmjs.com/package/bonjay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/saifoelloh/bonjay/ci.yml?branch=main&style=flat-square)](https://github.com/saifoelloh/bonjay/actions)

Bonjay is a CLI tool designed to scaffold **AI tooling context (rules & skills)** directly into your project. It acts like an "npm for AI context," allowing you to easily generate, manage, and distribute standard coding practices (like SOLID principles, GoF patterns, and OWASP security rules) so your AI assistant (Cursor, GitHub Copilot, Gemini, Claude) understands your project better.

## Why Bonjay?

AI assistants are only as good as the context they are given. Most developers end up manually copying and pasting rules (`.cursor/rules/*.mdc`) from project to project.

With Bonjay, you can:
- **Scaffold context in seconds**: Run `npx bonjay init` and pick the fundamentals your project needs.
- **Language-Agnostic Core**: Bonjay ships with fundamental software engineering rules (Algorithms, Database Design, Security) that apply regardless of whether you're using Go, TypeScript, or Python.
- **Single Source of Truth**: Keep track of what your AI knows with `bonjay.json`.
- **Multi-Agent Support**: Generates output optimized for multiple targets (e.g., Cursor rules, standard Markdown for Claude/Gemini).

## Quick Start

Initialize Bonjay in your project:
```bash
npx bonjay init
```
This will launch an interactive wizard where you can select which AI platforms you use and what skill groups you want to inject into your project.

## Available Skill Groups

Bonjay currently ships with 13 domains across 5 core groups:

1. 📦 **CS Fundamentals** (Big O, Data Structures, Algorithms)
2. 🏗️ **Software Design** (Design Patterns, Clean Architecture, Refactoring)
3. ⚙️ **Engineering Practices** (Code Quality/SOLID, Testing Strategy, Concurrency)
4. 🗃️ **Data & Systems** (Database Fundamentals, API Design, Memory Management)
5. 🔒 **Security** (OWASP Top 10, AuthN/AuthZ, Secret Management)

## Commands

### `init`
Interactive wizard to set up `bonjay.json` and generate your first set of skills.
```bash
bonjay init
```

### `add`
Add a specific skill or an entire group to your project.
```bash
# Add a single skill
bonjay add software-design/design-patterns

# Add an entire group
bonjay add cs-fundamentals
```

### `remove`
Remove a skill from your project and delete its generated files.
```bash
bonjay remove software-design/design-patterns
```

### `list`
List all available and currently installed skills.
```bash
bonjay list
```

### `update`
Regenerate all installed skills with the latest rules provided by your installed version of Bonjay.
```bash
bonjay update
```

## How It Works

1. Bonjay maintains a library of curated Markdown rules with rich metadata.
2. When you run `init` or `add`, Bonjay writes to a `bonjay.json` configuration file in your project root.
3. It then generates the actual files (`SKILL.md` and `rules/`) in directories corresponding to your selected AI targets (e.g., `.gemini/skills/`).
4. Commit both `bonjay.json` and the generated rules to your repository.

## Extensibility

Bonjay is built with a decoupled Registry system. In the future, you will be able to install custom skill packs via `npx bonjay add user/custom-skill`.

## Contributing

We welcome contributions from the community! Whether it's adding new skills, fixing bugs, or improving documentation, your help is appreciated. 

Please read our [Contributing Guidelines](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
