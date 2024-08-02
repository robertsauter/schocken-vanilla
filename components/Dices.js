export class Dices extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');
            </style> 
            <p>HALLO</p>
        `;
    }
}

customElements.define('schocken-dices', Dices);