import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

// @Component({
//   selector: 'app-projects-home',
//   standalone: true,
//   template: `
//     <h1>Projects Home</h1>
//     <p>Rol actual: {{ role }}</p>
//   `
// })
// export class ProjectsHomeComponent {
//   private authService = inject(AuthService);
//   role = this.authService.getUser()?.role ?? 'sin sesión';
// }
@Component({
  selector: 'app-projects-home',
  standalone: true,
  template: `
    <h1>Projects Home</h1>

    <p>Rol: {{ role }}</p>

    <button (click)="logout()">Cerrar sesión</button>
  `
})
export class ProjectsHomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  role = this.authService.getUser()?.role;

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
