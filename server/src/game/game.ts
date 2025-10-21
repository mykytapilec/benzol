import { Cell, GameState, Direction } from './game.types';

export class Game {
  private board: Cell[][]; // двумерный массив ячеек
  private score: number;
  private size: number; // количество колонок = 5
  private cellsPerColumn: number[]; // [3, 4, 5, 4, 3]

  constructor() {
    this.size = 5;
    this.cellsPerColumn = [3, 4, 5, 4, 3];
    this.board = this.createEmptyBoard();
    this.score = 0;

    this.spawnInitialCells();
  }

  private createEmptyBoard(): Cell[][] {
    return this.cellsPerColumn.map((count, colIndex) =>
      Array.from({ length: count }, (_, rowIndex) => ({
        id: `${colIndex}-${rowIndex}`,
        value: 0,
      })),
    );
  }

  private spawnInitialCells(): void {
    for (let i = 0; i < 3; i++) {
      this.spawnRandomCell();
    }
  }

  private spawnRandomCell(): void {
    const emptyCells: { col: number; row: number }[] = [];

    this.board.forEach((column, colIndex) => {
      column.forEach((cell, rowIndex) => {
        if (cell.value === 0) {
          emptyCells.push({ col: colIndex, row: rowIndex });
        }
      });
    });

    if (emptyCells.length === 0) return;

    const { col, row } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.board[col][row].value = Math.random() < 0.9 ? 2 : 4;
  }

  getState(): GameState {
    return {
      board: this.board,
      score: this.score,
    };
  }
}
