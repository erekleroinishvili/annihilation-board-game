import { Component, input } from '@angular/core';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'board-root',
  standalone: true,
  imports: [
    GameComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  size = input<number>()
}
