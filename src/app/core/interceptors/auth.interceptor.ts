import { HttpInterceptorFn } from '@angular/common/http';

// Interceptor para agregar el token de autenticación a las solicitudes HTTP.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(authReq);
};