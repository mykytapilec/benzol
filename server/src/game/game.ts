import { Cell, Direction, GameState } from './game.types';

export class Game {
  private state: GameState;

  constructor(size = 5) {
    const cells: Cell[] = [];
    let id = 0;

    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        cells.push({ id: id++, col, row, value: 0 });
      }
    }

    this.addRandomTiles(cells, 3);

    this.state = {
      cells,
      score: 0,
      isOver: false,
    };
  }

  private addRandomTiles(cells: Cell[], count: number) {
    const empty = cells.filter(c => c.value === 0);
    for (let i = 0; i < count && empty.length > 0; i++) {
      const idx = Math.floor(Math.random() * empty.length);
      const cell = empty.splice(idx, 1)[0];
      cell.value = Math.random() < 0.9 ? 2 : 4;
    }
  }

  move(direction: Direction) {
    console.log(`Moving ${direction}`);
  }

  get cells() {
    return this.state.cells;
  }

  get score() {
    return this.state.score;
  }

  get isOver() {
    return this.state.isOver;
  }
}
