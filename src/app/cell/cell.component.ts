import { Component, EventEmitter, HostBinding, HostListener, Input, Output, computed, input, model } from '@angular/core';

@Component({
  selector: 'board-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {

  value = model.required<boolean>()
  index = input.required<number>()
  annihilate = input.required<boolean>()
  multiply = input.required<boolean>()
  editmode = input(false)

  @HostBinding('class.selected')
  @Input() selected?: boolean

  @Output() private readonly doAnnihilate = new EventEmitter<void>
  @Output() private readonly doMultiply = new EventEmitter<void>

  protected even = computed(() => this.index() % 2)

  @HostBinding('class.even')
  private get evenCell() { return this.even()}

  @HostBinding('class.can-annihilate')
  private get canAnihilate() { return this.annihilate() }

  @HostBinding('class.can-multiply')
  private get canMultiply() { return this.multiply() }

  @HostBinding('class.edit-mode')
  private get inEditMode() { return this.editmode() }

  @HostListener('click')
  private click() {
    if ( this.editmode() ) {
      this.value.update(val => !val)
    } else {
      this.multiply() && this.doMultiply.next()
      this.annihilate() && this.doAnnihilate.next()
    }
  }

}
