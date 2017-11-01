class Node {
    constructor(coord1, coord2, coord3) { /* Coord */
        var hash = Node._getHash(coord1, coord2, coord3);
        if (this.constructor._cache.has(hash)) {
            return this.constructor._cache.get(hash);
        }
        this._coord1 = coord1;
        this._coord2 = coord2;
        this._coord3 = coord3;
        this.constructor._cache.set(hash, this);
        this._hash = hash;
    }
    get coord1() { return this._coord1; }
    get coord2() { return this._coord2; }
    get coord3() { return this._coord3; }
    get hash() { 
        return this._hash;
    }
    static _getHash(c1, c2, c3) {
        return c1.hash + "•" + c2.hash + "•" + c3.hash;
    }
}
Node._cache = new Map();