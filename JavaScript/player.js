import Weapon from "./weapon.js";

export default class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        // cell prop. which cell player is on
        this.cell = null;
        this.weapon = null;
        this.health = 100;
        this.healthBarClient = this.name + 'PB';
        this.defending = false;
    }

    setPlayerCell(cell) {
        this.cell = cell;
    }

    setPlayerWeapon(weapon) {
        this.weapon = new Weapon();
        this.weapon.setWeaponTypeFromClass(weapon.cssClass);
    }

    UpdatePlayerHealthBar() {
        $('#' + this.healthBarClient).val(this.health);
    }
}