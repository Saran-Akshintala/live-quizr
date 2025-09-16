# 📦 Dependencies

## Frontend Dependencies (Angular 17)

### Core Angular Packages
- `@angular/core`: ^17.3.0 - Angular framework core
- `@angular/common`: ^17.3.0 - Common Angular directives and pipes
- `@angular/forms`: ^17.3.0 - Template-driven and reactive forms
- `@angular/router`: ^17.3.0 - Angular routing
- `@angular/platform-browser`: ^17.3.0 - Browser platform support
- `@angular/platform-browser-dynamic`: ^17.3.0 - Dynamic browser platform
- `@angular/animations`: ^17.3.0 - Animation framework

### UI Components
- `@angular/material`: ^17.3.10 - Material Design components
- `@angular/cdk`: ^17.3.10 - Component Development Kit
- `bootstrap`: ^5.3.8 - CSS framework
- `tailwindcss`: ^3.4.17 - Utility-first CSS framework

### Utilities
- `rxjs`: ~7.8.0 - Reactive Extensions for JavaScript
- `zone.js`: ~0.14.3 - Execution context for async operations
- `tslib`: ^2.3.0 - TypeScript runtime library

### Server-Side Rendering (Optional)
- `@angular/ssr`: ^17.3.17 - Server-side rendering support
- `@angular/platform-server`: ^17.3.0 - Server platform support
- `express`: ^4.18.2 - Web server framework

## Development Dependencies

### Build Tools
- `@angular/cli`: ^17.3.17 - Angular CLI
- `@angular-devkit/build-angular`: ^17.3.17 - Angular build tools
- `@angular/compiler-cli`: ^17.3.0 - Angular compiler

### Testing
- `jasmine-core`: ~5.1.0 - JavaScript testing framework
- `karma`: ~6.4.0 - Test runner
- `karma-chrome-launcher`: ~3.2.0 - Chrome launcher for Karma
- `karma-coverage`: ~2.2.0 - Code coverage reports
- `karma-jasmine`: ~5.1.0 - Jasmine adapter for Karma
- `karma-jasmine-html-reporter`: ~2.1.0 - HTML reporter for Jasmine
- `@playwright/test`: ^1.45.0 - End-to-end testing

### CSS Processing
- `autoprefixer`: ^10.4.21 - CSS vendor prefixing
- `postcss`: ^8.5.6 - CSS transformation tool

### TypeScript
- `typescript`: ~5.4.2 - TypeScript compiler
- `@types/jasmine`: ~5.1.0 - TypeScript definitions for Jasmine
- `@types/node`: ^18.18.0 - TypeScript definitions for Node.js
- `@types/express`: ^4.17.17 - TypeScript definitions for Express

## Installation

```bash
# Navigate to the web application directory
cd apps/web

# Install all dependencies
npm install

# Start development server
npm start
```

## Version Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Angular CLI**: v17 or higher

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This project uses Angular 17 with standalone components
- Material Design provides the UI component library
- Tailwind CSS is used for utility styling
- RxJS handles reactive data management
- All dependencies are locked to specific versions for consistency
