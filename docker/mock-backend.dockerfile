# Mock Backend Development Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Copy root workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
# Copy package.json files for all workspaces
COPY apps/mock-backend/package.json ./apps/mock-backend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development image
FROM base AS development
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/mock-backend/node_modules ./apps/mock-backend/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules

# Copy project files
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Expose port
EXPOSE 3001

# Start development server
CMD ["pnpm", "--filter", "mock-backend", "dev"]
