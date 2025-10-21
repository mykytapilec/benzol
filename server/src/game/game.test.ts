import { Game } from './game';
import { Direction } from './game.types';

const game = new Game();
console.log('Initial state:');
game.print();

game.move(Direction.RIGHT);
console.log('After move RIGHT:');
game.print();

game.move(Direction.LEFT);
console.log('After move LEFT:');
game.print();
