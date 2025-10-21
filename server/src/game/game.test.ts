import { Game } from './game';

const game = new Game();
console.log(JSON.stringify(game.getState(), null, 2));
