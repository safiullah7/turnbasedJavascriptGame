export default class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        // cell prop. which cell player is on
        this.cell = null
    }

    setPlayerCell(cell) {
        this.cell = cell;
    }
}