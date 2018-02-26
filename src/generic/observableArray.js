export class ObservableArray {
    constructor() {
        this._array = [];
        this._addListeners = [];
    }
    get array() {
        return this._array;
    }
    added(addHandler) {
        this._addListeners.push(addHandler);
        const that = this;
        return () => {
            var index = this._addListeners.indexOf(addHandler);
            this._addListeners.splice(index, 1);
        }
    }

    push(item) {
        this._array.push(item);
        for (var listener of this._addListeners) {
            listener(item);
        }
    }

}