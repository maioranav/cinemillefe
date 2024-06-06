import { Injectable, WritableSignal, signal } from '@angular/core';
import { AuthStatus, LoginDTO } from '../types/auth.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static instance: AuthService;

  public static getInstance = () => {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  };

  private _authStatus: WritableSignal<AuthStatus> = signal({
    isAuthenticated: false,
    isLoading: false,
  });

  public get authStatus(): AuthStatus {
    return this._authStatus();
  }

  public refreshToken = async () => {
    if (!this._authStatus().authToken) return false;

    try {
      this._authStatus.set({
        isAuthenticated: this._authStatus().isAuthenticated,
        isLoading: true,
        authToken: this._authStatus().authToken ?? '',
      });

      const request = await fetch(environment.API_BASE_URL + 'auth/refresh', {
        method: 'GET',
        headers: {
          Authorization: this._authStatus().authToken ?? '',
          'Content-Type': 'application/json',
        },
      });

      if (!request?.ok) throw new Error(await request.text());

      const data: any = request.json();

      this._authStatus.set({
        isAuthenticated: true,
        isLoading: false,
        authToken: 'Bearer ' + data.accessToken,
      });

      return true;
    } catch (e) {
      this._authStatus.set({
        isAuthenticated: false,
        isLoading: false,
        errorMessage: e as string,
      });
      console.error(e);
      return false;
    }
  };

  public login = async (loginInfo: LoginDTO) => {
    try {
      this._authStatus.set({
        isAuthenticated: false,
        isLoading: true,
      });

      const request = await fetch(environment.API_BASE_URL + 'auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!request?.ok) throw new Error(await request.text());

      const data: any = await request.json();
      this._authStatus.set({
        isAuthenticated: true,
        isLoading: false,
        authToken: 'Bearer ' + data.accessToken,
      });
    } catch (e) {
      this._authStatus.set({
        isAuthenticated: false,
        isLoading: false,
        errorMessage: e as string,
      });
      console.error(e);
    }
  };
}
