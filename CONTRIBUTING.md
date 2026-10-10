# Contributing Guide

Thank you for contributing to the Portfolio project! This document outlines our development workflow, Git conventions, and pull request process to ensure a consistent and smooth collaboration.

---

## 🌿 Git Branching Conventions

Branches should be created from the latest `main` branch. Use clear, descriptive names prefixed by the type of work:

| Branch Prefix | Purpose | Example |
| :--- | :--- | :--- |
| `feat/` | New features or enhancements | `feat/contact-form` or `6-featbackend-bootstrap` |
| `fix/` | Bug fixes | `fix/cv-download-404` or `fix/ci-github-pages-monorepo` |
| `docs/` | Documentation improvements | `docs/onboarding-guide` |
| `refactor/` | Code refactoring without behavior change | `refactor/monorepo-structure` |
| `ci/` | CI/CD workflows and automated pipelines | `ci/setup-pr-validation-workflow` |
| `chore/` | Tooling, dependency updates, maintenance | `chore/update-dependencies` |

> **Format Tip:** When working on a GitHub issue, you can include the issue number in the branch name:  
> `<issue-number>-<type><scope>-<short-description>` (e.g., `7-docsrepo-document-monorepo-structure-and-local-onboarding-guide`).

---

## 📝 Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <short description>
```

### Examples:
- `feat(backend): implement GET /api/health endpoint`
- `fix(frontend): add resume PDF to public assets directory`
- `docs(repo): update root README with onboarding guide`
- `ci(pr): add backend typecheck and vitest steps to validation workflow`

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, linting)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `ci`: Changes to CI configuration files and scripts
- `chore`: Auxiliary tool changes, dependency bumps, or build tasks

---

## 🚀 Pull Request & Merge Workflow

1. **Keep `main` updated:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Develop & verify locally:**
   Always run quality checks before opening a PR:
   
   - **Frontend:**
     ```bash
     cd frontend
     npm run typecheck
     npm run build
     ```
   
   - **Backend:**
     ```bash
     cd backend
     npm run typecheck
     npm run test
     npm run test:e2e
     npm run build
     ```

4. **Commit with descriptive messages:**
   ```bash
   git add .
   git commit -m "feat(scope): concise description"
   ```

5. **Push and open a Pull Request:**
   ```bash
   git push -u origin feat/your-feature-name
   ```
   - Open a PR targeting `main`.
   - Fill in the PR summary and link the relevant issue (e.g., `Closes #7`).

6. **Automated CI Validation:**
   - Every PR triggers the **PR Validation Check** GitHub Actions workflow (`.github/workflows/pr-check.yml`).
   - Both `Frontend Typecheck & Build` and `Backend Tests & Build` must pass (green checkmark).

7. **Review & Merge:**
   - Once checks pass and the PR is reviewed/approved, merge into `main` using standard merge or squash.
   - Deleting the merged branch keeps the repository clean.

---

## 🛠️ Code Quality Standards

- **TypeScript:** Strict type checking enabled (`noImplicitAny`, strict null checks). Avoid `any` where typed interfaces can be defined.
- **Frontend Styling:** Use Tailwind CSS utility classes and ensure responsive design across devices.
- **Backend Architecture:** Adhere to NestJS modular design (Modules, Controllers, Services) and dependency injection.
- **Testing:** Add unit tests (`*.spec.ts`) for services/controllers and e2e tests (`*.e2e-spec.ts`) for HTTP endpoints.
