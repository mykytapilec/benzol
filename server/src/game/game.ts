import { GameState, Cell, Direction } from './game.types';

export class Game {
  private state: GameState;

  constructor(initialState?: GameState) {
    this.state = initialState || { cells: [], score: 0, isOver: false };
  }

  public getState(): GameState {
    return this.state;
  }

  public checkGameOver(): boolean {
    const full = this.state.cells.every(c => c.value > 0);
    this.state.isOver = full; 
    return this.state.isOver;
  }

  public addRandomCell(): void {
    const emptyCells = this.getEmptyCells();
    if (!emptyCells.length) return;

    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    cell.value = Math.random() < 0.9 ? 2 : 4;
  }

  private getEmptyCells(): Cell[] {
    return this.state.cells.filter(c => c.value === 0);
  }

  public move(direction: Direction): void {

    if (direction === Direction.LEFT) {
      const newCells = [...this.state.cells];
      newCells.forEach(cell => {
        // TODO
      });
      this.state.cells = newCells;
    }
    // TODO
  }
}
