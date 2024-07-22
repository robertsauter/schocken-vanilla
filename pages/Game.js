export class Game extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-reset-button></schocken-reset-button>
        `;
    }

    connectedCallback() {
        const resetButton = this.shadowRoot.querySelector('schocken-reset-button');
        if (resetButton) {
            resetButton.addEventListener('reset', () => {
                console.log('RESETTED!');
            });
        }
    }
}

customElements.define('schocken-game', Game);