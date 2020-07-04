import Game from './game.js';
import Grid from './grid.js';


let rows = 10;
let columns = 10;

let game = new Game(true);
game.startGame(rows, columns);

$('#beforeGameStart').css('display', 'none');
