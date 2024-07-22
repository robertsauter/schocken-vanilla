export class Game extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-top-actions></schocken-top-actions>
        `;
    }
}

customElements.define('schocken-game', Game);