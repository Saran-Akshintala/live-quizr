import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    title: 'Live Quizr - Landing',
  },
  {
    path: 'live-scores',
    loadComponent: () => import('./pages/live-quiz/live-quiz.component').then(m => m.LiveQuizComponent),
    title: 'Live Scores',
  },
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results.component').then(m => m.ResultsComponent),
    title: 'Results',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
  },
  {
    path: 'create-quiz',
    loadComponent: () => import('./pages/create-quiz/create-quiz.component').then(m => m.CreateQuizComponent),
    title: 'Create Quiz',
  },
  {
    path: 'create-quiz/:id',
    loadComponent: () => import('./pages/create-quiz/create-quiz.component').then(m => m.CreateQuizComponent),
    title: 'Edit Quiz',
  },
  {
    path: 'quiz/:id',
    loadComponent: () => import('./pages/quiz/quiz.component').then(m => m.QuizComponent),
    title: 'Take Quiz',
  },
  {
    path: 'live-scores/:id',
    loadComponent: () => import('./pages/live-quiz/live-quiz.component').then(m => m.LiveQuizComponent),
    title: 'Live Scores',
  },
  {
    path: 'results/:id',
    loadComponent: () => import('./pages/results/results.component').then(m => m.ResultsComponent),
    title: 'Results',
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    title: 'About',
  },
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule),
    title: 'Events',
  },
  {
    path: 'host/:eventId',
    loadChildren: () => import('./features/host/host.module').then(m => m.HostModule),
    title: 'Host Console',
  },
  {
    path: 'display/:eventId',
    loadChildren: () => import('./features/display/display.module').then(m => m.DisplayModule),
    title: 'Display',
  },
  {
    path: 'join/:eventId',
    loadChildren: () => import('./features/join/join.module').then(m => m.JoinModule),
    title: 'Join',
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    title: 'Admin',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    title: 'Auth',
  },
  {
    path: 'demo',
    loadChildren: () => import('./features/demo/demo.module').then(m => m.DemoModule),
    title: 'Demo Mode',
  },
  { path: '**', redirectTo: '' },
];