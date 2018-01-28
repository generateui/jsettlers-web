class Observable {
    constructor() {
        this.listenersByProperty = {};
    }
    /** Listen to changes of property with given propertyName. When setter is called of property
     * handlerFunction is called. 
     * Returns an unsubscribe function. Call this to remove the handler.
     * Note that "${propertyName}Changed" methods are added for every observable property
     * which provides a "type-safer" way of subscription. */
    _listen(propertyName, handlerFunction) {
        if (this.listenersByProperty[propertyName] === undefined) {
            this.listenersByProperty[propertyName] = [];
        }
        const listeners = this.listenersByProperty[propertyName];
        listeners.push(handlerFunction);
        const that = this;
        return () => {
            var index = listeners.indexOf(handlerFunction);
            listeners.splice(index, 1);
        }
    }
    _fireChanged(propertyName, oldValue, newValue) {
        if (this.listenersByProperty[propertyName] === undefined) {
            return;
        }
        for (var listener of this.listenersByProperty[propertyName]) {
            listener(oldValue, newValue);
        }
    }
    /** Rewrites properties of given names to fire changed events when property is set.
     *  this implementation currently loses any custom getters/setters on an object,
     * so only "this.propertyName = null" declarations work. */
    makeObservable(propertyNames) {
        var that = this;
        for (var propertyName of propertyNames) {
            // wrap into anonymous function to get correct closure behavior
            (function(pn) {
                const fieldName = "_" + pn;
                that[fieldName] = that[propertyName]; // ensure initial value is set to created field
                Object.defineProperty(that, pn, {
                    enumerable: true,
                    configurable: true,
                    get() { return that["_" + pn]; },
                    set(value) {
                        const oldValue = that[fieldName];
                        that[fieldName] = value;
                        that._fireChanged(pn, oldValue, value);
                    }
                });
                const subscribeFunctionName = propertyName + "Changed";
                that[subscribeFunctionName] = (listenerFunction)  => that._listen(propertyName, listenerFunction);
            })(propertyName);
        }
    }
}