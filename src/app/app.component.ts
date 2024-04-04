import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'board-root',
  standalone: true,
  imports: [
    BoardComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  size = input<number>()
}
