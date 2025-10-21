export interface Cell {
  id: string;
  value: number;
}

export interface GameState {
  board: Cell[][];
  score: number;
}

export type Direction =
  | 'LEFT'
  | 'RIGHT'
  | 'UP_LEFT'
  | 'UP_RIGHT'
  | 'DOWN_LEFT'
  | 'DOWN_RIGHT';
