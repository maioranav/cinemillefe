import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../features/services/auth.service';
import { AuthStatus } from '../../features/types/auth.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  status!: AuthStatus;
  authService!: AuthService;

  constructor(private router: Router) {
    this.authService = AuthService.getInstance();
    effect(() => {
      this.status = this.authService.authStatus;
    });
  }
  logOut() {
    AuthService.logout();
    this.router.navigate(['/']);
  }
}
