import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';

export const routes: Routes = [
  { path: '', component: PublicComponent, children: [] },
];
