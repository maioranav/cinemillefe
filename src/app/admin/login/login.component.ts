import { Component, OnInit, effect } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../features/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStatus } from '../../../features/types/auth.types';
import { LoadspinnerComponent } from '../../uiutils/loadspinner/loadspinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    LoadspinnerComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  status!: AuthStatus;
  authService!: AuthService;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.authService = AuthService.getInstance();
    effect(() => {
      this.status = this.authService.authStatus;
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.login();
  }

  async login() {
    if (!this.loginForm.valid) return;
    await this.authService.login({
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    });

    if (!this.status.isAuthenticated) return;
    this.router.navigate(['/admin/']);
  }
}
