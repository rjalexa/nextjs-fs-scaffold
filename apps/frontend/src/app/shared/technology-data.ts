import { 
  Code, 
  Palette, 
  Sparkles, 
  Shield, 
  Server,
  TestTube,
  Settings,
  Package,
  Globe,
  Zap,
  Lock,
  FileText,
  GitBranch,
  Container,
  Layers,
  Wrench,
  Cpu,
  Activity,
  CheckCircle,
  Eye,
  Paintbrush,
  Terminal,
  LucideIcon 
} from 'lucide-react';

export interface Technology {
  name: string;
  description: string;
  image: string;
  iconComponent: LucideIcon;
  variant: 'primary' | 'secondary' | 'accent' | 'warning';
  category: 'frontend' | 'backend' | 'testing' | 'devops' | 'build';
  version?: string;
}

export interface TechnologyCategory {
  name: string;
  description: string;
  borderColor: string;
  technologies: Technology[];
}

export const technologies: Technology[] = [
  // Frontend Technologies
  {
    name: 'Next.js 15',
    description: 'The React Framework for Production. Full-stack React framework with server-side rendering, static generation, and App Router.',
    image: '/images/nextjs.png',
    iconComponent: Code,
    variant: 'primary',
    category: 'frontend',
    version: '15.1.0'
  },
  {
    name: 'React 19',
    description: 'A JavaScript library for building user interfaces with component-based architecture and virtual DOM.',
    image: '/images/react.png',
    iconComponent: Zap,
    variant: 'primary',
    category: 'frontend',
    version: '19.0.0'
  },
  {
    name: 'TypeScript 5.6',
    description: 'Full TypeScript support for enhanced developer experience, better code quality, and fewer runtime errors.',
    image: '/images/typescript.png',
    iconComponent: Shield,
    variant: 'warning',
    category: 'frontend',
    version: '5.6.0'
  },
  {
    name: 'Tailwind CSS v4',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    image: '/images/tailwind.png',
    iconComponent: Palette,
    variant: 'secondary',
    category: 'frontend',
    version: '3.4.0'
  },
  {
    name: 'DaisyUI 5.0',
    description: 'Beautiful, semantic component classes for Tailwind CSS. Build faster with pre-designed components.',
    image: '/images/daisyui.png',
    iconComponent: Sparkles,
    variant: 'accent',
    category: 'frontend',
    version: '5.0.37'
  },
  {
    name: 'Framer Motion 12.12',
    description: 'A production-ready motion library for React. Create smooth animations and micro-interactions.',
    image: '/images/framer-motion.png',
    iconComponent: Activity,
    variant: 'secondary',
    category: 'frontend',
    version: '12.12.2'
  },
  {
    name: 'Lucide React 0.511',
    description: 'Beautiful & consistent icon toolkit made by the community. Over 1000+ open source icons.',
    image: '/images/lucide.png',
    iconComponent: Eye,
    variant: 'accent',
    category: 'frontend',
    version: '0.511.0'
  },

  // Backend Technologies
  {
    name: 'Express.js 4.18',
    description: 'Fast, unopinionated, minimalist web framework for Node.js with robust middleware ecosystem.',
    image: '/images/express.png',
    iconComponent: Server,
    variant: 'primary',
    category: 'backend',
    version: '4.18.2'
  },
  {
    name: 'Node.js 20+',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine for building scalable network applications.',
    image: '/images/nodejs.png',
    iconComponent: Cpu,
    variant: 'accent',
    category: 'backend',
    version: '20.0.0+'
  },
  {
    name: 'Winston 3.11',
    description: 'A logger for just about everything. Simple profiling, multiple transports, and query support.',
    image: '/images/winston.png',
    iconComponent: FileText,
    variant: 'warning',
    category: 'backend',
    version: '3.11.0'
  },
  {
    name: 'Helmet 7.1',
    description: 'Help secure Express apps by setting various HTTP headers. Essential security middleware.',
    image: '/images/helmet.png',
    iconComponent: Lock,
    variant: 'primary',
    category: 'backend',
    version: '7.1.0'
  },
  {
    name: 'CORS 2.8',
    description: 'Node.js CORS middleware for enabling cross-origin resource sharing with various options.',
    image: '/images/cors.png',
    iconComponent: Globe,
    variant: 'secondary',
    category: 'backend',
    version: '2.8.5'
  },
  {
    name: 'Zod 3.22',
    description: 'TypeScript-first schema validation with static type inference for runtime type checking.',
    image: '/images/zod.png',
    iconComponent: CheckCircle,
    variant: 'accent',
    category: 'backend',
    version: '3.22.4'
  },

  // Testing Technologies
  {
    name: 'Jest 29.7',
    description: 'Delightful JavaScript testing framework with a focus on simplicity and powerful assertion library.',
    image: '/images/jest.png',
    iconComponent: TestTube,
    variant: 'primary',
    category: 'testing',
    version: '29.7.0'
  },
  {
    name: 'Playwright 1.40',
    description: 'Fast and reliable end-to-end testing for modern web apps across all browsers.',
    image: '/images/playwright.png',
    iconComponent: Eye,
    variant: 'secondary',
    category: 'testing',
    version: '1.40.0'
  },
  {
    name: 'React Testing Library 14.1',
    description: 'Simple and complete testing utilities that encourage good testing practices for React components.',
    image: '/images/react-testing-library.png',
    iconComponent: CheckCircle,
    variant: 'accent',
    category: 'testing',
    version: '14.1.2'
  },
  {
    name: 'ESLint 9.0',
    description: 'Find and fix problems in your JavaScript code. Pluggable and configurable linter tool.',
    image: '/images/eslint.png',
    iconComponent: Settings,
    variant: 'warning',
    category: 'testing',
    version: '9.0.0'
  },
  {
    name: 'Prettier 3.2',
    description: 'Opinionated code formatter that enforces a consistent style by parsing and reprinting code.',
    image: '/images/prettier.png',
    iconComponent: Paintbrush,
    variant: 'secondary',
    category: 'testing',
    version: '3.2.0'
  },
  {
    name: 'Husky 9.0',
    description: 'Modern native Git hooks made easy. Improve your commits and more with automated quality checks.',
    image: '/images/husky.png',
    iconComponent: GitBranch,
    variant: 'primary',
    category: 'testing',
    version: '9.0.0'
  },

  // DevOps & Infrastructure
  {
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications using containerization technology.',
    image: '/images/docker.png',
    iconComponent: Container,
    variant: 'primary',
    category: 'devops',
  },
  {
    name: 'Docker Compose',
    description: 'Tool for defining and running multi-container Docker applications with YAML configuration.',
    image: '/images/docker-compose.png',
    iconComponent: Layers,
    variant: 'secondary',
    category: 'devops',
  },
  {
    name: 'Nginx',
    description: 'High-performance HTTP server and reverse proxy, also an IMAP/POP3 proxy server.',
    image: '/images/nginx.png',
    iconComponent: Server,
    variant: 'accent',
    category: 'devops',
  },
  {
    name: 'pnpm 9.0',
    description: 'Fast, disk space efficient package manager with strict dependency resolution.',
    image: '/images/pnpm.png',
    iconComponent: Package,
    variant: 'warning',
    category: 'devops',
    version: '9.0.0'
  },

  // Build Tools
  {
    name: 'PostCSS 8.5',
    description: 'Tool for transforming CSS with JavaScript plugins. Autoprefixer, CSS modules, and more.',
    image: '/images/postcss.png',
    iconComponent: Wrench,
    variant: 'primary',
    category: 'build',
    version: '8.5.3'
  },
  {
    name: 'Autoprefixer 10.4',
    description: 'PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.',
    image: '/images/autoprefixer.png',
    iconComponent: Settings,
    variant: 'secondary',
    category: 'build',
    version: '10.4.21'
  },
  {
    name: 'tsx 4.7',
    description: 'TypeScript execute (tsx) - Enhanced Node.js to run TypeScript & ESM files directly.',
    image: '/images/tsx.png',
    iconComponent: Terminal,
    variant: 'accent',
    category: 'build',
    version: '4.7.0'
  }
];

export const technologyCategories: TechnologyCategory[] = [
  {
    name: 'Frontend Technologies',
    description: 'User interface and client-side technologies',
    borderColor: 'border-green-500',
    technologies: technologies.filter(tech => tech.category === 'frontend')
  },
  {
    name: 'Backend Technologies',
    description: 'Server-side and API technologies',
    borderColor: 'border-red-500',
    technologies: technologies.filter(tech => tech.category === 'backend')
  },
  {
    name: 'Testing & Quality',
    description: 'Testing frameworks and code quality tools',
    borderColor: 'border-blue-500',
    technologies: technologies.filter(tech => tech.category === 'testing')
  },
  {
    name: 'DevOps & Infrastructure',
    description: 'Deployment and infrastructure management',
    borderColor: 'border-purple-500',
    technologies: technologies.filter(tech => tech.category === 'devops')
  },
  {
    name: 'Build Tools',
    description: 'Development and build process tools',
    borderColor: 'border-orange-500',
    technologies: technologies.filter(tech => tech.category === 'build')
  }
];
