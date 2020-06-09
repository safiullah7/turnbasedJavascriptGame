import Player from './player.js'
import Grid from './grid.js';

export default class Game {
    constructor(status) {
        this.status = status;
    }
    startGame(rows, columns) {
        let player1 = new Player('P1', 'viking1');
        let player2 = new Player('P2', 'viking2');
        // let game = this;
        let grid = new Grid(rows, columns, player1, player2, this.status);
        grid.Generate();
    }
}