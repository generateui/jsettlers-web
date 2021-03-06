/** Derive from this class to make properties observable
 * 
 * In your constructor, call `makeObservable(["propertyName1", "propertyName2", ...])`
 * to make target properties observable. This adds `propertyName1Changed` methods to
 * the class. To subscribe, pass in a function with an `oldValue` and `newValue` 
 * parameter, like so:
 * 
 *  observableInstance.propertyName1Changed((oldValue, newValue) => {
 *      // do something with new and/or old value
 *  }
 * 
 * Currently only supports properties which do not have getters or setters defined.
 */
export class Observable {
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
    _firePropertyChanged(propertyName, oldValue, newValue) {
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
                that[fieldName] = that[pn]; // ensure initial value is set to created field
                Object.defineProperty(that, pn, {
                    enumerable: true,
                    configurable: true,
                    get() { return that["_" + pn]; },
                    set(value) {
                        const oldValue = that[fieldName];
                        that[fieldName] = value;
                        that._firePropertyChanged(pn, oldValue, value);
                    }
                });
                const subscribeFunctionName = pn + "Changed";
                that[subscribeFunctionName] = (listenerFunction)  => that._listen(pn, listenerFunction);
            })(propertyName);
        }
    }
}