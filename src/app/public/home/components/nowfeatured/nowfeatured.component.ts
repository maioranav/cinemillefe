import { Component, Input } from '@angular/core';
import { Film } from '../../../../../features/types/film.types';

@Component({
  selector: 'app-nowfeatured',
  standalone: true,
  imports: [],
  templateUrl: './nowfeatured.component.html',
  styleUrl: './nowfeatured.component.scss',
})
export class NowfeaturedComponent {
  @Input() film?: Film;
}
