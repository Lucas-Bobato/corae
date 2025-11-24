# 🚀 Corae API

A modern, TypeScript scalable REST API with **Express**, **Prisma**, and **Zod**.

---

## 📦 Tech Stack

- **[Express](https://expressjs.com/)** – Minimal and flexible Node.js web application framework
- **[Prisma](https://www.prisma.io/)** – Next-generation ORM for type-safe database access
- **[Zod](https://zod.dev/)** – TypeScript-first schema validation
- **[Helmet](https://helmetjs.github.io/)** – Security middleware for HTTP headers
- **[Pino](https://getpino.io/#/)** – High-performance logging
- **[Vitest](https://vitest.dev/)** – Unit & integration testing
- **[Supertest](https://github.com/visionmedia/supertest)** – HTTP assertions for Express testing

---

## 🛠 Project Structure

```

prisma/ # Database schema and Prisma configuration files

src/
    common/ # Shared resources across the app
        tests/ # Unit and integration tests
        middleware/ # Express middleware functions (auth, validation, logging)
        utils/ # General-purpose helper functions
        validation/ # Zod schemas and input validation logic

    lib/ # Core configurations and singletons
        prisma.ts # Prisma client instance

    modules/ # Feature-based modules
        restaurants/ # Example: restaurant feature (controller, service, repo, router)
        users/ # Example: users feature (controller, service, repo, router)
        reviews/ # Example: reviews feature (controller, service, repo, router)

    router/ # Central route registration and app-level routing

    index.ts # Main application entrypoint (Express app creation)
    server.ts # Server bootstrap (starts listening for requests)

```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/ijustgotanidea/corae-api.git
cd corae-api
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Configure environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Example:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000
```

### 4️⃣ Run database migrations

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start development server

```bash
pnpm run dev
```

```bash
npx prisma dev
```

API will be available at:

```
http://localhost:8888
```

---

## 📜 Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm run dev`      | Start development server with hot reload |
| `pnpm run build`    | Build the project with `tsc` and `tsup`  |
| `pnpm start`        | Run compiled production build            |
| `pnpm test`         | Run tests with Vitest                    |
| `npx prisma studio` | Open Prisma Studio for DB management     |

---

## 🧪 Testing

Run all tests:

```bash
pnpm test
```

---

## 🛡 Security

- **Helmet** for setting secure HTTP headers
- **CORS** configured for cross-origin requests
- Input validation using **Zod** to prevent malformed requests

---
