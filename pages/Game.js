export class Game extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .game-wrapper {
                    position: relative;
                    height: 100vh;
                }
                .buttons-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0.5rem;
                }
                .menu-dialog {
                    position: absolute;
                    border: none;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    margin: 0;
                    padding: 0;
                }
            </style>
            <div class="game-wrapper">
            <div class="buttons-wrapper">
                <schocken-reset-button></schocken-reset-button>
                <button class="menu-button open-menu-button">
                    <svg class="menu-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>  
                </button>
            </div>
            <dialog class="menu-dialog">
                <schocken-menu></schocken-menu>
            </dialog>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector('schocken-reset-button')
            .addEventListener('reset', () => {
                console.log('RESETTED!');
            });

        /** @type{HTMLDialogElement} */
        const dialog = this.shadowRoot.querySelector('.menu-dialog');

        this.shadowRoot
            .querySelector('.open-menu-button')
            .addEventListener('click', () => dialog.show());

        this.shadowRoot
            .querySelector('schocken-menu')
            .addEventListener('close', () => dialog.close());
    }
}

customElements.define('schocken-game', Game);