# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **CLI**: Improved `bonjay init` experience by automatically selecting all skills within chosen groups instead of prompting individually.
- **CLI**: Cleaned up the generation output format in `bonjay init` to display generated skills grouped by target directory rather than a long elongated list.

## [0.1.0] - 2026-04-23

### Added
- Initial release of Bonjay CLI.
- Core commands: `init`, `add`, `remove`, `list`, `update`.
- Support for multiple AI targets: Gemini (Antigravity), Cursor, and Claude.
- 13 domains of built-in skills across 5 core groups (CS Fundamentals, Software Design, Engineering Practices, Data & Systems, Security).
