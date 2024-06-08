import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Pages } from '../types/pages.types';
import { Cinema } from '../types/cinema.types';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  public getAllCinemas = async () => {
    const request = await fetch(environment.API_BASE_URL + 'cinema/all', {
      method: 'GET',
      headers: {
        Authorization: AuthService.getInstance().authStatus.authToken ?? '',
        'Content-Type': 'application/json',
      },
    });

    if (!request?.ok) throw new Error(await request.text());

    const { content } = (await request.json()) as Pages<Cinema>;
    return content;
  };
}
