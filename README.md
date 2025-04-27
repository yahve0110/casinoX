# NodeStarter

A **production-ready Node.js + TypeScript + Express 5** backend template with best practices:

- DTOs, Services, Repositories
- Centralized error handling
- Logging with Winston
- Code linting, formatting, and pre-commit/pre-push hooks via Husky
- CORS and Helmet security middleware
- Health Check endpoint for server monitoring

---

## 🚀 Tech Stack

- **Node.js** 22+
- **TypeScript** 5
- **Express** 5.1
- **Winston** (logging)
- **Helmet** (security)
- **CORS** (origin control)
- **Husky** + **lint-staged** (automated code checks)
- **ESLint** + **Prettier** (code standards)
- **Jest** (unit testing)

---

## ⚙️ Available Scripts

| Script               | Description                                |
| :------------------- | :----------------------------------------- |
| `npm run dev`        | Start in development mode (watch with tsx) |
| `npm run build`      | Compile project to `dist/` folder          |
| `npm run start`      | Run compiled project                       |
| `npm run lint`       | Run ESLint to check code style             |
| `npm run format`     | Format code with Prettier                  |
| `npm run test`       | Run tests via Jest                         |
| `npm run test:watch` | Watch and run tests automatically          |

---

## 🛡️ Pre-commit and Pre-push Checks

- **Pre-commit**:
  - Linting and formatting changed files using ESLint and Prettier.
- **Pre-push**:
  - Run all Jest tests before pushing.

Hooks are configured via Husky in the `.husky/` directory.

---

## 📂 Project Structure

```bash
src/
  controllers/    # Handle requests
  db/             # Database configuration (future)
  dto/            # DTO definitions (validation)
  errors/         # Custom error classes
  middleware/     # Global middleware (error handling, cors, etc.)
  repository/     # Data access layer
  routes/         # Express routers
  services/       # Business logic
  tests/          # Jest tests
  utils/          # Utilities (e.g., Logger)
index.ts          # Entry point
```

---

## 🔧 Features

- Centralized **error handling** with custom `ApiError`.
- **Winston** for console and file-based logging.
- **CORS** configurable through environment variables.
- **Health Check** endpoint at `/api/v1/health`.
- **Alias paths** supported (`@/`).
- Code **coverage reports** with Jest.
