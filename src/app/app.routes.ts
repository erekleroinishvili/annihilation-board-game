import { Routes, Route } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SETTINGS } from './app.settings';

/** Routes where Analysis Mode will be made available */
const SPECIAL_ROUTES: Routes = SETTINGS.analysisMode !== 'Routes' ? [] : SETTINGS.analysisRoutes.map<Route>(route => ({
    path: route,
    component: GameComponent,
    data: {
        analysis: true,
    }
}))

export const routes: Routes = [
    /** Routes where Analysis Mode will be made available */
    ...SPECIAL_ROUTES,

    {
        path: '',
        pathMatch: 'full',
        component: GameComponent,
        data: {
            analysis: SETTINGS.analysisMode === 'Always'
        }
    },
    {
        path: '**',
        redirectTo: ''
    },
];
