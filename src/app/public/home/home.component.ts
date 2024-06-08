import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { isAfter, parse } from 'date-fns';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NowfeaturedComponent } from './components/nowfeatured/nowfeatured.component';
import { FilmcardComponent } from './components/filmcard/filmcard.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScheduleService } from '../../../features/services/schedule.service';
import { Schedule } from '../../../features/types/schedule.types';
import { CommonModule } from '@angular/common';
import { LoadspinnerComponent } from '../../uiutils/loadspinner/loadspinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    NavbarComponent,
    NowfeaturedComponent,
    FilmcardComponent,
    FooterComponent,
    CommonModule,
    LoadspinnerComponent,
  ],
})
export class HomeComponent implements OnInit {
  nowScheduled: WritableSignal<Schedule[]> = signal([]);
  comingSoon: WritableSignal<Schedule[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getFilms();
  }

  async getFilms() {
    this.isLoading.set(true);

    const schedules = await this.scheduleService.getPublicActiveSchedules();

    const now: Schedule[] = [];
    const soon: Schedule[] = [];

    schedules.forEach((el) => {
      if (isAfter(parse(el.startDate, 'yyyy-MM-dd', new Date()), new Date())) {
        now.push(el);
      } else {
        soon.push(el);
      }
    });

    this.nowScheduled.set(now);
    this.comingSoon.set(soon);
    this.isLoading.set(false);
  }
}
