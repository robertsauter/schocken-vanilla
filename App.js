export class App extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-game></schocken-game>
        `;

        this.registerServiceWorker();
    }

    connectedCallback() {
        window.screen.orientation
            .lock('portrait-primary')
            .catch(e => console.error(e));
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('/sw.js');
            }
            catch (error) {
                console.error('Service worker registration failed');
            }
        }
    }
}

customElements.define('schocken-app', App);