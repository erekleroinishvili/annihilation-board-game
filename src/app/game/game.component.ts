import { Component, computed, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'

import { BoardComponent } from '../board/board.component'
import { NgIf } from '@angular/common'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import { ConfirmDialogConfig } from '../confirm-dialog/confirm-dialog.component.model'


@Component({
  selector: 'board-game',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    BoardComponent,
    NgIf,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  size = input<number>(10)
  private dialog = inject(MatDialog)

  protected showAnalysisTools = false
  private spoilerAlertDone = false

  private readonly data$ = inject(ActivatedRoute).data
  private readonly dataS = toSignal(this.data$)
  protected readonly analysisMode = computed(() => Boolean(this.dataS()?.['analysis']))

  protected handleAnalysisModeToggleReuest(toChecked: boolean, slide: MatSlideToggle) {
    if ( toChecked ) {
      if ( this.spoilerAlertDone ) this.showAnalysisTools = true
      else {
        this.confirmViaDialog().subscribe(result => {
          if ( result ) {
            this.spoilerAlertDone = true
            this.showAnalysisTools = true
          } else slide.toggle()
        })
      }
    } else {
      this.showAnalysisTools = false
    }
  }

  private confirmViaDialog() {
    return this.dialog.open<ConfirmDialogComponent, ConfirmDialogConfig, boolean>(ConfirmDialogComponent, {
      data: {
        title: 'Spoiler Alert',
        content: [
          `Analysis tools may provide subtle hints and assistance that were not made available to the original contestants.`,
          'Would you like to proceed?'
        ],
        trueLabel: 'Show Analysis Tools'
      }
    }).afterClosed()
      .pipe(
        map(confirm => Boolean(confirm)), // Ensure response is a boolean
      )
  }
}
