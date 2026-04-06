import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { catchError, firstValueFrom, of, take } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';

// Función para validar sesión al iniciar la app. Si hay token, consulta /me para validar y actualizar usuario. Si no es válida, limpia sesión.
// function initializeAuth() {
//   const authService = inject(AuthService);
//   if (!authService.getToken()) {
//     return Promise.resolve();
//   }
//   return firstValueFrom(
//     authService.validateSession().pipe(
//       take(1),
//       catchError(() => of(false))
//     )
//   ).then(() => undefined);
// }
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // provideAppInitializer(() => initializeAuth())
  ]
};
