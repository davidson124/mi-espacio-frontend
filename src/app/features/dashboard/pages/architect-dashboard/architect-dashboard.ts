import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-architect-dashboard',
  standalone: true,
  template: `
    <h1>Architect Dashboard</h1>
    <p>Rol actual: {{ role }}</p>
  `
})
export class ArchitectDashboardComponent {
  private authService = inject(AuthService);
  role = this.authService.getUser()?.role ?? 'sin sesión';
}

