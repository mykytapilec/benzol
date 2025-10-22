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
  q: number; // ось q
  r: number; // ось r
  s: number; // ось s (всегда q + r + s = 0)
  value: number;
}

export interface GameState {
  cells: Cell[];
  score: number;
  isOver: boolean;
  [key: string]: any;
}
