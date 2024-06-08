import {
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/services/auth.service';
import { FilmwidgetComponent } from './components/filmwidget/filmwidget.component';
import { CinemawidgetComponent } from './components/cinemawidget/cinemawidget.component';
import { SchedulewidgetComponent } from './components/schedulewidget/schedulewidget.component';
import { LoadspinnerComponent } from '../../uiutils/loadspinner/loadspinner.component';
import { CommonModule } from '@angular/common';
import { IOService } from '../../../features/services/io.service';

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
    LoadspinnerComponent,
    CommonModule,
  ],
})
export class DashboardComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  uploadError: WritableSignal<string | boolean> = signal(false);
  selectedFile: File | null = null;

  @Output() refreshEvent = new EventEmitter<void>();

  refreshWidgets() {
    this.refreshEvent.emit();
  }

  constructor(private router: Router, private ioService: IOService) {}

  logOut() {
    AuthService.logout();
    this.router.navigate(['/']);
  }

  async exportXLSX() {
    this.isLoading.set(true);
    await this.ioService.exportXLSX();
    this.isLoading.set(false);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async upload() {
    if (!this.selectedFile) return;
    this.isLoading.set(true);
    this.uploadError.set(false);
    const request = await this.ioService.importXLSX(this.selectedFile);
    this.selectedFile = null;
    this.uploadError.set(request);
    this.isLoading.set(false);
    this.refreshWidgets();
  }
}
