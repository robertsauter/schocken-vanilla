export class App extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-game></schocken-game>
        `;
    }
}

customElements.define('schocken-app', App);