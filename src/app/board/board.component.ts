import { Component, HostBinding, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, inject, input, } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { isPlatformBrowser } from '@angular/common';

const DEFAULT = {
  size: 10,
}

@Component({
  selector: 'board-board',
  standalone: true,
  imports: [
    CellComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() size = DEFAULT.size
  @Input() set editMode(editMode: boolean) {
    this.#editMode = editMode
    this.selected = null
  }
  get editMode() { return this.#editMode }
  #editMode = false
  checkerboard = input(false)

  private platformBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  protected get boardSize() { return this.size ?? DEFAULT.size }

  private lastStates: boolean[][][] = []

  protected state: boolean[][] = []
  private countCoins(condition: (row: number, column: number) => boolean = () => true) {
    let count = 0
    for (const r in this.state) {
      for (const c in this.state[r]) {
        if ( condition(+r, +c) && this.state[r][c] ) ++count
      }
    }
    return count
  }
  public get coinCount() {return this.countCoins()}
  public get coinCountEven() {return this.countCoins((row, column) => ((row + column) & 1) === 0)}
  public get coinCountOdd() {return this.countCoins((row, column) => ((row + column) & 1) === 1)}
  public get moveCount() {
    return this.lastStates.length
  }

  @HostBinding('class.edit-mode')
  get isEditMode() {return this.editMode }

  private resetTo(state: boolean[][]) {
    this.size = state.length
    this.lastStates = []
    this.selected = null
    this.state = state
  }

  public createRandomBoard(size = this.boardSize, chanceFilled = .3) {
    const board = this.platformBrowser
      ? this.randomBoard(size, chanceFilled)
      : this.newBoard(size)
    this.resetTo(board)
  }

  public clear() {
    this.resetTo(this.newBoard(this.boardSize))
  }

  public get undoCount() { return this.lastStates.length }

  public undo() {
    this.state = this.lastStates.pop() ?? this.state
  }

  protected selected: {row: number, column: number} | null = null

  ngOnInit(): void {
    if ( ! this.state.length ) this.createRandomBoard()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( 'size' in changes && ! changes['size'].firstChange ) {
      setTimeout(() => this.state = this.randomBoard(this.boardSize))
    }
  }

  private newBoard(size: number): boolean[][] {
    return new Array<void>(size).fill(void 0)
      .map(() => new Array<boolean>(size).fill(false))
  }

  private randomBoard(size: number, chanceFilled = .5, clearMargin = 2): boolean[][] {

    return this.newBoard(size)
      .map(row => row.map(() => Math.random() < chanceFilled))
      .map((row, r) => row.map((cell, c) => clearMargin <= r && r < size - clearMargin && clearMargin <= c && c < size - clearMargin && cell))

  }

  protected canAnnihilate(row: number, column: number) {
    return this.state[row][column] && this.countNeighbours(row, column) > 0
  }

  protected canMultiply(row: number, column: number) {
    return this.state[row][column] && ! this.onEdge(row, column) && this.countNeighbours(row, column) === 0
  }

  protected handleFlip(row: number, column: number, newState: boolean) {
    this.state = this.duplicateState(this.state, false)
    this.state[row][column] = newState
  }

  protected handleAnnihilate(row: number, column: number) {
    if ( this.selected ) {
      if ( this.areNeighbours({row, column}, this.selected) ) {
        this.doAnnihilate({row, column}, this.selected)
      }
      this.selected = null
    } else {
      const onlyNeighbour = this.onlyNeighbour(row, column)
      if ( onlyNeighbour ) this.doAnnihilate({row, column}, onlyNeighbour)
      else this.selected = {row, column}
    }
  }

  protected handleMultiply(row: number, column: number) {
    if ( this.selected ) {
      this.selected = null
      return
    }
    this.state = this.duplicateState(this.state)
    this.state[row][column] = false
    this.state[row-1][column] = this.state[row][column-1] = true
    this.state[row+1][column] = this.state[row][column+1] = true
  }

  private doAnnihilate(cell1: {row: number, column: number}, cell2: {row: number, column: number}) {
    this.state = this.duplicateState(this.state)
    this.state[cell1.row][cell1.column] = false
    this.state[cell2.row][cell2.column] = false
  }

  private onEdge(row: number, column: number) {
    return row === 0 || column === 0 || row === this.boardSize - 1 || column === this.boardSize - 1
  }

  private countNeighbours(row: number, column: number) {
    return 0 +
      (this.state[row - 1]?.[column] ? 1 : 0) +
      (this.state[row + 1]?.[column] ? 1 : 0) +
      (this.state[row]?.[column - 1] ? 1 : 0) +
      (this.state[row]?.[column + 1] ? 1 : 0);
  }

  private onlyNeighbour(row: number, column: number) {
    if ( this.countNeighbours(row, column) !== 1) {
      return null
    } else {
      return true &&
        this.state[row - 1]?.[column] ? {row: row - 1, column} :
        this.state[row + 1]?.[column] ? {row: row + 1, column} :
        this.state[row][column - 1] ? {row, column: column - 1} : {row, column: column + 1}
    }
  }

  private areNeighbours(cell1: {row: number, column: number}, cell2: {row: number, column: number}) {
    return false ||
      cell1.row === cell2.row && Math.abs(cell1.column - cell2.column) === 1 ||
      cell1.column === cell2.column && Math.abs(cell1.row - cell2.row) === 1
  }

  private duplicateState(state: boolean[][], saveState = true) {
    saveState && this.lastStates.push(state)
    return state.map(row => row.slice())
  }

  protected readonly log = console.log

}
