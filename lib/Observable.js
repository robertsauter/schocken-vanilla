/**
 * @template T
 * @type {Observable<T>}
 */
export class Observable {
    /** 
     * @type {Array<(value: T) => void>}
     * */
    #observers = [];

    constructor() {
        this.observe = this.observe.bind(this);
        this.emit = this.emit.bind(this);
    }

    /**
     * @param {(value: T) => void} callback 
     * */
    observe(callback) {
        this.#observers.push(callback);
    }

    /**
     * @param {T} value 
     * */
    emit(value) {
        this.#observers.forEach((observerFunction) => observerFunction(value));
    }
}