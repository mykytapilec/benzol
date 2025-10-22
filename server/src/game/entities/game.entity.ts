export class GameState {
  cells: { id: number; col: number; row: number; value: number }[];
  score: number;
  isOver: boolean;

  constructor(
    cells: { id: number; col: number; row: number; value: number }[] = [],
    score = 0,
    isOver = false,
  ) {
    this.cells = cells;
    this.score = score;
    this.isOver = isOver;
  }

  checkGameOver(): boolean {
    return this.isOver || this.cells.length >= 16;
  }
}

export class Game {
  id!: number;
  userId!: number;
  state: GameState;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
    this.state = new GameState(
      partial.state?.cells || [],
      partial.state?.score || 0,
      partial.state?.isOver || false,
    );
  }
}
