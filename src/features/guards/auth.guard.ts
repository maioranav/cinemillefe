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
    if (
      this.authService.authStatus.isAuthenticated ||
      this.authService.authStatus.authToken
    ) {
      console.log('sono auth');
      const auth = await this.authService.refreshToken();
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
