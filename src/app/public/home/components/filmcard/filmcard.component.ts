import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filmcard',
  standalone: true,
  imports: [],
  templateUrl: './filmcard.component.html',
  styleUrl: './filmcard.component.scss',
})
export class FilmcardComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() cinemaNo!: number;
  @Input() endDate?: string;
  @Input() startDate!: string;
}
