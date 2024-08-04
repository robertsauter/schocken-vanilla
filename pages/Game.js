import { Dices } from '../components/Dices.js';
import { RevealButton } from '../components/RevealButton.js';

export class Game extends HTMLElement {

    #move = 1;

    get move() {
        return this.#move;
    }

    set move(move) {
        this.#move = move;
        this.shadowRoot.querySelector('.move').innerHTML = `${move}/3`;
    }

    /** @type {Array<number>} */
    values = [];

    constructor() {
        super();
        this.handleDiceRoll = this.handleDiceRoll.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.createValues = this.createValues.bind(this);
        this.reset = this.reset.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .game-wrapper {
                    position: relative;
                    height: 100vh;
                    background-color: var(--theme-background);
                    color: var(--theme-text);
                }
                .buttons-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0.5rem;
                }
                .menu-button {
                    color: var(--theme-text);
                }
                .main-section {
                    height: 90%;
                }
                .dices-wrapper {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center; 
                }
                .game-state-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.5rem;
                }
                .move {
                    font-size: 1.5rem;
                    font-weight: 700;
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

                @media(min-width: 640px) {
                    .game-state-wrapper {
                        padding: 0 4rem;
                    }
                    .move {
                        font-size: 2.25rem;
                    }
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
                <main class="main-section">
                    <div class="game-state-wrapper">
                        <span class="move">1/3</span>
                        <schocken-einsen></schocken-einsen>
                    </div>
                    <div class="dices-wrapper">
                        <schocken-reveal-button></schocken-reveal-button>
                        <schocken-dices style="display: none"></schocken-dices>
                    </div>
                </main>
                <dialog class="menu-dialog">
                    <schocken-menu></schocken-menu>
                </dialog>
            </div>
        `;
    }

    connectedCallback() {
        /** @type{HTMLDialogElement} */
        const dialog = this.shadowRoot.querySelector('.menu-dialog');

        this.shadowRoot
            .querySelector('.open-menu-button')
            .addEventListener('click', () => dialog.show());

        this.shadowRoot
            .querySelector('schocken-menu')
            .addEventListener('close', () => dialog.close());

        this.shadowRoot
            .querySelector('schocken-reveal-button')
            .addEventListener('reveal', this.handleReveal);

        this.shadowRoot
            .querySelector('schocken-dices')
            .addEventListener('roll', this.handleDiceRoll);

        this.shadowRoot
            .querySelector('schocken-reset-button')
            .addEventListener('reset', this.reset);
    }

    /** @param {Event} e */
    handleReveal(e) {
        /** @type {RevealButton} */
        const revealButton = e.target;
        revealButton.style.display = 'none';
        /** @type {Dices} */
        const dices = this.shadowRoot.querySelector('schocken-dices');
        dices.style.display = 'initial';
        this.createValues();
        dices.values = this.values;
    }

    /** @param {Event} e */
    handleDiceRoll(e) {
        /** @type {Dices} */
        const dices = e.target;
        dices.style.display = 'none';
        /** @type {RevealButton} */
        const revealButton = this.shadowRoot.querySelector('schocken-reveal-button');
        revealButton.style.display = 'initial';
        this.move = this.move < 3 ? this.move + 1 : 1;
    }

    createValues() {
        const amount = this.move === 1 ? 3 : this.values.length;
        const values = [];
        for (let i = 0; i < amount; i++) {
            const min = Math.ceil(1);
            const max = Math.floor(7);
            const randomValue = Math.floor(Math.random() * (max - min) + min);
            values.push(randomValue);
        }
        this.values = values;
    }

    reset() {
        /** @type {RevealButton} */
        const revealButton = this.shadowRoot.querySelector('schocken-reveal-button');
        revealButton.style.display = 'initial';
        /** @type {Dices} */
        const dices = this.shadowRoot.querySelector('schocken-dices');
        dices.style.display = 'none';
        this.move = 1;
    }
}

customElements.define('schocken-game', Game);