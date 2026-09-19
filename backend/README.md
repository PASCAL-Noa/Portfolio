# Portfolio Backend (NestJS)

Backend API for Noa Pascal's Portfolio, built with [NestJS](https://nestjs.com/) and TypeScript.

---

##  Features

- **Architecture:** Modular NestJS architecture with dependency injection.
- **Global API Prefix:** `/api`
- **Environment Management:** `@nestjs/config` for `.env` parsing.
- **CORS Configured:** Accepts frontend requests (`http://localhost:3000` in local dev and production domains).
- **Automated Tests:** Unit & E2E tests powered by [Vitest](https://vitest.dev/).

---

##  Available Endpoints

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api` | Base API greeting |
| `GET` | `/api/health` | Healthcheck endpoint (`status`, `timestamp`, `uptime`, `environment`) |

---

##  Local Development

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example configuration file:

```bash
cp .env.example .env
```

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `4000` | Port on which the API listens |
| `NODE_ENV` | `development` | Runtime environment |
| `FRONTEND_URL` | `http://localhost:3000` | Allowed origin for CORS |

### 3. Running the Server

```bash
# Development mode with hot-reload
npm run dev

# Production build & start
npm run build
npm run start:prod
```

### 4. Running Tests

```bash
# Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e
```
