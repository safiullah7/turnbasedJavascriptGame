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
    UpdateProgressBar(id, power) {
        if (power < 0)
            power = 0;
        $('#' + id).val(power);
        if (power == 0 && id.includes('p1')) {
            if (confirm("Player 2 won! To restart game, press OK")) {
                location.reload();
              } else {
                txt = "You pressed Cancel!";
            }
        } else if (power == 0 && id.includes('p2')) {
            if (confirm("Player 1 won! To restart game, press OK")) {
                location.reload();
              } else {
                txt = "You pressed Cancel!";
            }
        }
    }
}