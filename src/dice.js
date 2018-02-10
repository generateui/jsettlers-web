export class Die {
    constructor(number) {
        this.number = number || 6;
    }
}
export class Dice {
    constructor() {
        this.die1 = new Die(5);
        this.die2 = new Die(6);
    }
}