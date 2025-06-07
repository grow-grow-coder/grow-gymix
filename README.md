# GROW YOUR NEED — Comprehensive Role-Based SaaS School Platform

## 🧭 Executive Summary

**GROW YOUR NEED** is a cutting-edge, modular, and AI-driven SaaS ecosystem designed to seamlessly connect every stakeholder in a school community: Parents, Students, Teachers, Administrators, Finance, Marketing, and School Owners. Each stakeholder accesses their own specialized dashboard—available on **Web**, **Android**, and **iOS** (including **Augmented Reality**)—built from a unified, local-first codebase that emphasizes **privacy**, **online**, **offline resilience**, and **high-performance**.

> 🔒 **No Third‑Party Dependencies:** All code runs locally or via approved backend API relays (foot-store, travel agencies, events, promotion, news, clothes-shop, pharmacie, grocery, transportation renting, accomodations hotel booking, home services). ensuring full data control and consistent cross-platform behavior.

# 🚀 GROW YouR NEED - Educational SaaS Platform
A comprehensive, enterprise-grade educational management system built with modern web technologies. This platform serves schools, teachers, students, parents, and administrative staff with role-based access control and multi-tenant architecture.

## ✨ Features

### 🏢 **Multi-Tenant Architecture**
- Complete tenant isolation with custom domains
- Scalable infrastructure supporting multiple schools/organizations
- Tenant-specific branding and configuration

### 👥 **Role-Based Access Control**
- **Admin/**: System management and oversight
- 
- **Administrator**: Administrator of the school HR
- **Teacher**: Course management and student tracking
- **Student**: Learning dashboard and progress monitoring
- **Parent**: Child progress monitoring and communication
- **Finance**: Financial management and reporting
- **Marketing**: Campaign management and analytics

### 🔐 **Enterprise Security**
- JWT-based authentication with refresh tokens
- Two-factor authentication support
- Audit logging for all user actions
- Session management with device tracking
- Password reset and email verification

### 📊 **Advanced Analytics**
- Real-time dashboard with key metrics
- User engagement tracking
- Revenue and financial analytics
- Performance monitoring and reporting

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark/light theme support
- Accessible components with Radix UI
- Smooth animations and transitions
- Mobile-first approach

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### **Backend & Database**
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Primary database
- **hostinger** - Serverless PostgreSQL
- 
- **Prisma** - Alternative ORM (included)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Turbopack** - Fast bundler for development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/grow-grow-coder/grow-gymix.git
cd grow-gymix
```

2. **Run setup script**
```bash
# On Unix/Linux/macOS
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh

# On Windows (PowerShell)
.\scripts\setup-env.ps1
```

3. **Configure environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env  # or your preferred editor
```

4. **Install dependencies**
```bash
npm install
```

5. **Start development**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:5173](http://localhost:5173)

## 🛠️ Environment Configuration

### Environment Files

- `.env.example` - Template with all available variables
- `.env.development` - Development-specific settings
- `.env.production` - Production-specific settings
- `.env.local` - Local overrides (gitignored)

### Key Environment Variables

```bash
# Convex Backend
CONVEX_DEPLOYMENT=your-deployment
VITE_CONVEX_URL=https://your-convex-url

# Authentication
AUTH_SECRET=your-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret

# AI Services
OPENAI_API_KEY=your-openai-key

# Remote Agents (Augment)
AUGMENT_AGENT_TOKEN=your-agent-token
GITHUB_TOKEN=your-github-token
```

## 🤖 Remote Agent Support

This project is configured for remote Augment agents with:

- **Environment isolation** - Separate configs for different environments
- **Docker support** - Containerized development and agent environments
- **GitHub integration** - Seamless code collaboration
- **Hot reload** - Live updates during development

### For Remote Agents

1. **Using Docker Compose**
   ```bash
   docker-compose up remote-agent
   ```

2. **Manual Setup**
   ```bash
   # Set agent-specific environment
   export AUGMENT_DEV_MODE=true
   export AUGMENT_LOG_LEVEL=verbose

   # Start development environment
   npm run dev
   ```

## 🔑 Demo Credentials

Use these credentials to explore different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Teacher | teacher@example.com | password123 |
| Student | student@example.com | password123 |
| Parent | parent@example.com | password123 |
| Finance | finance@example.com | password123 |
| Marketing | marketing@example.com | password123 |

## 📁 Project Structure

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:push         # Push schema to database
npx tsx src/db/seed.ts  # Seed database with demo data

# Type checking
npm run type-check      # Run TypeScript compiler
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Tenants
- `GET /api/tenants` - List tenants
- `POST /api/tenants` - Create tenant
- `GET /api/tenants/[id]` - Get tenant
- `PUT /api/tenants/[id]` - Update tenant

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/users` - User analytics
- `GET /api/analytics/revenue` - Revenue analytics

## 🔒 Security Features

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Tenant isolation and data encryption
- **Audit Logging**: Complete action tracking
- **Session Management**: Device tracking and session control
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Parameterized queries with Drizzle

## 🎨 Customization

### Theming
The application supports light/dark themes and custom branding:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ... custom colors
      }
    }
  }
}
```

### Adding New Roles
1. Update the enum in `src/db/schema.ts`
2. Add role to `AuthContext.tsx`
3. Create role-specific pages and components
4. Update navigation and access controls

## 📊 Database Schema

The application uses a comprehensive database schema with:

- **Multi-tenancy**: Tenant isolation at the database level
- **User Management**: Complete user profiles with roles
- **Audit Logging**: Track all user actions
- **Session Management**: Secure session handling
- **Notifications**: In-app notification system

Key tables:
- `tenants` - Multi-tenant organizations
- `users` - User accounts with roles
- `schools` - Educational institutions
- `audit_logs` - Action tracking
- `notifications` - User notifications
- `user_sessions` - Session management
- `settings` - Tenant-specific settings


## 🔮 Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] AI-powered insights and recommendations
- [ ] Integration with external learning management systems
- [ ] Advanced calendar and scheduling features
- [ ] Video conferencing integration
- [ ] Advanced file management and sharing

---

**Built with ❤️ for the education community**
# grow-gymix
