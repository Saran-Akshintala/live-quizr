# Live Quizr Web (Angular 17)

Navigable Angular SPA with lazy-loaded feature modules, demo mode, API service, socket placeholder, PWA manifest, and tests.

## Prerequisites

- Node.js 18+
- npm

## Run (development)

```
npm install
npm start
# open http://localhost:4200
```

Environment base URL is configured in `src/environments/environment.ts`:

```
export const environment = {
  production: false,
  API_BASE_URL: 'http://localhost:3000',
  WS_BASE_URL: 'ws://localhost:3000',
};
```

## Routes & Navigation

Top header navigation uses Angular RouterLink; you can click or enter URLs directly.

- `/` Home
- `/about` About (pings API `/health`)
- `/events` Events list (uses API if available; falls back to demo)
- `/host/:eventId` Host Console (demo link: `/host/demo`)
- `/display/:eventId` Display/Leaderboard (demo link: `/display/demo`)
- `/join/:eventId` Join flow (demo link: `/join/demo`)
- `/admin` Admin dashboard (stub)
- `/auth/login`, `/auth/register` Auth pages (stubs)
- `/demo` Demo Mode (client-only demo event with mocked data)

## Demo Mode

`/demo` sets up a client-only demo event with:

- 5 questions, 10 participants, sponsor rotation
- Links to Host/Display/Join for `eventId = demo`

Service providers for demo and API are in `src/app/services/`:

- `ApiService` – wraps HttpClient using `environment.API_BASE_URL`
- `DemoService` – mock data for demo browsing
- `SocketService` – placeholder for socket.io client (TODO: wire to backend)

## Tests

### Unit tests

```
npm test
```

Included examples:

- `HeaderComponent` renders nav links
- `EventsListComponent` uses API and falls back to demo
- `ApiService` prefixes base URL

### E2E tests (Playwright)

```
npm run e2e:install   # first time only
npm run e2e           # assumes dev server on http://localhost:4200
```

E2E covers visiting `/`, `/events`, `/about`, `/demo`, `/host/demo`, `/display/demo`, `/join/demo`, `/admin` and basic assertions.

## Build (production)

```
npm run build
```

Artifacts output to `dist/web/`.

## PWA

- Manifest is included at `src/manifest.webmanifest` and linked from `index.html`.
- Service worker is intentionally not enabled (Phase 4). To enable later, use Angular PWA or custom SW and update configuration.

## Manual QA Checklist

1. `npm ci` (or `npm install`) completes without workspace:* errors
2. `npm start` → open `http://localhost:4200`
3. Header links navigate to: About, Events, Demo, Host (demo), Display (demo), Join (demo), Admin
4. Direct URL navigation works for each route
5. `/about` shows API health status when backend at `http://localhost:3000` is running
6. `/demo` shows demo event card and links
7. Display page’s Fullscreen button toggles browser fullscreen; sponsors rotate
8. Run `npm run e2e:install` then `npm run e2e` and confirm tests pass

