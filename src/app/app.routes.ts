import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { HomeComponent } from './public/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from '../features/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
