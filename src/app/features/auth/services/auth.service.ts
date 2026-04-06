import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { MeResponse } from '../interfaces/me-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;
  //Envía credenciales al backend para iniciar sesión.
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload);
  }
  //Consulta el perfil autenticado actual. El backend responde con { message, user }.
  me(): Observable<User> {
    return this.http
    .get<MeResponse>(`${this.apiUrl}/me`)
    .pipe(map((response) => response.user));
  }
  //Guarda token y usuario después del login.
  saveSession(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  //Guarda el usuario actualizado después de validar sesión.
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  // Devolver el token almacenado, o null si no existe.
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Devolver el usuario almacenado, o null si no existe.
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }
  // Verificar si el usuario está autenticado comprobando la existencia de un token.
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  // Validar la sesión actual consultando el endpoint /me. Si es válida, actualizar el usuario almacenado. Si no, limpiar la sesión.
  validateSession() {
    if (!this.getToken()) {
      return of(false);
    }
    return this.me().pipe(
      tap((user) => this.saveUser(user)),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }
  // Eliminar token y usuario para cerrar sesión.
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
