import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/admin-dashboard/admin-dashboard').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'architect',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/architect-dashboard/architect-dashboard').then(
        (m) => m.ArchitectDashboardComponent
      ),
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/projects/pages/projects-home/projects-home').then(
        (m) => m.ProjectsHomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
