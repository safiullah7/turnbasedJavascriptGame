export default class Weapon {
    constructor(cssClass) {
        this.cssClass = cssClass;
        this.damage = null;
    }

    setWeaponTypeFromClass(cssClass) {
        this.cssClass = cssClass;
        this.setWeaponDamage(cssClass);
    }

    setWeaponDamage(cssClass) {
        switch (cssClass) {
            case 'thor':
                this.damage = 20;
                break;
            case 'axe':
                this.damage = 15;
                break;
            case 'arrow':
                this.damage = 10;
                break;
            case 'shield':
                this.damage = 5;
                break;
            default:
                this.damage = 0;
          }
    }
}