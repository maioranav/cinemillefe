import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login({
      username: 'admin',
      password: 'password',
    });
  }
}
