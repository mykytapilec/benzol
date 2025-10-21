import { Game } from './game';
import { Direction } from './game.types';

describe('Game', () => {
  it('should initialize with correct number of cells', () => {
    const game = new Game(5);
    expect(game.cells.length).toBe(25);
  });

  it('should initialize with exactly 3 non-zero tiles', () => {
    const game = new Game(5);
    const nonZeroTiles = game.cells.filter(cell => cell.value !== 0);
    expect(nonZeroTiles.length).toBe(3);
    nonZeroTiles.forEach(cell => {
      expect([2, 4]).toContain(cell.value);
    });
  });

  it('should log move direction', () => {
    const game = new Game(5);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    game.move(Direction.LEFT);
    expect(consoleSpy).toHaveBeenCalledWith('Moving LEFT');
    consoleSpy.mockRestore();
  });
});
