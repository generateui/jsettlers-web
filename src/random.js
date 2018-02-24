export class ClientRandom {
    constructor() {

    }
    intFromZero(size) {
        return this._getRandomIntInclusive(0, size - 1);
    }
    intFromOne(size) {
        return this._getRandomIntInclusive(1, size);
    }
    _getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}