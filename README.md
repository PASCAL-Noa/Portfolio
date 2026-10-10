# Portfolio - Noa Pascal

Monorepo containing the personal portfolio application ([www.noa-pascal.com](https://www.noa-pascal.com)) and its NestJS backend API service.

---

## 🏗️ Architecture Overview

The repository is structured as an npm-based monorepo separating client-side presentation from backend services:

```text
Portfolio/
├── frontend/             # Single Page Application (React 19 + TypeScript + Vite + Tailwind CSS)
│   ├── public/           # Static assets copied directly to dist/ (favicon, CV, media)
│   ├── src/              # React components, data layers, hooks, and types
│   ├── .env.example      # Example environment configuration for frontend
│   └── vite.config.ts    # Vite bundler configuration (dev server on port 3000)
│
├── backend/              # REST API Service (NestJS 12 + TypeScript + Vitest)
│   ├── src/              # Modular application code (Modules, Controllers, Services)
│   ├── test/             # End-to-end (e2e) tests with Vitest & Supertest
│   ├── .env.example      # Environment variables template for backend
│   └── vitest.config.ts  # Vitest test runner configuration
│
├── .github/              # Automation and CI/CD pipelines
│   └── workflows/
│       ├── deploy.yml    # Auto-deployment of frontend to GitHub Pages on pushes to main
│       └── pr-check.yml  # Pull Request validation (typecheck, unit/e2e tests, build)
│
├── CONTRIBUTING.md       # Contribution guidelines, branch naming, and PR merge workflow
└── README.md             # Repository documentation & onboarding guide
```

---

## ⚙️ Prerequisites

Make sure the following tools are installed on your machine before getting started:

- **Git:** `git --version`
- **Node.js:** `>= 22` (tested with Node 22 & Node 24)
- **npm:** `>= 10`

---

## 🚀 Quickstart & Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/PASCAL-Noa/Portfolio.git
cd Portfolio
```

---

### 2. Frontend Setup (`frontend/`)

The frontend is a fast modern React application built with Vite and styled with Tailwind CSS.

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **(Optional) Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at: **`http://localhost:3000`**

5. **Useful frontend commands:**
   | Command | Description |
   | :--- | :--- |
   | `npm run dev` | Starts Vite dev server with hot module replacement (HMR) |
   | `npm run typecheck` | Validates TypeScript types with `tsc --noEmit` |
   | `npm run build` | Compiles TypeScript and builds production assets into `dist/` |
   | `npm run preview` | Locally preview the built production bundle |

---

### 3. Backend Setup (`backend/`)

The backend is a modular NestJS API with global route prefix `/api`, CORS configuration, and automated Vitest testing.

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the `.env.example` template:
   ```bash
   cp .env.example .env
   ```

4. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   The API will listen on port **`4000`** (or the port defined in `.env`).

5. **Verify the server is running:**
   - Healthcheck: [`http://localhost:4000/api/health`](http://localhost:4000/api/health)
   - Root greeting: [`http://localhost:4000/api`](http://localhost:4000/api)

6. **Useful backend commands:**
   | Command | Description |
   | :--- | :--- |
   | `npm run dev` | Runs NestJS server with file watching (`nest start --watch`) |
   | `npm run typecheck` | Type-checks backend TypeScript files (`tsc --noEmit`) |
   | `npm run test` | Runs unit tests using Vitest (`vitest run`) |
   | `npm run test:e2e` | Runs end-to-end HTTP tests (`vitest run --config ./vitest.config.e2e.ts`) |
   | `npm run build` | Builds NestJS application into `dist/` |
   | `npm run start:prod` | Runs the compiled production server (`node dist/main`) |

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:4000/api` | Base URL for API calls to the backend |

### Backend (`backend/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `4000` | Port on which the NestJS HTTP server listens |
| `NODE_ENV` | `development` | Application environment (`development`, `production`, `test`) |
| `FRONTEND_URL` | `http://localhost:3000` | Allowed origin for Cross-Origin Resource Sharing (CORS) |

> 🔒 **Security Notice:** `.env` files are strictly ignored by Git (`.gitignore`). Never commit sensitive secrets or API keys. Always update `.env.example` if adding new variables.

---

## 🤝 Git Workflow & Conventions

We follow standardized branch naming and the Conventional Commits specification. For complete guidelines, please read our [CONTRIBUTING.md](./CONTRIBUTING.md).

### Branch Naming Conventions:
- `feat/*`: New features (e.g. `feat/contact-form` or `6-featbackend-bootstrap`)
- `fix/*`: Bug fixes (e.g. `fix/cv-download-404`)
- `docs/*`: Documentation changes (e.g. `docs/onboarding-guide`)
- `ci/*`: CI/CD pipeline improvements (e.g. `ci/pr-check`)
- `chore/*`: Tooling or dependency maintenance (e.g. `chore/update-deps`)

### Pull Request Checklist:
1. Create a dedicated branch from up-to-date `main`.
2. Ensure both `frontend` and `backend` pass typecheck and tests locally.
3. Open a PR with a clear summary linking the issue (e.g., `Closes #7`).
4. Ensure the GitHub Actions `PR Validation Check` workflow passes before merging.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
