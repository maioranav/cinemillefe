import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PublicComponent {}
