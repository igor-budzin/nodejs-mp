export class CustomEventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(fn);
    }
    else {
      this.listeners[eventName] = [fn];
    }
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!this.listeners[eventName]) return;

    const eventListeners = this.listeners[eventName];

    this.listeners[eventName] = eventListeners.filter((listener) => {
      return listener !== fn;
    });
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.on(eventName, (...rest) => {
      fn(...rest);

      delete this.listeners[eventName];
    });
  }

  emit(eventName, ...rest) {
    const callbacks = this.listeners[eventName];

    callbacks?.forEach((cb) => {
      cb(...rest);
    });
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length ?? 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] ?? [];
  }
}