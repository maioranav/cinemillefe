import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { Schedule } from '../../../features/types/schedule.types';
import { ScheduleService } from '../../../features/services/schedule.service';
import { addDays } from 'date-fns';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  schedules: WritableSignal<Schedule[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  startDate: WritableSignal<Date> = signal(new Date());
  endDate: WritableSignal<Date> = signal(addDays(new Date(), 7));

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getSchedules();
  }

  handleStartDate(e: any) {
    this.startDate.set(e.target.value);
    this.getSchedules();
  }

  handleEndDate(e: any) {
    this.endDate.set(e.target.value);
    this.getSchedules();
  }

  async getSchedules() {
    this.isLoading.set(true);
    const schedule = await this.scheduleService.getSchedulesDateRange(
      this.startDate(),
      this.endDate()
    );
    this.schedules.set(schedule);
    this.isLoading.set(false);
  }
}
