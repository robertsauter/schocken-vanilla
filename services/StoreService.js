import { Observable } from '../lib/Observable.js';

class StoreService {
    /** @type {Observable<boolean>} */
    specialMode$ = new Observable();
}

export const storeService = new StoreService();