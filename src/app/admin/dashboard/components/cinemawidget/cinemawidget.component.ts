import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { CinemaService } from '../../../../../features/services/cinema.service';
import { Cinema } from '../../../../../features/types/cinema.types';
import { LoadspinnerComponent } from '../../../../uiutils/loadspinner/loadspinner.component';

@Component({
  selector: 'app-cinemawidget',
  standalone: true,
  templateUrl: './cinemawidget.component.html',
  styleUrl: './cinemawidget.component.scss',
  imports: [CommonModule, LoadspinnerComponent],
})
export class CinemawidgetComponent {
  cinemas: WritableSignal<Cinema[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  @Input() set refreshEvent(event: EventEmitter<void>) {
    event.subscribe(() => this.retrieveAllFilms());
  }

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.retrieveAllFilms();
  }

  private retrieveAllFilms = async () => {
    this.isLoading.set(true);
    const cinemas = await this.cinemaService.getAllCinemas();
    this.cinemas.set(cinemas);
    this.isLoading.set(false);
  };
}
