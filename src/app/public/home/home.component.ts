import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NowfeaturedComponent } from './components/nowfeatured/nowfeatured.component';
import { FilmcardComponent } from './components/filmcard/filmcard.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    NavbarComponent,
    NowfeaturedComponent,
    FilmcardComponent,
    FooterComponent,
  ],
})
export class HomeComponent {}
