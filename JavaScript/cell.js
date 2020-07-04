import Weapon from "./weapon.js";
import Player from "./player.js";

export default class Cell {
    constructor(height, width, index) {
        this.height = height;
        this.width = width;
        this.x = Math.floor(index / 10);
        this.y = index % 10;
        this.weapon = null;
        this.player = null;
        this.blocker = false;
        this.html = null;
    }
    Generate(id) {
        let cell = document.createElement('div');
        $(cell).attr("id", id);
        $(cell).css("height", this.height);
        $(cell).css("width", this.width);
        $(cell).addClass("grid");
        // cell.textContent = `${this.x} : ${this.y}`;
        this.html = cell;
        return cell;
    }
    setBackgroundBlocker() {
        this.blocker = true;
        $(this.html).addClass("blocker");
    }
    setWeapon(className) {
        this.weapon = new Weapon()
        this.weapon.setWeaponTypeFromClass(className);
        console.log(className);
        $(this.html).addClass(className);
    }
    setPlayer(cssClass) {
        $(this.html).addClass(cssClass);
    }
}