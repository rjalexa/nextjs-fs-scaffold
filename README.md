# Next.js Full-Stack Application Scaffold

A production-ready Next.js full-stack application scaffold with TypeScript, Material UI, and pnpm workspaces.

## Features

- **Next.js 15+** with App Router and React 19
- **TypeScript** for type safety
- **Material UI v6** for UI components
- **pnpm Workspaces** for monorepo management
- **Express.js** mock backend for development
- **Docker** for containerization
- **ESLint & Prettier** for code quality
- **Shared packages** for code reuse

## Project Structure

```
project-root/
├── apps/
│   ├── frontend/          # Next.js application
│   └── mock-backend/      # Mock API service for development
├── packages/
│   ├── shared/            # Shared types, utilities
│   └── ui-components/     # Shared UI components
├── docker/
│   ├── frontend.dev.dockerfile
│   ├── mock-backend.dockerfile
│   └── docker-compose.dev.yml
├── pnpm-workspace.yaml
├── package.json
├── .dockerignore
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 20.x LTS
- pnpm 9.x
- Docker and Docker Compose (optional, for containerized development)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/next-fullstack-scaffold.git
cd next-fullstack-scaffold
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Copy environment files
cp apps/frontend/.env.example apps/frontend/.env
cp apps/mock-backend/.env.example apps/mock-backend/.env
```

### Development

#### Option 1: Running services individually

Start the frontend:

```bash
pnpm dev:frontend
```

Start the mock backend:

```bash
pnpm dev:backend
```

#### Option 2: Running all services locally

Start all services in parallel:

```bash
pnpm dev:all
```

#### Option 3: Running with Docker

Start all services in Docker containers:

```bash
pnpm docker:dev
```

### Building for Production

Build all packages and applications:

```bash
pnpm build:all
```

### Linting and Type Checking

Run linting:

```bash
pnpm lint
```

Fix linting issues:

```bash
pnpm lint:fix
```

Run type checking:

```bash
pnpm type-check
```

## Frontend Application

The frontend application is built with Next.js 15+ and uses the App Router. It's located in the `apps/frontend` directory.

### Key Features

- App Router with layouts and loading states
- Material UI v6 integration with SSR support
- Theme system with dark/light mode
- API client for backend integration
- Form handling with validation
- Responsive design

### Directory Structure

```
apps/frontend/
├── public/              # Static assets
├── src/
│   ├── app/             # App Router pages and layouts
│   ├── components/      # React components
│   └── lib/             # Utilities and API client
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Mock Backend

The mock backend is built with Express.js and TypeScript. It's located in the `apps/mock-backend` directory.

### Key Features

- RESTful API endpoints
- CORS configuration
- Request/response logging
- Error handling
- Environment-based configuration

### Directory Structure

```
apps/mock-backend/
├── src/
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── config.ts        # Configuration
│   ├── logger.ts        # Logging
│   └── index.ts         # Entry point
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Shared Packages

### shared

The `shared` package contains common types, utilities, and API contracts. It's located in the `packages/shared` directory.

### ui-components

The `ui-components` package contains reusable UI components built with Material UI. It's located in the `packages/ui-components` directory.

## Docker

The project includes Docker configuration for development and production environments.

### Development

```bash
docker compose -f docker/docker-compose.dev.yml up --build
```

Or use the npm script:

```bash
pnpm docker:dev
```

## License

MIT
