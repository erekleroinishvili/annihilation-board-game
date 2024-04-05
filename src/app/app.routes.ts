import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GameComponent,
    },
    {
        path: 'x-ray',
        component: GameComponent,
        data: {
            analysis: true,
        }
    },
    {
        path: '**',
        redirectTo: ''
    },
];
