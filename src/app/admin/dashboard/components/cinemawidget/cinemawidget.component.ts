import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { CinemaService } from '../../../../../features/services/cinema.service';
import { Cinema } from '../../../../../features/types/cinema.types';

@Component({
  selector: 'app-cinemawidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cinemawidget.component.html',
  styleUrl: './cinemawidget.component.scss',
})
export class CinemawidgetComponent {
  cinemas: WritableSignal<Cinema[]> = signal([]);

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.retrieveAllFilms();
  }

  private retrieveAllFilms = async () => {
    const cinemas = await this.cinemaService.getAllCinemas();
    this.cinemas.set(cinemas);
  };
}
