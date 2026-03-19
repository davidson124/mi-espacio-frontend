import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log({
      role: this.selectedRole,
      ...this.form.value
    });
  }
}