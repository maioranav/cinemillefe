import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { FilmService } from '../../../../../features/services/film.service';
import { CommonModule } from '@angular/common';
import { Film } from '../../../../../features/types/film.types';
import { LoadspinnerComponent } from '../../../../uiutils/loadspinner/loadspinner.component';

@Component({
  selector: 'app-filmwidget',
  standalone: true,
  templateUrl: './filmwidget.component.html',
  styleUrl: './filmwidget.component.scss',
  imports: [CommonModule, LoadspinnerComponent],
})
export class FilmwidgetComponent implements OnInit {
  films: WritableSignal<Film[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  @Input() set refreshEvent(event: EventEmitter<void>) {
    event.subscribe(() => this.retrieveAllFilms());
  }

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.retrieveAllFilms();
  }

  private retrieveAllFilms = async () => {
    this.isLoading.set(true);
    const films = await this.filmService.getAllFilms();
    this.films.set(films);
    this.isLoading.set(false);
  };
}
