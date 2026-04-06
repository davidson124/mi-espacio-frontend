import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { PublicLayoutComponent } from '../../../../core/layout/pages/public-layout/public-layout';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PublicLayoutComponent, ReactiveFormsModule, NgClass, NgIf ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  selectedRole: 'user' | 'admin' | 'architect' = 'user';
  form!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  selectRole(role: 'user' | 'admin' | 'architect') {
    this.selectedRole = role;
  }
  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }
  get emailInvalid(): boolean {
    return !!this.emailControl?.invalid && !!this.emailControl?.touched;
  }
  get passwordInvalid(): boolean {
    return !!this.passwordControl?.invalid && !!this.passwordControl?.touched;
  }
  get emailValid(): boolean {
    return !!this.emailControl?.valid && !!this.emailControl?.touched;
  }
  get passwordValid(): boolean {
    return !!this.passwordControl?.valid && !!this.passwordControl?.touched;
  }
  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Revisa los campos marcados antes de continuar.';
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.authService.saveSession(response);
        this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
        this.redirectByRole(response.user.role);
      },
      error: (error) => {
        console.log('ERROR COMPLETO DEL LOGIN:', error);
        console.log('STATUS:', error?.status);
        console.log('BODY:', error?.error);

        this.isSubmitting = false;

      if (error?.status === 401) {
      this.errorMessage = error?.error?.message || 'Correo o contraseña incorrectos.';
      return;
}
      if (error?.status === 0) {
          this.errorMessage = 'No fue posible conectar con el servidor.';
          return;
      }
        this.errorMessage = error?.error?.message || 'Ocurrió un error del servidor. Intenta nuevamente.';
      }
    });
  }
  private redirectByRole(role: 'admin' | 'architect' | 'user') {
    if (role === 'admin') {
      this.router.navigateByUrl('/admin');
      return;
    }
    if (role === 'architect') {
      this.router.navigateByUrl('/architect');
      return;
    }
    this.router.navigateByUrl('/projects');
  }
}
