import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.routes').then((m) => m.projectRoutes),
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team').then((m) => m.Team),
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then((m) => m.Reports),
  },
  {
    path: 'inbox',
    loadComponent: () => import('./pages/inbox/inbox').then((m) => m.Inbox),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
  },
];
