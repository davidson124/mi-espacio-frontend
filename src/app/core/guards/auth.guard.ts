import { AuthService } from './../../features/auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticated()){
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
