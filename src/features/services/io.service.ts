import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IOService {
  public async exportXLSX(): Promise<void> {
    try {
      const request = await fetch(
        environment.API_BASE_URL + 'schedule/export',
        {
          method: 'GET',
          headers: {
            Authorization: AuthService.getInstance().authStatus.authToken ?? '',
            'Content-Type': 'application/json',
          },
        }
      );
      if (!request.ok) {
        throw new Error("Errore durante l'esportazione del file");
      }

      const blob = await request.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Errore durante l'esportazione del file:", error);
    }
  }

  public async importXLSX(file: File): Promise<string | boolean> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const request = await fetch(
        environment.API_BASE_URL + 'schedule/import',
        {
          method: 'POST',
          headers: {
            Authorization: AuthService.getInstance().authStatus.authToken ?? '',
          },
          body: formData,
        }
      );

      if (!request.ok) return (await request.text()) ?? 'Something went wrong';
      return false;
    } catch (error) {
      return error as string;
    }
  }
}
