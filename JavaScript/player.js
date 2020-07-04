import Weapon from "./weapon.js";

export default class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
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
        this.UpdatePlayerWeaponSidebar(weapon.cssClass)
        this.weapon = new Weapon();
        this.weapon.setWeaponTypeFromClass(weapon.cssClass);
    }

    UpdatePlayerWeaponSidebar(newWeaponClass) {
        let playerSidebarClientId = this.name + 'weapon';
        if (this.weapon != null && this.weapon.cssClass != '') {
            $('#' + playerSidebarClientId).removeClass(this.weapon.cssClass);
        }
        $('#' + playerSidebarClientId).addClass(newWeaponClass);
    }

    UpdatePlayerHealthBar() {
        $('#' + this.healthBarClient).val(this.health);
    }
}