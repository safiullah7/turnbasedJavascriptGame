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
        // 4 weapons array, loop over weapons and 
    }
    Generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            let cell = new Cell(this.getHeight(),this.getWidth(), i);
            let cellElement = cell.Generate(i);
            this.arrayCells.push(cell);
            document.getElementById('game').appendChild(cellElement);
        }
        this.RandomBlockages();
        this.RandomWeapons();
        this.RandomPlayers();
    }

    RandomPlayers() {
        let randomIndex1 = Math.floor(Math.random() * this.arrayCells.length);
        let randomCell1 = this.arrayCells[randomIndex1];
        randomCell1.setPlayer(this.player1.avatar);
        this.arrayCells.splice(randomIndex1, 1);

        console.log(this.arrayCells.length);

        let randomCell2 = null;
        let randomeIndex2 = null;
        do {
            randomeIndex2 = Math.floor(Math.random() * this.arrayCells.length);
            randomCell2 = this.arrayCells[randomeIndex2];
        } while (this.CheckTwoCellsAdjacent(randomCell1, randomCell2))

        randomCell2.setPlayer(this.player2.avatar);
        this.arrayCells.splice(randomeIndex2, 1);
    }

    RandomBlockages() {
        this.totalCells = this.arrayCells.slice(); // copying the reference. both equal ultimately. copy correctly. slice?
        for (let i = 0; i < 10; i++) {
            let randomeIndex = Math.floor(Math.random() * this.arrayCells.length);
            let randomCell = this.arrayCells[randomeIndex];
            //this.SetBackgroundBlocker(randomCell);
            randomCell.setBackgroundBlocker();
            // backgroundsize contain
            this.arrayCells.splice(randomeIndex, 1);
        }
    }
// mehtod to check two cells are adjacent or not
// return (abs(x1 - x2) + abs(y1 - y2)) == 1;
    RandomWeapons() {
        for (let i = 0; i < this.weapons.length; i++) {
            let randomeIndex = Math.floor(Math.random() * this.arrayCells.length);
            let randomCell = this.arrayCells[randomeIndex];
            console.log(this.arrayCells.length);
            randomCell.setWeapon(this.weapons[i].cssClass);
            this.arrayCells.splice(randomeIndex, 1);
        }
    }
// method to check if a cell exists. turn k wqt possible k k cell board se bhr ka ban raha ho 
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