import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuth = AuthService.getInstance().authStatus.isAuthenticated;
    const hasToken = AuthService.getInstance().authStatus.authToken;

    if (isAuth || hasToken) {
      const auth = await AuthService.refreshToken();
      if (auth) return true;
    }
    this.router.navigate(['admin/login']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  return await inject(PermissionsService).canActivate(next, state);
};
