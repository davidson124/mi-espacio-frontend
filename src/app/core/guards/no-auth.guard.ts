import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

// Guard para proteger rutas que no requieren autenticación. Si hay token, redirige a proyectos.
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if(!user) {
  return true;
  }
  if(user.role === 'admin') {
    router.navigateByUrl('/admin');
    return false;
  }
  if(user.role === 'architect') {
    router.navigateByUrl('/architect');
    return false;
  }
  router.navigateByUrl('/projects');
  return false;
};