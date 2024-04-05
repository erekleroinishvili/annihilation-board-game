import { Component, computed, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'

import { BoardComponent } from '../board/board.component'
import { NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'board-game',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    BoardComponent,
    NgIf,
    FormsModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  size = input<number>(10)

  protected showAdvancedStats = false

  private readonly data$ = inject(ActivatedRoute).data
  private readonly dataS = toSignal(this.data$)
  protected readonly analysisMode = computed(() => Boolean(this.dataS()?.['analysis']))
}
