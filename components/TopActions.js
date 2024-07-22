export class TopActions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
           <p>HALLO</p>
        `;
    }
}

customElements.define('schocken-top-actions', TopActions);