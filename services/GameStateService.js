import { Observable } from '../lib/Observable.js';

class GameStateService {

    #reset$ = new Observable();

    emitReset() {
        this.#reset$.emit();
    }

    subscribeReset(subscriberFunction) {
        this.#reset$.subscribe(subscriberFunction);
    }
}

export const gameStateService = new GameStateService();