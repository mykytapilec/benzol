import { Direction, GameState, Cell } from './game.types';
import { createEmptyGameState } from './utils/hex-utils';

export class Game {
  private state: GameState;

  constructor(initialState?: GameState, radius = 2) {
    if (initialState) {
      this.state = initialState;
    } else {
      this.state = createEmptyGameState(radius);
      this.addRandomTile();
      this.addRandomTile();
      this.addRandomTile();
    }
  }

  getState(): GameState {
    return this.state;
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.LEFT:
        this.moveLeft();
        break;
      case Direction.RIGHT:
        this.moveRight();
        break;
      case Direction.UP_LEFT:
        this.moveUpLeft();
        break;
      case Direction.UP_RIGHT:
        this.moveUpRight();
        break;
      case Direction.DOWN_LEFT:
        this.moveDownLeft();
        break;
      case Direction.DOWN_RIGHT:
        this.moveDownRight();
        break;
    }

    this.addRandomTile();
    this.checkGameOver();
  }

  private moveLeft() {
    this.combineAndSlide(cell => cell.q, cell => cell.r, 1);
  }
  private moveRight() {
    this.combineAndSlide(cell => -cell.q, cell => cell.r, -1);
  }
  private moveUpLeft() {
    this.combineAndSlide(cell => cell.r, cell => cell.q, 1);
  }
  private moveUpRight() {
    this.combineAndSlide(cell => -cell.s, cell => cell.q, 1);
  }
  private moveDownLeft() {
    this.combineAndSlide(cell => cell.s, cell => cell.q, -1);
  }
  private moveDownRight() {
    this.combineAndSlide(cell => -cell.r, cell => cell.q, -1);
  }

  private combineAndSlide(
    groupKey: (c: Cell) => number,
    sortKey: (c: Cell) => number,
    sortDir: 1 | -1
  ) {
    const groups: Record<string, Cell[]> = {};

    for (const cell of this.state.cells) {
      const key = groupKey(cell);
      if (!groups[key]) groups[key] = [];
      groups[key].push(cell);
    }

    for (const key in groups) {
      const line = groups[key]
        .filter(c => c.value > 0)
        .sort((a, b) => sortDir * (sortKey(a) - sortKey(b)));

      const merged: number[] = [];
      for (let i = 0; i < line.length; i++) {
        const current = line[i];
        const next = line[i + 1];
        if (next && current.value === next.value) {
          current.value *= 2;
          this.state.score += current.value;
          next.value = 0;
          merged.push(next.id);
          i++;
        }
      }

      const newLine = groups[key]
        .filter(c => !merged.includes(c.id))
        .sort((a, b) => sortDir * (sortKey(a) - sortKey(b)));

      const filled = new Array(groups[key].length).fill(0);
      for (let i = 0; i < newLine.length; i++) {
        filled[i] = newLine[i].value;
      }

      const allSorted = groups[key].sort((a, b) => sortDir * (sortKey(a) - sortKey(b)));
      allSorted.forEach((cell, idx) => (cell.value = filled[idx]));
    }
  }

  private addRandomTile() {
    const emptyCells = this.state.cells.filter(c => c.value === 0);
    if (!emptyCells.length) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.value = Math.random() < 0.9 ? 2 : 4;
  }

  private checkGameOver() {
    if (this.state.cells.some(c => c.value === 0)) {
      this.state.isOver = false;
      return;
    }

    for (const cell of this.state.cells) {
      for (const dir of Object.values(Direction)) {
        const neighbor = this.getNeighbor(cell, dir as Direction);
        if (neighbor && neighbor.value === cell.value) {
          this.state.isOver = false;
          return;
        }
      }
    }
    this.state.isOver = true;
  }

  private getNeighbor(cell: Cell, dir: Direction): Cell | undefined {
    const dirs: Record<Direction, [number, number, number]> = {
      [Direction.LEFT]: [-1, 1, 0],
      [Direction.RIGHT]: [1, -1, 0],
      [Direction.UP_LEFT]: [0, -1, 1],
      [Direction.UP_RIGHT]: [1, 0, -1],
      [Direction.DOWN_LEFT]: [-1, 0, 1],
      [Direction.DOWN_RIGHT]: [0, 1, -1],
    };

    const [dq, dr, ds] = dirs[dir];
    return this.state.cells.find(
      c => c.q === cell.q + dq && c.r === cell.r + dr && c.s === cell.s + ds
    );
  }
}
