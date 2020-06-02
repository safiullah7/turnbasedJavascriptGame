import Cell from './cell.js';
import Weapon from './weapon.js';

export default class Grid {
    constructor(rows, columns, p1, p2) {
        this.rows = rows;
        this.columns = columns;
        this.arrayCells = [];
        this.totalCells = [];
        this.weapons = [new Weapon("arrow"), new Weapon("axe"), new Weapon("shield"), new Weapon("thor")]
        this.player1 = p1;
        this.player2 = p2;
    }
    Generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            let cell = new Cell(this.getHeight(),this.getWidth(), i);
            let cellElement = cell.Generate(i);
            console.log(cellElement);
            this.arrayCells.push(cell);
            $('#game').append(cellElement);
        }
        this.RandomBlockages();
        this.RandomWeapons();
        this.RandomPlayers();
    }

    CheckCoordinates(x, y) {
        if (x > 9 || x < 0 || y > 9 || y < 0)
            return false;
        return true;
    }

    FindAccessibleCellsOfCell(cell, x, y, distance) {
        if (x === 1 && y === 0) { // right
            
        } else if (x === 0 && y === 1) { // up
        } else if (x === -1 && y === 0) { // left
        } else if (x === 0 && y === -1) { // down
        }
    }

    RandomPlayers() {
        let randomIndex1 = Math.floor(Math.random() * this.arrayCells.length);
        let randomCell1 = this.arrayCells[randomIndex1];
        randomCell1.setPlayer(this.player1.avatar);
        this.player1.cell = randomCell1;
        this.arrayCells.splice(randomIndex1, 1);
        
        let randomCell2 = null;
        let randomeIndex2 = null;
        do {
            randomeIndex2 = Math.floor(Math.random() * this.arrayCells.length);
            randomCell2 = this.arrayCells[randomeIndex2];
        } while (this.CheckTwoCellsAdjacent(randomCell1, randomCell2))

        randomCell2.setPlayer(this.player2.avatar);
        this.player2.cell = randomCell2;
        this.arrayCells.splice(randomeIndex2, 1);
    }

    RandomBlockages() {
        this.totalCells = this.arrayCells.slice();
        for (let i = 0; i < 10; i++) {
            let randomeIndex = Math.floor(Math.random() * this.arrayCells.length);
            let randomCell = this.arrayCells[randomeIndex];
            randomCell.setBackgroundBlocker();
            this.arrayCells.splice(randomeIndex, 1);
        }
    }
    RandomWeapons() {
        for (let i = 0; i < this.weapons.length; i++) {
            let randomeIndex = Math.floor(Math.random() * this.arrayCells.length);
            let randomCell = this.arrayCells[randomeIndex];
            console.log(this.arrayCells.length);
            randomCell.setWeapon(this.weapons[i].cssClass);
            this.arrayCells.splice(randomeIndex, 1);
        }
    }
    CheckTwoCellsAdjacent(cell1, cell2) {
        return (Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y)) == 1;
    }

    getWidth() {
        return 100 / this.columns + '%';
        //return "60px";
    }
    getHeight() {
        return 100 / this.rows + '%';

        //return "60px";
    }
}