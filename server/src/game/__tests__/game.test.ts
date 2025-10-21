import { Game } from '../game';
import { GameState, Direction } from '../game.types';

describe('Game', () => {
  let initialState: GameState;
  let game: Game;

  beforeEach(() => {
    initialState = {
      cells: [
        { id: 1, col: 0, row: 0, value: 2 },
        { id: 2, col: 1, row: 0, value: 2 },
        { id: 3, col: 2, row: 1, value: 4 },
        { id: 4, col: 3, row: 1, value: 0 },
      ],
      score: 0,
      isOver: false,
    };
    game = new Game(initialState);
  });

  it('should initialize game state', () => {
    expect(game.getState().cells.length).toBe(4);
    expect(game.getState().score).toBe(0);
    expect(game.checkGameOver()).toBe(false);
  });

  it('should detect game over when all cells filled', () => {
    game = new Game({
      cells: initialState.cells.map(c => ({ ...c, value: 2 })),
      score: 10,
      isOver: false,
    });
    expect(game.checkGameOver()).toBe(true);
  });

  it('should add random cell', () => {
    game.addRandomCell();
    const filledCells = game.getState().cells.filter(c => c.value !== 0);
    expect(filledCells.length).toBeGreaterThan(0);
  });

  it('should move LEFT (basic example)', () => {
    game.move(Direction.LEFT);
    // TODO: Add assertions to verify the state after move
  });
});
