import { CinemaTech } from './cinema.enum';

export interface Cinema {
  capacity: number;
  cinemaNo: number;
  id: string;
  tech: CinemaTech;
}
