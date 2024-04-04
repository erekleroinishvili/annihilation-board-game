import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {
        path: ':size',
        component: GameComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        component: GameComponent,
    },
];
