import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { ScheduleService } from '../../../../../features/services/schedule.service';
import { LoadspinnerComponent } from '../../../../uiutils/loadspinner/loadspinner.component';

@Component({
  selector: 'app-schedulewidget',
  standalone: true,
  templateUrl: './schedulewidget.component.html',
  styleUrl: './schedulewidget.component.scss',
  imports: [CommonModule, LoadspinnerComponent],
})
export class SchedulewidgetComponent {
  schedules: WritableSignal<any> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  @Input() set refreshEvent(event: EventEmitter<void>) {
    event.subscribe(() => this.retrieveAllSchedules());
  }

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.retrieveAllSchedules();
  }

  private retrieveAllSchedules = async () => {
    this.isLoading.set(true);
    const schedules = await this.scheduleService.getAllSchedules();
    this.schedules.set(schedules);
    this.isLoading.set(false);
  };
}
