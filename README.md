# Next.js Full-Stack Scaffold

A production-ready Next.js full-stack application scaffold with TypeScript, Material UI, and comprehensive tooling for modern web development.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Material UI v6** for modern, accessible components
- **Emotion** for CSS-in-JS styling
- **Responsive design** with mobile-first approach
- **PWA ready** with service worker support

### Backend
- **Express.js** with TypeScript
- **Comprehensive security** with Helmet, CORS, rate limiting
- **Environment validation** with Zod
- **Structured logging** with Winston
- **Health checks** and monitoring endpoints
- **Request ID tracking** for debugging

### Development Experience
- **Monorepo** structure with pnpm workspaces
- **Shared packages** for types, utilities, and UI components
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for pre-commit hooks
- **Hot reload** for both frontend and backend

### Testing
- **Jest** for unit and integration testing
- **React Testing Library** for component testing
- **Playwright** for end-to-end testing
- **Coverage reporting** with detailed metrics

### Production
- **Docker** support with multi-stage builds
- **Docker Compose** for development and production
- **Nginx** reverse proxy for production
- **Health checks** and graceful shutdown
- **Environment-based configuration**

## 📁 Project Structure

```
├── apps/
│   ├── frontend/                 # Next.js application
│   │   ├── src/
│   │   │   ├── app/             # App Router pages
│   │   │   ├── components/      # React components
│   │   │   ├── lib/             # Utilities and API client
│   │   │   └── test/            # Test setup and E2E tests
│   │   ├── public/              # Static assets
│   │   ├── playwright.config.ts # E2E test configuration
│   │   └── package.json
│   └── mock-backend/            # Express.js API server
│       ├── src/
│       │   ├── middleware/      # Express middleware
│       │   ├── routes/          # API routes
│       │   ├── config.ts        # Configuration
│       │   ├── logger.ts        # Logging setup
│       │   └── index.ts         # Server entry point
│       └── package.json
├── packages/
│   ├── shared/                  # Shared utilities and types
│   │   ├── src/
│   │   │   ├── api/            # API contracts
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── utils/          # Utility functions
│   │   │   └── env/            # Environment validation
│   │   └── package.json
│   └── ui-components/           # Shared UI components
│       ├── src/
│       │   ├── components/     # Reusable components
│       │   └── theme/          # Material UI theme
│       └── package.json
├── docker/                      # Docker configurations
│   ├── docker-compose.dev.yml  # Development environment
│   ├── docker-compose.prod.yml # Production environment
│   ├── frontend.dev.dockerfile # Frontend development
│   ├── frontend.prod.dockerfile# Frontend production
│   ├── mock-backend.dockerfile # Backend container
│   └── nginx.conf              # Nginx configuration
├── jest.config.js              # Jest configuration
├── eslint.config.js            # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **Docker** (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-fullstack-scaffold
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp apps/frontend/.env.example apps/frontend/.env.local
   cp apps/mock-backend/.env.example apps/mock-backend/.env
   ```

4. **Start development servers**
   ```bash
   # Start all services
   pnpm dev:all
   
   # Or start individually
   pnpm dev:frontend  # Frontend on http://localhost:3000
   pnpm dev:backend   # Backend on http://localhost:3001
   ```

## 🐳 Docker Development

### Development with Docker Compose

```bash
# Start all services with hot reload
pnpm docker:dev

# Or manually
docker compose -f docker/docker-compose.dev.yml up --build
```

### Production with Docker Compose

```bash
# Build and start production environment
pnpm docker:prod

# Or manually
docker compose -f docker/docker-compose.prod.yml up --build
```

## 🧪 Testing

### Unit and Integration Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### End-to-End Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

## 🔧 Development Scripts

### Root Level Commands

```bash
pnpm dev:all        # Start all development servers
pnpm build          # Build all packages (alias for build:all)
pnpm build:all      # Build all packages
pnpm lint           # Lint all packages
pnpm lint:fix       # Fix linting issues
pnpm type-check     # Run TypeScript checks
pnpm test           # Run all tests
pnpm clean          # Clean all build artifacts
```

### Package-Specific Commands

```bash
# Frontend
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend test

# Backend
pnpm --filter mock-backend dev
pnpm --filter mock-backend build
pnpm --filter mock-backend test
```

## 🏗️ Architecture

### Frontend Architecture

- **App Router**: Modern Next.js routing with layouts
- **Component Structure**: Atomic design principles
- **State Management**: React hooks and context
- **Styling**: Material UI with custom theme
- **API Integration**: Type-safe API client

### Backend Architecture

- **Layered Architecture**: Routes → Middleware → Services
- **Security First**: Comprehensive security middleware
- **Error Handling**: Centralized error handling
- **Logging**: Structured logging with request correlation
- **Configuration**: Environment-based configuration

### Shared Packages

- **Types**: Shared TypeScript interfaces
- **Utilities**: Common utility functions
- **API Contracts**: Request/response types
- **UI Components**: Reusable React components

## 📊 Architecture Diagrams

### System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (Next.js)"
        FE[Next.js App]
        FE_API[API Routes]
        FE_COMP[React Components]
    end
    
    subgraph "Backend (Express)"
        BE[Express Server]
        BE_MW[Security Middleware]
        BE_ROUTES[API Routes]
    end
    
    subgraph "Shared Packages"
        SHARED[shared]
        UI[ui-components]
    end
    
    subgraph "External"
        EXT_API[External APIs<br/>randomuser.me]
        DOCKER[Docker Environment]
    end
    
    FE --> SHARED
    FE --> UI
    FE_API --> BE
    FE --> EXT_API
    BE --> SHARED
    
    DOCKER -.-> FE
    DOCKER -.-> BE
    
    style FE fill:#e1f5fe
    style BE fill:#f3e5f5
    style SHARED fill:#e8f5e8
    style UI fill:#e8f5e8
```

### Monorepo Package Dependencies

```mermaid
graph TD
    ROOT[Root Package]
    
    subgraph "Applications"
        FRONTEND[apps/frontend]
        BACKEND[apps/mock-backend]
    end
    
    subgraph "Shared Packages"
        SHARED[packages/shared]
        UI_COMP[packages/ui-components]
    end
    
    ROOT --> FRONTEND
    ROOT --> BACKEND
    ROOT --> SHARED
    ROOT --> UI_COMP
    
    FRONTEND --> SHARED
    FRONTEND --> UI_COMP
    BACKEND --> SHARED
    
    style ROOT fill:#fff3e0
    style FRONTEND fill:#e1f5fe
    style BACKEND fill:#f3e5f5
    style SHARED fill:#e8f5e8
    style UI_COMP fill:#e8f5e8
```

### Request Flow & Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant External
    
    User->>Frontend: Visits page
    Frontend->>Frontend: Renders UI components
    User->>Frontend: Clicks "FETCH" button
    Frontend->>External: GET randomuser.me/api
    External-->>Frontend: User data response
    Frontend->>Frontend: Updates state & UI
    Frontend-->>User: Displays user data
    
    Note over Frontend,Backend: Health checks
    Frontend->>Backend: GET /api/health
    Backend-->>Frontend: Health status
```

### Docker Architecture

```mermaid
graph TB
    subgraph "Docker Network (app-network)"
        subgraph "Frontend Container"
            FE_CONT[Next.js App<br/>Port 3000]
        end
        
        subgraph "Backend Container"
            BE_CONT[Express Server<br/>Port 3001]
        end
        
        subgraph "Optional Services"
            PG[PostgreSQL<br/>Port 5432]
        end
    end
    
    subgraph "Host System"
        HOST_3000[localhost:3000]
        HOST_3001[localhost:3001]
    end
    
    subgraph "Volumes"
        FE_VOL[Frontend Code]
        BE_VOL[Backend Code]
        SHARED_VOL[Shared Packages]
    end
    
    HOST_3000 --> FE_CONT
    HOST_3001 --> BE_CONT
    FE_CONT <--> BE_CONT
    FE_CONT <--> PG
    BE_CONT <--> PG
    
    FE_VOL --> FE_CONT
    BE_VOL --> BE_CONT
    SHARED_VOL --> FE_CONT
    SHARED_VOL --> BE_CONT
    
    style FE_CONT fill:#e1f5fe
    style BE_CONT fill:#f3e5f5
    style PG fill:#fff3e0
```

### Security Middleware Flow

```mermaid
graph TD
    REQ[Incoming Request]
    
    REQ --> TRUST[Trust Proxy]
    TRUST --> HELMET[Security Headers<br/>Helmet.js]
    HELMET --> CORS[CORS Validation]
    CORS --> RATE[Rate Limiting]
    RATE --> JSON[JSON Parser]
    JSON --> VALIDATE[Input Validation]
    VALIDATE --> REQ_ID[Request ID]
    REQ_ID --> MORGAN[Logging<br/>Morgan]
    MORGAN --> ROUTES[Route Handlers]
    
    ROUTES --> NOT_FOUND[404 Handler]
    NOT_FOUND --> ERROR[Error Handler]
    ERROR --> RESPONSE[Response]
    
    style REQ fill:#ffebee
    style HELMET fill:#e8f5e8
    style CORS fill:#e8f5e8
    style RATE fill:#e8f5e8
    style VALIDATE fill:#e8f5e8
    style RESPONSE fill:#e1f5fe
```

## 🔒 Security Features

### Frontend Security
- **Content Security Policy** (CSP)
- **XSS Protection**
- **CSRF Protection**
- **Secure Headers**

### Backend Security
- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** (configurable)
- **Input validation** and sanitization
- **Request ID tracking**

## 🚀 Production Deployment

### Environment Variables

The project uses a **standardized port configuration** system with `FRONTEND_PORT` and `BACKEND_PORT` variables that are dynamically used in URLs and CORS settings. This approach provides:

- **Consistency**: All port variables follow the same naming pattern
- **Flexibility**: Easy to change ports without updating multiple files
- **Maintainability**: Single source of truth for port configuration
- **Docker Compatibility**: Works seamlessly with Docker Compose variable substitution

#### Root (.env)
```env
# Node Environment
NODE_ENV=development

# Port Configuration
FRONTEND_PORT=3000
BACKEND_PORT=3001

# Dynamic URL Construction
NEXT_PUBLIC_API_URL=http://localhost:${BACKEND_PORT}
NEXT_PUBLIC_APP_URL=http://localhost:${FRONTEND_PORT}
CORS_ORIGIN=http://localhost:${FRONTEND_PORT}

# Logging
LOG_LEVEL=debug
```

#### Frontend (.env.local)
```env
# Port Configuration
FRONTEND_PORT=3000
BACKEND_PORT=3001

# API URLs (constructed from ports)
NEXT_PUBLIC_API_URL=http://localhost:${BACKEND_PORT}
NEXT_PUBLIC_APP_URL=http://localhost:${FRONTEND_PORT}

# Environment
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

#### Backend (.env)
```env
# Server Configuration
BACKEND_PORT=3001
FRONTEND_PORT=3000
HOST=localhost
NODE_ENV=development

# CORS Configuration (uses frontend port)
CORS_ORIGIN=http://localhost:${FRONTEND_PORT}

# Logging
LOG_LEVEL=debug
```

#### Production Environment Variables

For production, update the URLs to use your actual domain:

```env
# Production Frontend
FRONTEND_PORT=3000
BACKEND_PORT=3001
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Production Backend
BACKEND_PORT=3001
FRONTEND_PORT=3000
HOST=0.0.0.0
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
API_RATE_LIMIT=1000
```

### Docker Production Build

```bash
# Build production images
docker compose -f docker/docker-compose.prod.yml build

# Deploy with environment variables
docker compose -f docker/docker-compose.prod.yml up -d
```

## 📊 Monitoring and Health Checks

### Health Endpoints

- **Frontend**: `GET /api/health`
- **Backend**: `GET /health` or `GET /api/health`

### Logging

- **Structured JSON logs** in production
- **Request correlation** with unique IDs
- **Error tracking** with stack traces
- **Performance metrics**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Quality

- **ESLint**: Enforced code style
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking
- **Pre-commit hooks**: Automated quality checks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Material UI** for the component library
- **Express.js** for the backend framework
- **TypeScript** for type safety
- **pnpm** for efficient package management

---

## 🔗 Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [pnpm Documentation](https://pnpm.io/)

---

**Happy coding! 🎉**
