export class App extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `
           <schocken-game></schocken-game>
        `;

        this.registerServiceWorker();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('/sw.js').then((registration) => {
                    console.log(registration);
                });
            }
            catch (error) {
                console.error('Service worker registration failed');
            }
        }
    }
}

customElements.define('schocken-app', App);