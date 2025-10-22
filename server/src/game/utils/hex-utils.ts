import { Cell, GameState } from '../game.types';

export function generateHexField(radius = 2): Cell[] {
  const cells: Cell[] = [];
  let id = 1;

  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      const s = -q - r;
      cells.push({ id: id++, q, r, s, value: 0 });
    }
  }

  return cells;
}

export function createEmptyGameState(radius = 2): GameState {
  return {
    cells: generateHexField(radius),
    score: 0,
    isOver: false,
  };
}
