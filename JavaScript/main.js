import Game from './game.js';
import Grid from './grid.js';


let rows = 10;
let columns = 10;

//Game.StartGame(rows, columns);
let game = new Game(true);
game.startGame(rows, columns);

let player1Health = 100;
let player2Health = 100;

let p1weapon = null;
let p2weapon = null;

let p1weaponPower = null;
let p2weaponPower = null;

$('#beforeGameStart').css('display', 'none');

$('#p1Attack').click(function(e){
    e.preventDefault();
    // your statements;
    if (p1weapon == null){
        p1weapon = $('#p1Attack').data("weapon");
        p1weaponPower = GetWeaponPower(p1weapon);
    }
    player2Health = player2Health - p1weaponPower;
    UpdateProgressBar('p2PB', player2Health);
    $('#p1Attack').prop('disabled', true);
    $('#p1Defend').prop('disabled', true);

    $('#p2Attack').prop('disabled', false);
    $('#p2Defend').prop('disabled', false);
});

$('#p2Attack').on('click', function(e){
    e.preventDefault();
    // your statements;
    if (p2weapon == null) {
        p2weapon = $('#p2Attack').data("weapon");
        p2weaponPower = GetWeaponPower(p2weapon);
    }
    player1Health = player1Health - p2weaponPower;
    UpdateProgressBar('p1PB', player1Health);
    $('#p2Attack').prop('disabled', true);
    $('#p2Defend').prop('disabled', true);

    $('#p1Attack').prop('disabled', false);
    $('#p1Defend').prop('disabled', false);
});

function GetWeaponPower(weapon) {
    let power = null;
    switch (weapon) {
        case 'thor':
            power = 20;
            break;
        case 'axe':
            power = 15;
            break;
        case 'arrow':
            power = 10;
            break;
        case 'shield':
            power = 5;
            break;
        default:
            power = 0;
      }
      return power;
}

function UpdateProgressBar(id, power) {
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