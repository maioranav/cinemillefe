import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NowfeaturedComponent } from './components/nowfeatured/nowfeatured.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [NavbarComponent, NowfeaturedComponent],
})
export class HomeComponent {}
