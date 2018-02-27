export class KeyListener {
    constructor() {
        this.listenersByKey = new Map(); // <int (keyCode), Array<ListenerFunction>>
        this.anyKeyListeners = [];
        document.addEventListener('keydown', (event) => {
            for (var [keyCode, listeners] of this.listenersByKey) {
                if (keyCode === event.keyCode || keyCode === event.key) {
                    for (var listener of listeners) {
                        listener();
                    }
                }
            }
            for (var listener of this.anyKeyListeners) {
                listener();
            }
        });
    }
    specific(key, handler) {
        if (!this.listenersByKey.has(key)) {
            this.listenersByKey.set(key, []);
        }
        this.listenersByKey.get(key).push(handler);
        return () => {
            const listeners = this.listenersByKey.get(key);
            const index = listeners.indexOf(handler);
            listeners.splice(index, 1);
        }
    }
    escape(handler) {
        const ESCAPE = 27;
        if (!this.listenersByKey.has(ESCAPE)) {
            this.listenersByKey.set(ESCAPE, []);
        }
        this.listenersByKey.get(ESCAPE).push(handler);
        return () => {
            const listeners = this.listenersByKey.get(ESCAPE);
            const index = listeners.indexOf(handler);
            listeners.splice(index, 1);
        }
    }
    any(handler) {
        this.anyKeyListeners.push(handler);
        return () => {
            this.anyKeyListeners.remove(handler);
        }
    }
}