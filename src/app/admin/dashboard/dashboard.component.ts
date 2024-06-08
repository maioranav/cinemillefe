import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/services/auth.service';
import { FilmwidgetComponent } from './components/filmwidget/filmwidget.component';
import { CinemawidgetComponent } from './components/cinemawidget/cinemawidget.component';
import { SchedulewidgetComponent } from './components/schedulewidget/schedulewidget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    RouterLink,
    FilmwidgetComponent,
    CinemawidgetComponent,
    SchedulewidgetComponent,
  ],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logOut() {
    AuthService.logout();
    this.router.navigate(['/']);
  }
}
