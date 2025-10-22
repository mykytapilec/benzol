import { Game } from '../game';
import { Direction } from '../game.types';
import { createEmptyGameState } from '../utils/hex-utils';

describe('Game (hex 2048)', () => {
  it('should initialize with empty state when no initialState is provided', () => {
    const game = new Game();
    const state = game.getState();

    expect(state.cells.length).toBeGreaterThan(0);
    expect(state.score).toBe(0);
    expect(state.isOver).toBe(false);
  });

  it('should add random tiles on creation', () => {
    const game = new Game();
    const state = game.getState();
    const nonZero = state.cells.filter(c => c.value > 0);
    expect(nonZero.length).toBeGreaterThanOrEqual(1);
  });

  it('should move in all six directions without throwing', () => {
    const game = new Game();
    for (const dir of Object.values(Direction)) {
      expect(() => game.move(dir)).not.toThrow();
    }
  });

  it('should merge tiles when adjacent cells have equal value', () => {
    const state = createEmptyGameState(2);
    const [a, b] = state.cells.slice(0, 2);
    a.value = 2;
    b.value = 2;

    const game = new Game(state);
    game.move(Direction.LEFT);

    const merged = game.getState().cells.filter(c => c.value === 4);
    expect(merged.length).toBeGreaterThanOrEqual(1);
  });

  it('should eventually detect game over when no moves left', () => {
    const state = createEmptyGameState(2);
    state.cells.forEach((c, i) => (c.value = i + 2));
    const game = new Game(state);
    game['checkGameOver']();
    expect(game.getState().isOver).toBe(true);
  });
});
