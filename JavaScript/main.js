import Game from './game.js';
//let Game = require('./game');


let rows = 10;
let columns = 10;

//Game.StartGame(rows, columns);
let game = new Game(true);
game.startGame(rows, columns);

$('#beforeGameStart').css('display', 'none');

