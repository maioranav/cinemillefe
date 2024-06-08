import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Pages } from '../types/pages.types';
import { Schedule } from '../types/schedule.types';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  public getAllSchedules = async () => {
    const request = await fetch(environment.API_BASE_URL + 'schedule/all', {
      method: 'GET',
      headers: {
        Authorization: AuthService.getInstance().authStatus.authToken ?? '',
        'Content-Type': 'application/json',
      },
    });

    if (!request?.ok) throw new Error(await request.text());

    const { content } = (await request.json()) as Pages<Schedule>;
    return content;
  };

  public getPublicActiveSchedules = async () => {
    const request = await fetch(environment.API_BASE_URL + 'public/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!request?.ok) throw new Error(await request.text());

    const { content } = (await request.json()) as Pages<Schedule>;
    return content;
  };
}
