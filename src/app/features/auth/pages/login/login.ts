import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PublicLayoutComponent } from '../../../../core/layout/pages/public-layout/public-layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PublicLayoutComponent, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  selectedRole: 'user' | 'admin' | 'architect' = 'user';
  form!: FormGroup;

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
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

    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = 'Formulario válido. Listo para conectar con el backend.';
    }, 700);
  }
}
