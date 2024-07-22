export class Observable {

    #subscriberFunctions = [];

    constructor() {
        this.emit = this.emit.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    emit(value) {
        this.#subscriberFunctions.forEach((subscriberFunction) => subscriberFunction(value));
    }

    subscribe(subscriberFunction) {
        this.#subscriberFunctions.push(subscriberFunction);
    }
}