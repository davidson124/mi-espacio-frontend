import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <h1>Admin Dashboard</h1>
    <p>Rol actual: {{ role }}</p>
  `
})
export class  AdminDashboardComponent {
  private authService = inject(AuthService);
  role = this.authService.getUser()?.role ?? 'sin sesión';
}
