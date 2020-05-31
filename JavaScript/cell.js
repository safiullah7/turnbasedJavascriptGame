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
        $(cell).attr("id", id);
        $(cell).css("height", this.height);
        $(cell).css("width", this.width);
        $(cell).addClass("grid");
        this.html = cell;
        return cell;
    }
    setBackgroundBlocker() {
        this.blocker = true;
        // this.html.classList.add('blocker');
        $(this.html).addClass("blocker");
    }
    setWeapon(className) {
        this.weapon = new Weapon()
        this.weapon.setWeaponTypeFromClass(className);
        console.log(className);
        // this.html.classList.add(className);
        $(this.html).addClass(className);
    }
    setPlayer(cssClass) {
        // this.html.classList.add(cssClass);
        $(this.html).addClass(cssClass);
    }
}