import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { HomeComponent } from './public/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from '../features/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { HistoryComponent } from './admin/history/history.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        title: 'Cinemille',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        title: 'Cinemille - Dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: 'history',
        title: 'Cinemille - History',
        canActivate: [AuthGuard],
        component: HistoryComponent,
      },
      {
        path: 'login',
        title: 'Cinemille - Login',
        component: LoginComponent,
      },
    ],
  },
];
