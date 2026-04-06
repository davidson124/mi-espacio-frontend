import { AuthService } from './../../features/auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';

// Guard para proteger rutas que requieren autenticación. Si no hay token, redirige a login.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.validateSession().pipe(
    map((isValid)=>{
      if(isValid) {
        return true;
      }
      router.navigateByUrl('/login');
      return false;
    })
  );
};
