# 🎯 Live Quizr

A modern, interactive quiz platform built with Angular 17, featuring real-time quizzes, quiz creation/editing, and comprehensive scoring systems. Currently implemented as a frontend-only application with mock data services.

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

### 🎮 Quiz Management
- **Create Quiz**: Build custom quizzes with multiple questions and answer options
- **Edit Quiz**: Modify existing quizzes from the dashboard
- **Take Quiz**: Interactive quiz-taking with navigation and scoring
- **Quiz Results**: View scores and retake quizzes

### 🏆 Scoring & Analytics
- Real-time score calculation during quiz
- Percentage-based scoring system
- Question-by-question navigation
- Immediate feedback on completion
- Retake functionality

### 🎨 User Experience
- Modern Material Design interface
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation between pages
- Clean form layouts with validation

### 👥 User Management
- Demo user login for quiz taking
- Admin user login for quiz creation/editing
- Role-based dashboard features
- Simple authentication flow

### 📱 Current Implementation
- Frontend-only Angular 17 application
- Mock data services for quiz storage
- In-memory data persistence during session
- Fully functional UI without backend dependency

## 🛠 Technology Stack

### Frontend
- **Angular 17+** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Material** - UI components
- **SCSS** - Styling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Angular CLI** - Development tooling

### Future Backend (Planned)
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication

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
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/live-quizr.git
   cd live-quizr
   ```

2. **Navigate to the web application**
   ```bash
   cd apps/web
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:4200` (or the port shown in terminal)

### Quick Start Guide

1. **Login**: Use "Login as Demo User" or "Login as Admin User" buttons
2. **Create Quiz**: Click "Create New Quiz" from the dashboard
3. **Add Questions**: Use the form to add questions with multiple choice options
4. **Take Quiz**: Click "Start Quiz" on any quiz from the dashboard
5. **View Results**: Complete the quiz to see your score and retake if desired

## 🎮 Current Features

### Quiz Creation
- **Create Custom Quizzes**: Build quizzes with multiple questions
- **Multiple Choice Options**: Add 2-4 answer options per question
- **Correct Answer Selection**: Mark the correct answer for each question
- **Edit Existing Quizzes**: Modify quiz titles, descriptions, and questions

### Quiz Taking
- **Interactive Interface**: Navigate through questions with Previous/Next buttons
- **Answer Selection**: Click or use radio buttons to select answers
- **Progress Tracking**: See current question number and total questions
- **Score Calculation**: Get percentage-based scores upon completion

### User Management
- **Demo Mode**: Take quizzes as a regular user
- **Admin Mode**: Create and edit quizzes
- **Dashboard**: View all available quizzes and manage them

## 🔧 Development

### Available Scripts

```bash
# Development
npm start               # Start Angular development server
npm run build           # Build for production
npm run test            # Run unit tests
npm run lint            # Run ESLint
```

### Current Architecture

The application currently uses:
- **Mock Data Service**: In-memory storage for quizzes and user data
- **Angular Services**: Reactive data management with RxJS
- **Standalone Components**: Modern Angular 17 architecture
- **Material Design**: Consistent UI components

### Future Enhancements

- **Backend Integration**: Connect to NestJS API for persistent data
- **User Authentication**: Implement proper JWT-based auth
- **Real-time Features**: Add live quiz sessions with WebSockets
- **Advanced Quiz Types**: Multiple question formats, timers, etc.
- **Analytics Dashboard**: Detailed quiz performance metrics

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
