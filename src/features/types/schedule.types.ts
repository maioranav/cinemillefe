import { Cinema } from './cinema.types';
import { Film } from './film.types';

export interface Schedule {
  id: string;
  film: Film;
  startDate: string;
  endDate: string;
  cinema: Cinema;
  duration: number;
}
