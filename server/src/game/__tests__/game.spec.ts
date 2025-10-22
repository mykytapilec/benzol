import { Game } from '../game';
import { Direction } from '../game.types';

describe('Game core logic', () => {
  it('should initialize correctly', () => {
    const game = new Game();
    expect(game.getState()).toHaveProperty('cells');
  });

  it('should add a random tile', () => {
    const game = new Game({
      cells: Array(9).fill(0).map((_, i) => ({
        id: i,
        col: i % 3,
        row: Math.floor(i / 3),
        value: 0,
      })),
      score: 0,
      isOver: false,
    });

    const before = game.getState().cells.filter(c => c.value !== 0).length;
    (game as any).addRandomTile();
    const after = game.getState().cells.filter(c => c.value !== 0).length;

    expect(after).toBeGreaterThan(before);
  });

  it('should call moveLeft without error', () => {
    const game = new Game();
    expect(() => game.move(Direction.LEFT)).not.toThrow();
  });
});
