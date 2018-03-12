/**
 * We cannot (yet) simply derive from Map. Therefore, a map is wrapped.
 * 
 * For some reason, wrapping [Symbol.iterator]() method does not work, so
 * to iterate on this obervablemap, we have to expose the internal this.map 
 * instance and use it to iterate over it.
 */
export class ObservableMap {
    constructor() {
        this.map = new Map();
        this._changeListeners = [];
        this._addListeners = [];
        this._clearListeners = [];
        this._deleteListeners = [];
    }
    get(key) {
        return this.map.get(key);
    }
    set(key, value) {
        if (this.map.has(key)) {
            const oldValue = this.map.get(key);
            if (oldValue === value) {
                return; // no change
            } else {
                this.map.set(key, value);
                // fire changed event
                for (var listener of this._changeListeners) {
                    listener(key, oldValue, value);
                }
            }
        } else {
            this.map.set(key, value);
            // fire added event
            for (var listener of this._addListeners) {
                listener(key, value);
            }
        }
    }
    delete(key) {
        if (!this.map.has(key)) {
            return;
        }
        this.map.delete(key);
        for (var listener of this._deleteListeners) {
            listener(key);
        }
    }
    clear() {
        this.map.clear();
        for (var listener of this._clearListeners) {
            listener();
        }
    }
    values() {
        return this.map.values();
    }
    changed(changeHandler) {
        this._changeListeners.push(changeHandler);
        return () => {
            var index = this._changeListeners.indexOf(changeHandler);
            this._changeListeners.splice(index, 1);
        }
    }
    added(addHandler) {
        this._addListeners.push(addHandler);
        return () => {
            var index = this._addListeners.indexOf(addHandler);
            this._addListeners.splice(index, 1);
        }
    }
    cleared(clearHandler) {
        this._clearListeners.push(clearHandler);
        return () => {
            var index = this._clearListeners.indexOf(clearHandler);
            this._clearListeners.splice(index, 1);
        }
    }
    deleted(deleteHandler) {
        this._deleteListeners.push(deleteHandler);
        return () => {
            var index = this._deleteListeners.indexOf(deleteHandler);
            this._deleteListeners.splice(index, 1);
        }
    }
}