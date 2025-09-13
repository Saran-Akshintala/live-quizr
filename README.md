# 🎯 Live Quizr

A modern, interactive quiz platform built with Angular and NestJS, featuring real-time quizzes, multiple game modes, and comprehensive scoring systems.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Quiz Modes](#quiz-modes)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎮 Quiz Modes
- **Practice Mode**: No timer, immediate feedback after each question
- **Timed Mode**: 30-second countdown per question with pressure
- **Challenge Mode**: Fixed question set with final scoring

### 🏆 Scoring & Analytics
- Real-time score tracking
- Detailed performance analytics
- Question-by-question review
- Historical quiz results
- Performance trends and insights

### 🎨 User Experience
- Clean, modern interface
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Loading states and feedback

### 📊 Event Management
- Create and manage quiz events
- Event status tracking (Draft, Live, Ended)
- Participant management
- Event scheduling

### 🔐 Security & Authentication
- JWT-based authentication
- Role-based access control (RBAC)
- Secure API endpoints
- Data validation and sanitization

## 🛠 Technology Stack

### Frontend
- **Angular 17+** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Material** - UI components
- **SCSS** - Styling

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Server-side language
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **Passport** - Authentication middleware

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework
- **Docker** - Containerization

## 📁 Project Structure

```
live-quizr/
├── apps/
│   ├── api/                    # NestJS Backend API
│   │   ├── src/
│   │   │   ├── auth/          # Authentication module
│   │   │   ├── events/        # Events management
│   │   │   ├── quiz/          # Quiz functionality
│   │   │   ├── users/         # User management
│   │   │   └── prisma/        # Database service
│   │   └── package.json
│   │
│   └── web/                   # Angular Frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/     # Page components
│       │   │   ├── services/  # Angular services
│       │   │   └── shared/    # Shared components
│       │   └── environments/
│       └── package.json
│
├── packages/
│   └── shared/                # Shared types and utilities
│       ├── src/
│       │   ├── types/         # TypeScript interfaces
│       │   └── enums/         # Shared enumerations
│       └── package.json
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding
│
├── docker/
│   └── postgres/             # Database setup
│
└── package.json              # Root workspace config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v13 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/live-quizr.git
   cd live-quizr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.template .env
   # Edit .env with your database credentials and API keys
   ```

4. **Database setup**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker-compose up -d postgres
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database
   npx prisma db seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start API server
   npm run dev:api
   
   # Terminal 2: Start web application
   npm run dev:web
   ```

6. **Access the application**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:3000`
   - API Documentation: `http://localhost:3000/api`

## 🎮 Quiz Modes

### Practice Mode
- **Purpose**: Learning and skill building
- **Timer**: No time limit
- **Feedback**: Immediate after each question
- **Scoring**: Tracked but not competitive
- **Best for**: New users, learning concepts

### Timed Mode
- **Purpose**: Quick assessment under pressure
- **Timer**: 30 seconds per question
- **Feedback**: After quiz completion
- **Scoring**: Time-based bonus points
- **Best for**: Skill testing, competitions

### Challenge Mode
- **Purpose**: Comprehensive evaluation
- **Timer**: Overall time limit
- **Feedback**: Detailed results at end
- **Scoring**: Complex algorithm with difficulty weighting
- **Best for**: Certifications, formal assessments

## 📚 API Documentation

### Authentication Endpoints
```
POST /auth/register     # User registration
POST /auth/login        # User login
POST /auth/refresh      # Refresh JWT token
POST /auth/logout       # User logout
```

### Events Endpoints
```
GET    /events          # List all events
POST   /events          # Create new event
GET    /events/:id      # Get event details
PUT    /events/:id      # Update event
DELETE /events/:id      # Delete event
```

### Quiz Endpoints
```
POST   /quiz/start      # Start a quiz session
POST   /quiz/submit     # Submit quiz answer
GET    /quiz/results    # Get quiz results
GET    /quiz/history    # Get user quiz history
```

### Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev:api         # Start API server in development
npm run dev:web         # Start web app in development
npm run dev             # Start both API and web

# Building
npm run build:api       # Build API for production
npm run build:web       # Build web app for production
npm run build           # Build entire project

# Testing
npm run test:api        # Run API tests
npm run test:web        # Run web app tests
npm run test            # Run all tests
npm run test:e2e        # Run end-to-end tests

# Database
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database
npm run db:studio       # Open Prisma Studio

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/live_quizr"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"

# API Configuration
API_PORT=3000
API_HOST=localhost

# Frontend Configuration
WEB_PORT=4200
WEB_HOST=localhost

# External Services (Optional)
OPENAI_API_KEY="your-openai-key-for-ai-copilot"
REDIS_URL="redis://localhost:6379"
```

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Integration Tests
```bash
# Run API integration tests
npm run test:api:integration

# Run web integration tests
npm run test:web:integration
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headless mode
npm run test:e2e:headless
```

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment
```bash
# Build Docker images
docker-compose build

# Start production environment
docker-compose up -d

# View logs
docker-compose logs -f
```

### Environment-Specific Deployments

#### Staging
```bash
npm run deploy:staging
```

#### Production
```bash
npm run deploy:production
```

## 📊 Performance Considerations

### Frontend Optimization
- Lazy loading for route modules
- OnPush change detection strategy
- Image optimization and lazy loading
- Bundle size optimization with tree shaking

### Backend Optimization
- Database query optimization
- Redis caching for frequently accessed data
- Request rate limiting
- Connection pooling

### Database Optimization
- Proper indexing on frequently queried fields
- Query optimization with Prisma
- Connection pooling
- Database monitoring

## 🔒 Security Features

### Authentication & Authorization
- JWT-based stateless authentication
- Role-based access control (RBAC)
- Refresh token rotation
- Secure password hashing with bcrypt

### Data Protection
- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection
- CORS configuration
- Rate limiting

### API Security
- Helmet.js for security headers
- Request validation with class-validator
- Error handling without information leakage
- Audit logging

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines
- Follow TypeScript best practices
- Use meaningful variable and function names
- Write comprehensive tests for new features
- Update documentation for API changes
- Follow the existing code formatting

### Commit Message Convention
```
type(scope): description

feat(quiz): add timed mode functionality
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- NestJS team for the powerful backend framework
- Prisma team for the excellent ORM
- All contributors who have helped improve this project

## 📞 Support

- **Documentation**: Check our [Wiki](https://github.com/your-username/live-quizr/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/live-quizr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/live-quizr/discussions)
- **Email**: support@livequizr.com

---

**Made with ❤️ by the Live Quizr Team**
