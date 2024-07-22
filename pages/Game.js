import { gameStateService } from '../services/GameStateService.js';

export class Game extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-reset-button></schocken-reset-button>
        `;

        gameStateService.subscribeReset(() => {
            console.log('RESETTED!');
        });
    }
}

customElements.define('schocken-game', Game);