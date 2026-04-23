# Contributing to Bonjay

First off, thank you for considering contributing to Bonjay! It's people like you that make open source such a great community.

## Local Development Setup

1. **Fork & Clone**
   Fork the repository on GitHub, then clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bonjay.git
   cd bonjay
   ```

2. **Install Dependencies**
   Make sure you have Node.js (v18+) installed.
   ```bash
   npm install
   ```

3. **Run the Code**
   To build and run the CLI locally:
   ```bash
   npm run build
   node dist/index.js
   ```
   Alternatively, you can run in watch mode during development:
   ```bash
   npm run dev
   ```

4. **Running Tests**
   Before submitting a pull request, ensure all tests pass:
   ```bash
   npm run test
   ```

## Commit Guidelines

We strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
Your commit message should be formatted like this:
```
<type>[optional scope]: <description>
```

Common types include:
- `feat`: A new feature or a new skill added to the registry.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries.

## Pull Request Process

1. Create a new branch for your feature or fix (`git checkout -b feature/my-feature`).
2. Make your changes and commit them using the Conventional Commits format.
3. Push your branch to your fork (`git push origin feature/my-feature`).
4. Open a Pull Request against the `main` branch of the upstream repository.
5. Ensure that the CI passes and wait for review from the maintainers.

## Adding a New Skill

If you want to contribute a new skill:
1. Locate the appropriate category under `src/skills/`.
2. Add your markdown rule file inside that category folder (e.g., `src/skills/security/my-new-rule.md`).
3. Register the rule in the `index.ts` of that category.
4. Ensure the content follows industry standards and is concise enough for AI assistants to consume.

Thank you for your contributions!
