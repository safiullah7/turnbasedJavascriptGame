export default class Weapon {
    constructor(cssClass) {
        this.cssClass = cssClass;
    }

    setWeaponTypeFromClass(cssClass) {
        this.cssClass = cssClass;
    }
}