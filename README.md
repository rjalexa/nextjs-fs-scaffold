# Next.js Full-Stack Scaffold

A production-ready Next.js full-stack application scaffold with TypeScript, Tailwind CSS + DaisyUI, and comprehensive tooling for modern web development.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** with utility-first styling
- **DaisyUI** for semantic component classes and themes
- **Framer Motion** for smooth animations and micro-interactions
- **Advanced theming** with light/dark/system mode support
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

## 🎨 Modern UI System

### Design System
- **Tailwind CSS v4**: Latest utility-first CSS framework
- **DaisyUI**: Semantic component classes with beautiful themes
- **Custom design tokens**: Consistent spacing, colors, and typography
- **Glass morphism effects**: Modern translucent UI elements
- **Gradient text**: Eye-catching hero sections and headings

### UI Components Library
- **ThemeProvider**: Advanced theme management with system preference detection
- **Button**: Feature-rich with variants (primary, secondary, accent, ghost, outline), sizes, loading states, and icons
- **Card**: Flexible layout with images, actions, loading skeletons, and hover animations
- **Alert**: Dismissible notifications with severity levels (success, error, warning, info)
- **Typography**: Inter font with advanced OpenType features

### Animation System
- **Framer Motion**: Smooth page transitions and component animations
- **Hover effects**: Interactive feedback on buttons and cards
- **Loading states**: Skeleton loaders and spinner animations
- **Micro-interactions**: Subtle animations that enhance user experience

## 📁 Project Structure

```
├── apps/
│   ├── frontend/                 # Next.js application
│   │   ├── src/
│   │   │   ├── app/             # App Router pages and layouts
│   │   │   │   ├── globals.css  # Tailwind CSS imports and custom styles
│   │   │   │   ├── layout.tsx   # Root layout with ThemeProvider
│   │   │   │   ├── page.tsx     # Modern homepage with Tailwind styling
│   │   │   │   └── theme.tsx    # Theme configuration
│   │   │   ├── lib/             # Utilities and API client
│   │   │   └── test/            # Test setup and E2E tests
│   │   ├── public/              # Static assets and images
│   │   ├── tailwind.config.js   # Tailwind CSS configuration
│   │   ├── postcss.config.cjs   # PostCSS configuration
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
│   └── ui-components/           # Modern UI component library
│       ├── src/
│       │   ├── components/     # Tailwind-based components
│       │   │   ├── ThemeProvider/ # Advanced theme management
│       │   │   ├── Button/     # Feature-rich button component
│       │   │   ├── Card/       # Flexible card component
│       │   │   ├── Alert/      # Notification component
│       │   │   └── TextField/  # Form input component
│       │   ├── theme/          # Theme configuration and tokens
│       │   └── index.ts        # Component exports
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

## 🎨 Tailwind CSS + DaisyUI Setup

### Configuration Files

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-components/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
          neutral: '#374151',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
        },
        dark: {
          primary: '#60a5fa',
          secondary: '#a78bfa',
          accent: '#22d3ee',
          neutral: '#d1d5db',
          'base-100': '#1f2937',
          'base-200': '#111827',
          'base-300': '#0f172a',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
};
```

#### `globals.css`
```css
@import 'tailwindcss';

/* Custom scrollbar styling */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-base-200;
}

::-webkit-scrollbar-thumb {
  @apply bg-base-300 rounded-full;
}

/* Glass morphism effect */
.glass {
  @apply backdrop-blur-lg bg-white/10 border border-white/20;
}

/* Gradient text effect */
.gradient-text {
  @apply bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent;
}

/* Modern button styles */
.btn-modern {
  @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5;
}
```

### Theme System

The application features an advanced theme system with:

- **Light Mode**: Clean, bright interface with blue accents
- **Dark Mode**: Modern dark interface with purple accents
- **System Mode**: Automatically follows OS preference
- **Smooth Transitions**: Animated theme switching
- **Persistent Storage**: Theme preference saved in localStorage

### Component Examples

#### Button Component
```tsx
<Button 
  variant="primary" 
  size="lg"
  startIcon={<Sparkles className="w-5 h-5" />}
  loading={isLoading}
  className="btn-modern"
>
  Get Started
</Button>
```

#### Card Component
```tsx
<Card
  title="Modern Feature"
  subtitle="Built with Tailwind CSS"
  image="/images/feature.png"
  imageHeight={200}
  actions={
    <Button variant="primary" size="sm">
      Learn More
    </Button>
  }
>
  <CardText>
    Beautiful, responsive cards with hover animations and loading states.
  </CardText>
</Card>
```

#### Alert Component
```tsx
<Alert
  severity="success"
  title="Welcome!"
  dismissible
  onDismiss={() => setAlertOpen(false)}
>
  Your modern UI experience starts here.
</Alert>
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
- **Component Structure**: Atomic design principles with Tailwind CSS
- **State Management**: React hooks and context with theme persistence
- **Styling**: Tailwind CSS + DaisyUI with custom design tokens
- **Animation**: Framer Motion for smooth interactions
- **API Integration**: Type-safe API client with loading states

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
- **UI Components**: Reusable Tailwind-based React components

## 📊 Architecture Diagrams

### System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (Next.js + Tailwind)"
        FE[Next.js App]
        FE_API[API Routes]
        FE_COMP[Tailwind Components]
        FE_THEME[Theme System]
    end
    
    subgraph "Backend (Express)"
        BE[Express Server]
        BE_MW[Security Middleware]
        BE_ROUTES[API Routes]
    end
    
    subgraph "UI Component Library"
        UI[ui-components]
        UI_THEME[ThemeProvider]
        UI_BUTTON[Button]
        UI_CARD[Card]
        UI_ALERT[Alert]
    end
    
    subgraph "Styling System"
        TAILWIND[Tailwind CSS v4]
        DAISYUI[DaisyUI]
        FRAMER[Framer Motion]
    end
    
    subgraph "Shared Packages"
        SHARED[shared]
    end
    
    subgraph "External"
        EXT_API[External APIs<br/>randomuser.me]
        DOCKER[Docker Environment]
    end
    
    FE --> UI
    FE --> SHARED
    FE_COMP --> TAILWIND
    FE_COMP --> DAISYUI
    FE_COMP --> FRAMER
    FE_THEME --> UI_THEME
    UI --> TAILWIND
    UI --> DAISYUI
    UI --> FRAMER
    FE_API --> BE
    FE --> EXT_API
    BE --> SHARED
    
    DOCKER -.-> FE
    DOCKER -.-> BE
    
    style FE fill:#e1f5fe
    style BE fill:#f3e5f5
    style UI fill:#e8f5e8
    style TAILWIND fill:#06b6d4
    style DAISYUI fill:#8b5cf6
```

### UI Component Architecture

```mermaid
graph TD
    subgraph "Theme System"
        THEME_PROVIDER[ThemeProvider]
        THEME_CONTEXT[Theme Context]
        THEME_STORAGE[localStorage]
    end
    
    subgraph "Core Components"
        BUTTON[Button Component]
        CARD[Card Component]
        ALERT[Alert Component]
        TEXTFIELD[TextField Component]
    end
    
    subgraph "Styling Layer"
        TAILWIND_CLASSES[Tailwind Classes]
        DAISYUI_THEMES[DaisyUI Themes]
        CUSTOM_CSS[Custom CSS]
        FRAMER_ANIMATIONS[Framer Animations]
    end
    
    subgraph "Application"
        APP_LAYOUT[App Layout]
        PAGES[Pages]
        COMPONENTS[Components]
    end
    
    THEME_PROVIDER --> THEME_CONTEXT
    THEME_CONTEXT --> THEME_STORAGE
    THEME_CONTEXT --> DAISYUI_THEMES
    
    BUTTON --> TAILWIND_CLASSES
    CARD --> TAILWIND_CLASSES
    ALERT --> TAILWIND_CLASSES
    TEXTFIELD --> TAILWIND_CLASSES
    
    BUTTON --> FRAMER_ANIMATIONS
    CARD --> FRAMER_ANIMATIONS
    ALERT --> FRAMER_ANIMATIONS
    
    APP_LAYOUT --> THEME_PROVIDER
    PAGES --> BUTTON
    PAGES --> CARD
    PAGES --> ALERT
    COMPONENTS --> BUTTON
    COMPONENTS --> CARD
    COMPONENTS --> ALERT
    
    style THEME_PROVIDER fill:#8b5cf6
    style TAILWIND_CLASSES fill:#06b6d4
    style DAISYUI_THEMES fill:#3b82f6
    style FRAMER_ANIMATIONS fill:#f59e0b
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
    
    subgraph "External Dependencies"
        TAILWIND[Tailwind CSS v4]
        DAISYUI[DaisyUI]
        FRAMER[Framer Motion]
        NEXT[Next.js 15]
    end
    
    ROOT --> FRONTEND
    ROOT --> BACKEND
    ROOT --> SHARED
    ROOT --> UI_COMP
    
    FRONTEND --> SHARED
    FRONTEND --> UI_COMP
    FRONTEND --> TAILWIND
    FRONTEND --> DAISYUI
    FRONTEND --> FRAMER
    FRONTEND --> NEXT
    
    UI_COMP --> TAILWIND
    UI_COMP --> DAISYUI
    UI_COMP --> FRAMER
    
    BACKEND --> SHARED
    
    style ROOT fill:#fff3e0
    style FRONTEND fill:#e1f5fe
    style BACKEND fill:#f3e5f5
    style SHARED fill:#e8f5e8
    style UI_COMP fill:#e8f5e8
    style TAILWIND fill:#06b6d4
    style DAISYUI fill:#8b5cf6
```

### Request Flow & Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant ThemeProvider
    participant Components
    participant Backend
    participant External
    
    User->>Frontend: Visits page
    Frontend->>ThemeProvider: Initialize theme
    ThemeProvider->>ThemeProvider: Load saved preference
    ThemeProvider->>Components: Apply theme classes
    Components->>Frontend: Render with Tailwind styles
    Frontend-->>User: Display modern UI
    
    User->>Frontend: Clicks theme toggle
    Frontend->>ThemeProvider: Toggle theme
    ThemeProvider->>Components: Update theme classes
    Components->>Frontend: Re-render with new theme
    Frontend-->>User: Smooth theme transition
    
    User->>Frontend: Clicks "FETCH" button
    Frontend->>Components: Show loading state
    Frontend->>External: GET randomuser.me/api
    External-->>Frontend: User data response
    Frontend->>Components: Update with data
    Components->>Frontend: Animate state change
    Frontend-->>User: Display user data with animations
    
    Note over Frontend,Backend: Health checks
    Frontend->>Backend: GET /api/health
    Backend-->>Frontend: Health status
```

### Docker Architecture

```mermaid
graph TB
    subgraph "Docker Network (app-network)"
        subgraph "Frontend Container"
            FE_CONT[Next.js App<br/>Tailwind CSS<br/>Port 3000]
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
        FE_VOL[Frontend Code<br/>+ Tailwind Config]
        BE_VOL[Backend Code]
        SHARED_VOL[Shared Packages<br/>+ UI Components]
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

## 🎨 Design System & Styling

### Tailwind CSS Benefits

1. **Utility-First Approach**
   - Rapid prototyping and development
   - Consistent design system
   - No CSS naming conflicts
   - Smaller bundle sizes with purging

2. **DaisyUI Integration**
   - Semantic component classes
   - Beautiful pre-built themes
   - Accessibility built-in
   - Easy customization

3. **Modern Features**
   - CSS Grid and Flexbox utilities
   - Responsive design utilities
   - Dark mode support
   - Custom property integration

### Color Palette

```css
/* Light Theme */
primary: #3b82f6    /* Blue */
secondary: #8b5cf6  /* Purple */
accent: #06b6d4     /* Cyan */
neutral: #374151    /* Gray */
base-100: #ffffff   /* White */

/* Dark Theme */
primary: #60a5fa    /* Light Blue */
secondary: #a78bfa  /* Light Purple */
accent: #22d3ee     /* Light Cyan */
neutral: #d1d5db    /* Light Gray */
base-100: #1f2937   /* Dark Gray */
```

### Typography

- **Font Family**: Inter with OpenType features
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Features**: Tabular numbers, contextual alternates
- **Responsive Scaling**: Mobile-first typography scale

### Animation System

- **Framer Motion**: Page transitions and component animations
- **CSS Transitions**: Hover effects and state changes
- **Loading States**: Skeleton loaders and spinners
- **Micro-interactions**: Button hover, card hover, theme switching

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

### Tailwind CSS Production Optimization

```bash
# Build with optimized CSS
pnpm build

# The build process automatically:
# - Purges unused CSS classes
# - Minifies the CSS output
# - Optimizes for production
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

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for styling
- **DaisyUI**: Leverage semantic component classes
- **Custom CSS**: Minimal custom CSS in globals.css
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Follow WCAG guidelines

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **DaisyUI** for the beautiful component library
- **Framer Motion** for smooth animations
- **Express.js** for the backend framework
- **TypeScript** for type safety
- **pnpm** for efficient package management

---

## 🔗 Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [pnpm Documentation](https://pnpm.io/)

---

**Happy coding with modern UI! 🎉**
