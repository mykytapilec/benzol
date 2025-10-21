import { Cell, Direction, GameState } from './game.types';

export class Game {
  state: GameState;

  constructor(state?: GameState) {
    this.state = state ?? this.createInitialState();
  }

  private createInitialState(): GameState {
    const cells = this.generateEmptyGrid();
    this.addRandomTile(cells);
    this.addRandomTile(cells);
    this.addRandomTile(cells);
    return { cells, score: 0, isOver: false };
  }

  private generateEmptyGrid(): Cell[] {
    const layout = [3, 4, 5, 4, 3];
    const cells: Cell[] = [];
    let id = 0;

    layout.forEach((count, col) => {
      for (let row = 0; row < count; row++) {
        cells.push({ id: id++, col, row, value: 0 });
      }
    });
    return cells;
  }

  private getEmptyCells(cells: Cell[]): Cell[] {
    return cells.filter((cell) => cell.value === 0);
  }

  private addRandomTile(cells: Cell[]): void {
    const empty = this.getEmptyCells(cells);
    if (empty.length === 0) return;
    const randomCell = empty[Math.floor(Math.random() * empty.length)];
    randomCell.value = Math.random() < 0.9 ? 2 : 4;
  }

  move(direction: Direction): void {
    if (this.state.isOver) return;

    const moved = this.performMove(direction);
    if (moved) {
      this.addRandomTile(this.state.cells);
      this.checkGameOver();
    }
  }

  private performMove(direction: Direction): boolean {
    let moved = false;

    const values = this.state.cells.map((c) => c.value).filter((v) => v > 0);
    const newValues: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i] === values[i + 1]) {
        newValues.push(values[i] * 2);
        this.state.score += values[i] * 2;
        i++;
      } else {
        newValues.push(values[i]);
      }
    }

    const newCells = this.state.cells.map((c, i) => ({
      ...c,
      value: newValues[i] ?? 0,
    }));

    moved = JSON.stringify(newCells) !== JSON.stringify(this.state.cells);
    this.state.cells = newCells;

    return moved;
  }

  private checkGameOver(): void {
    const hasEmpty = this.getEmptyCells(this.state.cells).length > 0;
    const hasMoves = this.canMerge();
    this.state.isOver = !hasEmpty && !hasMoves;
  }

  private canMerge(): boolean {
    const vals = this.state.cells.map((c) => c.value);
    for (let i = 0; i < vals.length - 1; i++) {
      if (vals[i] === vals[i + 1]) return true;
    }
    return false;
  }

  print(): void {
    console.log('Score:', this.state.score);
    console.log(
      this.state.cells
        .map((c) => (c.value === 0 ? '.' : c.value.toString()))
        .join(' ')
    );
  }
}
