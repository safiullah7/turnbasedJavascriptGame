import Weapon from "./weapon.js";
import Player from "./player.js";

export default class Cell {
    constructor(height, width, index) {
        this.height = height;
        this.width = width;
        this.x = Math.floor(index / 10);
        this.y = index % 10;
        this.weapon = null;
        // weapon property?
        this.player = null;
        // player property?
        this.blocker = false;

        this.html = null;

        // player
        // blockage
        // weapon

        // i cud save html element as property 
    }
    Generate(id) {
        let cell = document.createElement('div');
        cell.id = id;
        cell.style.height = this.height;
        cell.style.width = this.width;
        cell.classList.add("grid");
        // cell.textContent = `${this.x} : ${this.y}`;
        this.html = cell;
        return cell;
    }
    setBackgroundBlocker() {
        this.blocker = true;
        this.html.classList.add('blocker');
    }
    setWeapon(className) {
        this.weapon = new Weapon()
        this.weapon.setWeaponTypeFromClass(className);
        // this.weapon.setWeapon(cell);
        console.log(className);
        // let element = this.html;
        // element.classList.add(className);
        // this.html = element;
        this.html.classList.add(className);
    }
    setPlayer(cssClass) {
        this.html.classList.add(cssClass);
    }
}