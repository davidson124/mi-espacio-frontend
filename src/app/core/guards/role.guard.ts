import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '../../features/auth/interfaces/user.interface';


 export const roleGuard = (allowedRoles: Array<'admin' | 'architect' | 'user'>): CanActivateFn => {
   return () => {
      const authService = inject(AuthService);
      const router = inject(Router);
      const user = authService.getUser();
      //Si no hay usuario, redirigimos al login.
      if (!user) {
        router.navigateByUrl('/login');
        return false;
      }
      //Si el rol del usuario está incluido en los roles permitidos, puede acceder.
      if(allowedRoles.includes(user.role)) {
        return true;
      }
      //Si el usuario no tiene permiso, lo redirigimos a su ruta válida.
      if (user.role === 'admin') {
        router.navigateByUrl('/admin');
        return false;
      }
      if (user.role === 'architect') {
        router.navigateByUrl('/architect');
        return false;
      }
      //Si el rol no es admin ni architect, lo redirigimos a proyectos.
      router.navigateByUrl('/projects');
      return false;
   };
 };