import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FilmService } from '../../../../../features/services/film.service';
import { CommonModule } from '@angular/common';
import { Film } from '../../../../../features/types/film.types';

@Component({
  selector: 'app-filmwidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filmwidget.component.html',
  styleUrl: './filmwidget.component.scss',
})
export class FilmwidgetComponent implements OnInit {
  films: WritableSignal<Film[]> = signal([]);

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.retrieveAllFilms();
  }

  private retrieveAllFilms = async () => {
    const films = await this.filmService.getAllFilms();
    this.films.set(films);
  };
}
