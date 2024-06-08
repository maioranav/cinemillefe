import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { ScheduleService } from '../../../../../features/services/schedule.service';

@Component({
  selector: 'app-schedulewidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedulewidget.component.html',
  styleUrl: './schedulewidget.component.scss',
})
export class SchedulewidgetComponent {
  schedules: WritableSignal<any> = signal([]);

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.retrieveAllSchedules();
  }

  private retrieveAllSchedules = async () => {
    const schedules = await this.scheduleService.getAllSchedules();
    this.schedules.set(schedules);
  };
}
