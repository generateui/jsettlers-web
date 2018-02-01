class ObservableMap extends Map {
    constructor() {
        super();
        this._changeListeners = [];
        this._addListeners = [];
        this._clearListeners = [];
    }
    set(key, value) {
        if (super.has(key)) {
            const oldValue = super.get(key);
            if (oldValue === value) {
                return; // no change
            } else {
                super.set(key, value);
                // fire changed event
                for (var listener of this._changeListeners) {
                    listener(key, oldValue, value);
                }
            }
        } else {
            super.set(key, value);
            // fire added event
            for (var listener of this._addListeners) {
                listener(key, value);
            }
        }
    }
    clear() {
        super.clear();
        for (var listener of this._clearListeners) {
            listener();
        }
    }
    changed(changeHandler) {
        this._changeListeners.push(changeHandler);
        const that = this;
        return () => {
            var index = this._changeListeners.indexOf(changeHandler);
            this._changeListeners.splice(index, 1);
        }
    }
    added(addHandler) {
        this._addListeners.push(addHandler);
        const that = this;
        return () => {
            var index = this._addListeners.indexOf(addHandler);
            this._addListeners.splice(index, 1);
        }
    }
    cleared(clearHandler) {
        this._clearListeners.push(clearHandler);
        const that = this;
        return () => {
            var index = this._clearListeners.indexOf(clearHandler);
            this._clearListeners.splice(index, 1);
        }
    }

}