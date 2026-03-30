import { Routes } from '@angular/router';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./project-list').then((m) => m.ProjectList),
  },
  {
    path: ':id',
    loadComponent: () => import('./project-detail').then((m) => m.ProjectDetail),
  },
];
