// Object.prototype.equalsType = function(other) {
    // return this.constructor.name === other.constructor.name;
// };
String.prototype.hashCode = function() {
    var hash = 0, i, charCode;
    if (this.length === 0) {
        return 0;
    }
    for (i = 0; i < this.length; i++) {
        charCode = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + charCode;
        hash |= 0;
    }
    return hash;
};
String.prototype.toPascalCase = function() {
    const firstLetter = this[0].toUpperCase();
    const rest = this.substring(1, this.length).toLowerCase();
    return firstLetter + rest;
};

Array.prototype.remove = function(item) {
    const index = this.indexOf(item);
    if (index !== -1) {
        this.splice(index, 1);
    }
};
Array.prototype.mapMany = function(filterFunction) {
    filterFunction = filterFunction || function() { return true; }
    return Array.prototype.concat(...this.map(filterFunction));
};
Array.prototype.pushAll = function(array) {
    for (let item of array) {
        this.push(item);
    }
}
Array.prototype.clear = function(array) {
    this.splice(0, this.length);
}
Array.prototype.removeIf = function(conditionFunction) {
    var i = this.length;
    while (i--) {
        if (conditionFunction(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

Set.prototype.difference = function(setB) {
    let difference = new Set(this);
    for (let item of setB) {
        difference.delete(item);
    }
    return difference;
}
Set.prototype.union = function(setB) {
    var union = new Set(this);
    for (var item of setB) {
        union.add(item);
    }
    return union;
}