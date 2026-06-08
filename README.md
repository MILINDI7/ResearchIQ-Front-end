# Research IQ — Frontend

A multi-role research collaboration platform that connects researchers, funders, department heads, research managers, and platform administrators. Built with React, TypeScript, and Vite.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Pages & Routes](#pages--routes)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Connecting to the Backend](#connecting-to-the-backend)
- [Demo Accounts](#demo-accounts)
- [Available Scripts](#available-scripts)
- [API Layer](#api-layer)

---

## Overview

Research IQ is a platform where researchers can publish work, discover collaborators, apply for funding, and track analytics. Funders can browse research projects and express funding interest. Admins manage user approvals, publications, and platform security. Managers and Department Heads get dedicated analytics dashboards.

The frontend communicates with a Spring Boot REST API backend over JWT-authenticated HTTP calls. All API routes are prefixed at `/api/v1`.

---

## Tech Stack

| Concern | Technology |
|---|---|
| Language | TypeScript |
| Framework | React 18 |
| Build tool | Vite 6 |
| Package manager | pnpm |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| UI components | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Icons | Lucide React |
| Animations | Motion (Framer Motion) |
| Forms | React Hook Form |
| Notifications | Sonner |
| Drag and drop | React DnD |

---

## Project Structure

```
src/
├── api/                    # HTTP client and per-domain API modules
│   ├── auth.ts             # Login, signup
│   ├── client.ts           # Base fetch wrapper with JWT injection
│   ├── notifications.ts    # Notifications
│   ├── requests.ts         # Collaboration & funding requests
│   ├── research.ts         # Research publications
│   └── users.ts            # User profile & admin user management
├── app/
│   ├── components/
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── DataFreshness.tsx
│   │   ├── DepartmentSelector.tsx
│   │   ├── NotificationDropdown.tsx
│   │   ├── ResearcherLayout.tsx
│   │   └── SystemAnnouncements.tsx
│   ├── context/
│   │   └── AppContext.tsx   # Global state: user session, research, requests, notifications
│   ├── pages/              # One file per route (see Routes section)
│   ├── App.tsx             # Root component — wraps RouterProvider + Toaster
│   └── routes.tsx          # All client-side routes defined here
├── styles/                 # Global CSS, Tailwind, fonts, theme
└── main.tsx                # React DOM entry point
```

---

## User Roles

| Role | Description |
|---|---|
| `RESEARCHER` | Publish papers, discover research, find collaborators, apply for funding |
| `DEPARTMENT_HEAD` | View department-level analytics and team performance |
| `FUNDER` | Browse research projects seeking funding, express interest, post RFPs |
| `MANAGER` | Manage institutional research activities and platform-wide analytics |
| `ADMIN` | Approve/reject users and publications, manage staff accounts, platform security |

---

## Pages & Routes

| Path | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/signup` | Sign Up | Public |
| `/researcher/dashboard` | Researcher Dashboard | Researcher |
| `/feed` | Research Feed | Researcher |
| `/discover` | Discover Research | Researcher |
| `/my-profile` | My Profile | Researcher |
| `/researcher/upload` | Upload Research | Researcher |
| `/researcher/profile/:id` | Public Researcher Profile | Authenticated |
| `/collaborators` | Find Collaborators | Researcher |
| `/projects` | Browse Projects | Researcher / Funder |
| `/network` | Collaboration Network | Researcher |
| `/trends` | Research Trends | Researcher / Manager |
| `/funding` | Funding Opportunities | Researcher / Funder |
| `/expertise-map` | Expertise Map | Researcher / Manager |
| `/requests` | Collaboration & Funding Requests | Authenticated |
| `/settings` | Settings | Authenticated |
| `/admin/dashboard` | Admin Dashboard | Admin |
| `/user-access-management` | User Access Management | Admin |
| `/data-integration` | Data Integration | Admin / Manager |
| `/partner/dashboard` | Funder Dashboard | Funder |
| `/manager/dashboard` | Research Manager Dashboard | Manager |
| `/department/dashboard` | Department Head Dashboard | Department Head |

---

## Prerequisites

Make sure the following are installed before you begin:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **pnpm** v8 or higher — Install via:
  ```bash
  npm install -g pnpm
  ```
- The **Research IQ backend** running on `http://localhost:8080` (see [Connecting to the Backend](#connecting-to-the-backend))

---

## Getting Started

### 1. Clone or navigate to the project

```bash
cd "D:\FProject\ResearchIQs\Interactive UI Implementation"
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Create a `.env` file in the project root (copy from the example below). The file is already gitignored.

```bash
# .env
VITE_API_URL=http://localhost:8080/api/v1
```

> If the backend is running on a different port or host, update `VITE_API_URL` accordingly.

### 4. Start the development server

```bash
pnpm dev
```

The app will be available at **http://localhost:5173**

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL for the backend REST API | `http://localhost:8080/api/v1` |

All variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env`.

---

## Connecting to the Backend

This frontend requires the **Research IQ Spring Boot backend** to be running. The backend repo is located at `D:\FProject\research-iq-backend`.

### Backend quick start

**Requirements:** Docker Desktop running (or a local PostgreSQL instance)

The backend uses a Docker PostgreSQL container:

```bash
# If the container doesn't exist yet, create it:
docker run --name researchiq-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=researchiq_prod \
  -p 5433:5432 \
  -d postgres:17
```

Then start the backend:

```bash
cd D:\FProject\research-iq-backend

# Windows
gradlew.bat bootRun
```

The backend starts on `http://localhost:8080`. On first startup, Flyway runs all migrations and `DemoDataSeeder` automatically creates all demo accounts.

The Swagger UI is available at: **http://localhost:8080/swagger-ui.html**

---

## Demo Accounts

Use these on the Login page via the **Quick Demo Access** panel — no manual typing required.

| Role | Email | Password |
|---|---|---|
| Researcher | `sarah.chen@university.edu` | `password` |
| Department Head | `department.head@university.edu` | `password` |
| Partner / Funder | `partner@funding.com` | `partner` |
| Research Manager | `manager@researchiq.com` | `manager` |
| Admin | `admin@researchiq.com` | `admin` |

> These accounts are seeded automatically by the backend on startup. They are idempotent — re-running the backend will not create duplicates.

---

## Available Scripts

Run all scripts from inside `D:\FProject\ResearchIQs\Interactive UI Implementation`.

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite development server with hot module reload |
| `pnpm build` | Type-check and produce an optimised production build in `dist/` |

### Production build

```bash
pnpm build
```

Output goes to `dist/`. Serve it with any static file server, e.g.:

```bash
npx serve dist
```

---

## API Layer

The `src/api/` directory contains lightweight typed wrappers around `fetch`. The base client in `client.ts` automatically:

- Prepends `VITE_API_URL` to every request path
- Injects the `Authorization: Bearer <token>` header from `localStorage` when a token is present
- Throws a typed error for non-2xx responses

### Modules

| File | Endpoints covered |
|---|---|
| `auth.ts` | `POST /auth/login`, `POST /auth/signup` |
| `users.ts` | `GET /users/me`, `GET /users/:id`, admin user management |
| `research.ts` | `GET /research`, `POST /research`, analytics, trends, expertise map |
| `requests.ts` | Collaboration requests, funding interests, RFPs |
| `notifications.ts` | `GET /notifications`, unread count |

Authentication tokens are stored in `localStorage` under the key `token`. The `logout()` function in `AppContext` clears both `token` and `refreshToken`.
