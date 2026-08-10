# Luminous Infra Solutions

A full-stack marketing website and lead-management platform for **Luminous Power Infra**, a provider of high-voltage, sustainable electrical infrastructure — road lighting, solar power systems, road furniture, and traffic management solutions for industrial, commercial, and utility-scale projects.

The project has three parts:

- **Public website** (`/src`) — a React + Vite marketing site with a contact/quote request form.
- **Admin dashboard** (`/admin-dashboard`) — a password-protected React app for staff to view and manage incoming quote requests.
- **Backend API** (`/server`) — an Express + PostgreSQL API that stores and serves quote requests for both frontends.

Live site: https://luminous-infra-solutions-crp2.vercel.app

## Features

- Responsive marketing site with animated hero section, light/dark theme toggle, and smooth-scroll navigation
- Service showcase covering:
  - **Illumination** — LED lighting for roads, highways, industries, and institutions
  - **Solar Power Solutions** — on-grid/off-grid ground-mounted and rooftop solar systems (dedicated `/solar` page)
  - **Road Furniture** — traffic sign boards, road studs, delineators, crash barriers, and gantry structures
  - **Traffic Management** — safety and traffic control infrastructure
- Contact/quote request form that posts leads to the backend API
- Admin dashboard with login-gated access to view, update the status of, and delete quote requests
- REST API backed by PostgreSQL with automatic schema creation/migration on startup

## Tech Stack

| Layer | Technology |
|---|---|
| Public site | React 19, React Router 7, Vite, Axios |
| Admin dashboard | React 19, Vite |
| Backend API | Node.js, Express, `pg` (PostgreSQL), CORS, dotenv |
| Deployment | Configured for [Render](https://render.com) (`render.yaml`) and [Vercel](https://vercel.com) (`vercel.json`) |

## Project Structure

```
LuminousInfraSolutions/
├── src/                     # Public website (React app)
│   ├── components/          # Navbar, Hero, Services, About, Projects, Contact, Footer, Solar
│   ├── App.jsx
│   └── main.jsx
├── public/                  # Static assets (icons, hero image, favicon)
├── admin-dashboard/         # Standalone admin React app
│   └── src/
├── server/                  # Express + PostgreSQL API
│   └── server.js
├── render.yaml               # Render multi-service deployment config
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running PostgreSQL instance (local or hosted)

### 1. Clone the repository

```bash
git clone https://github.com/balaadityapraveenk/LuminousInfraSolutions.git
cd LuminousInfraSolutions
```

### 2. Backend API

```bash
cd server
npm install
```

Create a `.env` file in `server/` with either a single connection string or individual DB credentials:

```env
# Option A: single connection string (used for hosted/production DBs)
DATABASE_URL=postgres://user:password@host:port/dbname

# Option B: individual local settings
DB_USER=postgres
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=luminouspower

PORT=5000
```

Run the server (it creates the database/table automatically on first run):

```bash
npm run dev     # with nodemon
# or
npm start
```

The API will be available at `http://127.0.0.1:5000`, with endpoints under `/api/requests` and a health check at `/api/health`.

### 3. Public website

From the repository root:

```bash
npm install
npm run dev
```

Set the API base URL if your backend isn't running on the default local port:

```env
# .env in the repo root
VITE_API_BASE_URL=http://127.0.0.1:5000
```

### 4. Admin dashboard

```bash
cd admin-dashboard
npm install
npm run dev
```

```env
# .env in admin-dashboard/
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_ADMIN_PASSWORD=your-chosen-password
```

> The admin login username is `admin`. Be sure to set `VITE_ADMIN_PASSWORD` in production rather than relying on the built-in default.

## Available Scripts

Each of the three apps (`/`, `/admin-dashboard`, `/server`) has its own `package.json`. Common scripts:

| Command | Description |
|---|---|
| `npm run dev` | Start the app in development mode |
| `npm run build` | Build for production (frontend apps) |
| `npm run preview` | Preview the production build (frontend apps) |
| `npm start` | Start the server (backend only) |
| `npm run lint` | Run ESLint (root app) |

## Deployment

This repo includes a `render.yaml` blueprint that deploys all three services on [Render](https://render.com) in one go:

1. **luminous-backend** — Express API (Node web service)
2. **luminous-frontend** — public site (static site build)
3. **luminous-admin-dashboard** — admin dashboard (static site build)
4. **luminous-db** — managed PostgreSQL database

Each static site needs `VITE_API_BASE_URL` set to the deployed backend's public URL. The public site is currently deployed on Vercel (see `vercel.json`).

## License

No license file is currently included in this repository. Add one if you intend to open-source this project.
