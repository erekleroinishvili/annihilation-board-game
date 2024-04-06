import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogConfig } from './confirm-dialog.component.model';

@Component({
  selector: 'board-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  private readonly data = inject<ConfirmDialogConfig>(MAT_DIALOG_DATA)
  protected readonly title = this.data.title
  protected readonly content = Array.isArray(this.data.content) ? this.data.content : [this.data.content]
  protected readonly trueLabel = this.data.trueLabel ?? 'Ok'
  protected readonly falseLabel = this.data.falseLabel ?? 'Cancel'
}
