export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP_LEFT = 'UP_LEFT',
  UP_RIGHT = 'UP_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
  DOWN_RIGHT = 'DOWN_RIGHT',
}

export interface Cell {
  id: number;
  col: number;
  row: number;
  value: number;
}

export interface GameState {
  cells: Cell[];
  score: number;
  isOver: boolean;
  [key: string]: any;
}
