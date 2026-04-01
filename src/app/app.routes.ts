import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/dashboard/pages/admin-dashboard/admin-dashboard').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'architect',
    loadComponent: () =>
      import('./features/dashboard/pages/architect-dashboard/architect-dashboard').then(
        (m) => m.ArchitectDashboardComponent
      ),
  },
  {
    path: 'projects',
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
