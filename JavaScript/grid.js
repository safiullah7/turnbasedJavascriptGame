import Cell from './cell.js';
import Weapon from './weapon.js';

export default class Grid {
    constructor(rows, columns, p1, p2, status) {
        this.rows = rows;
        this.columns = columns;
        this.arrayCells = [];
        this.totalCells = [];
        this.weapons = [new Weapon("arrow"), new Weapon("axe"), new Weapon("shield"), new Weapon("thor")]
        this.player1 = p1;
        this.player2 = p2;
        this.gameStatus = status;
    }
    Generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            let cell = new Cell(this.getHeight(),this.getWidth(), i);
            let cellElement = cell.Generate(i);
            // console.log(cellElement);
            this.arrayCells.push(cell);
            $('#game').append(cellElement);
        }
        this.RandomBlockages();
        this.RandomWeapons();
        this.RandomPlayers();
        //this.ActivateTurns(game);
        this.GetCellsSorroundingPlayer(this.player1.cell, 'p1');
    }

    ActivateTurns(p) {
        // console.log(game);
        // while (game.status) {
        //     this.GetCellsSorroundingPlayer(this.player1.cell);
        //     this.GetCellsSorroundingPlayer(this.player2.cell);
        // }
        if (p == 'p1') {
            this.GetCellsSorroundingPlayer(this.player1.cell, p);
        } else if (p == 'p2') {
            this.GetCellsSorroundingPlayer(this.player2.cell, p);
        }
    }

    CheckCoordinates(x, y) {
        if (x > 9 || x < 0 || y > 9 || y < 0)
            return false;
        return true;
    }

    FindAccessibleCellsOfCell(cell, x, y) {
        let cells = null;
        if (x === 1 && y === 0) { // right
            let cell1 = cell.y + 1;
            let cell2 = cell.y + 2;
            let cell3 = cell.y + 3;
            cells = this.totalCells.filter(c => c.x == cell.x && ([c.y].includes(cell1) || [c.y].includes(cell2) || [c.y].includes(cell3)));
            cells = this.CheckAccessibleCellsBlockerOrPlayer(cells);
            // console.log(cells);
            return cells;
        } else if (x === 0 && y === 1) { // up
            let cell1 = cell.x - 1 ;
            let cell2 = cell.x - 2;
            let cell3 = cell.x - 3;
            // issue here somewhere.
            cells = this.totalCells.filter(c => c.y == cell.y && ([c.x].includes(cell1) || [c.x].includes(cell2) || [c.x].includes(cell3)));
            cells = this.CheckAccessibleCellsBlockerOrPlayer(cells.reverse());
            // console.log(cells);
            return cells;
        } else if (x === -1 && y === 0) { // left
            let cell1 = cell.y - 1;
            let cell2 = cell.y - 2;
            let cell3 = cell.y - 3;
            cells = this.totalCells.filter(c => c.x == cell.x && ([c.y].includes(cell1) || [c.y].includes(cell2) || [c.y].includes(cell3)));
            cells = this.CheckAccessibleCellsBlockerOrPlayer(cells.reverse());
            // console.log(cells);
            return cells;
        } else if (x === 0 && y === -1) { // down
            let cell1 = cell.x + 1;
            let cell2 = cell.x + 2;
            let cell3 = cell.x + 3;
            cells = this.totalCells.filter(c => c.y == cell.y && ([c.x].includes(cell1) || [c.x].includes(cell2) || [c.x].includes(cell3)));
            cells = this.CheckAccessibleCellsBlockerOrPlayer(cells);
            // console.log(cells);
            return cells;
        }
    }

    CheckAccessibleCellsBlockerOrPlayer(cells) {
        let cellsToReturn = [];
        for(let i = 0; i < cells.length; i++) {
            if (!cells[i].blocker && cells[i].player == null)
            {
                cellsToReturn.push(cells[i]);
            }
            else
                break;
        }
        return cellsToReturn;
    }

    GetCellsSorroundingPlayer(cell, p) {
        let cellsOnRight = this.FindAccessibleCellsOfCell(cell, 1, 0);
        let cellsOnLeft = this.FindAccessibleCellsOfCell(cell, -1, 0);
        let cellsUpwards = this.FindAccessibleCellsOfCell(cell, 0, 1);
        let cellsDownwards = this.FindAccessibleCellsOfCell(cell, 0, -1);
        let allCells = [...cellsOnRight, ...cellsOnLeft, ...cellsUpwards, ...cellsDownwards];
        this.HighlightAccessibleCells(allCells);
        this.AddEventListenersToAccessibleCells(allCells, p);
    }

    MovePlayerOnClickingCell(cell, p) {
        if (p == 'p1') {
            this.player1.cell.html.classList.remove(this.player1.avatar);
            this.player1.cell.player = null;
            this.player1.cell = cell;
            cell.player = this.player1;
            cell.html.classList.add(this.player1.avatar);
            this.player1.cell.html.classList.add(this.player1.avatar);
            this.ActivateTurns('p2');
        } else if (p == 'p2') {
            this.player2.cell.html.classList.remove(this.player2.avatar);
            this.player2.cell.player = null;
            this.player2.cell = cell;
            cell.player = this.player2;
            cell.html.classList.add(this.player2.avatar);
            this.player2.cell.html.classList.add(this.player2.avatar);
            this.ActivateTurns('p1');
        }
        
    }

    HighlightAccessibleCells(cells) {
        cells.forEach(cell => {
            cell.html.classList.add('accessible');
        });
    }

    UnHighlightAccessibleCells(cells) {
        cells.forEach(cell => {
            cell.html.classList.remove('accessible');
            $(cell.html).off("click");
        });
    }

    AddEventListenersToAccessibleCells(cells, p) {
        cells.forEach(cell => {
            $(cell.html).on('click', () => {
                this.UnHighlightAccessibleCells(cells);
                this.MovePlayerOnClickingCell(cell, p);
            });
        });
    }

    RandomPlayers() {
        let randomIndex1 = Math.floor(Math.random() * this.arrayCells.length);
        let randomCell1 = this.arrayCells[randomIndex1];
        randomCell1.setPlayer(this.player1.avatar);
        randomCell1.player = this.player1;
        this.player1.cell = randomCell1;
        this.arrayCells.splice(randomIndex1, 1);

        let randomCell2 = null;
        let randomeIndex2 = null;
        do {
            randomeIndex2 = Math.floor(Math.random() * this.arrayCells.length);
            randomCell2 = this.arrayCells[randomeIndex2];
        } while (this.CheckTwoCellsAdjacent(randomCell1, randomCell2))

        randomCell2.setPlayer(this.player2.avatar);
        randomCell2.player = this.player2;
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