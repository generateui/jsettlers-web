export class ObservableArray {
    constructor() {
        this._array = [];
        this._addListeners = [];
        this._removeListeners = [];
    }
    get array() {
        return this._array;
    }
    get length() {
        return this._array.length;
    }
    pop() {
        return this._array.pop();
    }
    push() {
        this._array.push(arguments);
    }
    remove(item) {
        const index = this._array.indexOf(item);
        if (index !== -1) {
            this._array.splice(index, 1);
            for (let listener of this._removeListeners) {
                listener(item);
            }
        }
    }
    splice(start, deleteCount) {
        return this._array.splice(start, deleteCount, ...items);
    }
    removed(removeHandler) {
        this._removeListeners.push(removeHandler);
        const that = this;
        return () => {
            this._removeListeners.remove(removeHandler);
        }
    }
    added(addHandler) {
        this._addListeners.push(addHandler);
        const that = this;
        return () => {
            this._addListeners.remove(addHandler);
        }
    }

    push(item) {
        this._array.push(item);
        for (var listener of this._addListeners) {
            listener(item);
        }
    }

}
