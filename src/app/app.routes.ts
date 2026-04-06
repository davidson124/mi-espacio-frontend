import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(
        (m) => m.LoginComponent
      )
  },
  {
    path: 'projects',
    canActivate: [authGuard, roleGuard(['user'])],
    loadComponent: () =>
      import('./features/projects/pages/projects-home/projects-home').then(
        (m) => m.ProjectsHomeComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/dashboard/pages/admin-dashboard/admin-dashboard').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'architect',
    canActivate: [authGuard, roleGuard(['architect'])],
    loadComponent: () =>
      import('./features/dashboard/pages/architect-dashboard/architect-dashboard').then(
        (m) => m.ArchitectDashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];