import { CustomEventEmitter } from '../Task_3.1/CustomEventEmitter.js';

export class WithTime extends CustomEventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('begin');

    const start = performance.now();
    const result = await asyncFunc(...args);
    this.emit('data', result);
    const end = performance.now();

    const executionTIme = end - start;
    this.emit('end', executionTIme);
  }
}
