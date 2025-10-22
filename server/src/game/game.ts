import { Direction, GameState } from './game.types';

export class Game {
  private state: GameState;

  constructor(initialState?: GameState) {
    if (initialState) {
      this.state = initialState;
    } else {
      this.state = {
        cells: [],
        score: 0,
        isOver: false,
      };
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
    // TODO
  }

  private moveRight() {
    // TODO
  }

  private moveUpLeft() {
    // TODO
  }

  private moveUpRight() {
    // TODO
  }

  private moveDownLeft() {
    // TODO
  }

  private moveDownRight() {
    // TODO
  }

  private addRandomTile() {
    const emptyCells = this.state.cells.filter(c => c.value === 0);
    if (!emptyCells.length) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.value = Math.random() < 0.9 ? 2 : 4;
  }

  private checkGameOver() {
    // TODO
  }
}
