import { Dices } from '../components/Dices.js';
import { RauslegenButton } from '../components/RauslegenButton.js';
import { RevealButton } from '../components/RevealButton.js';
import { Einsen } from '../components/Einsen.js';
import { storeService } from '../services/StoreService.js';
import { FunnyLines } from '../components/FunnyLines.js';

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

    specialMode = false;

    constructor() {
        super();
        this.handleDiceRoll = this.handleDiceRoll.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.createValues = this.createValues.bind(this);
        this.reset = this.reset.bind(this);
        this.einsenRauslegen = this.einsenRauslegen.bind(this);
        this.resetEinsen = this.resetEinsen.bind(this);
        this.hideDices = this.hideDices.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .game-wrapper {
                    position: relative;
                    height: 100vh;
                    background-color: var(--theme-background);
                    color: var(--theme-text);
                    overflow: hidden;
                }
                .buttons-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0.5rem;
                    height: 12%;
                }
                .menu-button {
                    color: var(--theme-text);
                }
                .main-section {
                    height: 88%;
                }
                .funny-lines-wrapper {
                    max-height: 10%;
                    height: 10%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 1.5rem;
                } 
                .dices-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center; 
                    height: 65%;
                }
                .game-state-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.5rem;
                    height: 10%;
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
                    background-color: transparent;
                }
                .rauslegen-button-wrapper {
                    padding: 1rem;
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
                    <button aria-label="Open menu button" class="menu-button open-menu-button">
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
                    <div class="funny-lines-wrapper"></div>
                    <div class="dices-wrapper">
                        <schocken-reveal-button></schocken-reveal-button>
                        <schocken-dices style="display: none"></schocken-dices>
                    </div>
                    <div class="rauslegen-button-wrapper">
                        <schocken-rauslegen-button style="display: none"></schocken-rauslegen-button>
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

        this.shadowRoot
            .querySelector('schocken-rauslegen-button')
            .addEventListener('rauslegen', this.einsenRauslegen);

        storeService.specialMode$.observe((active) => this.specialMode = active);
    }

    /** @param {Event} e */
    handleReveal(e) {
        /** @type {RevealButton} */
        const revealButton = e.target;
        revealButton.style.display = 'none';

        /** @type {Dices} */
        const dices = this.shadowRoot.querySelector('schocken-dices');
        dices.style.display = 'initial';

        this.values = this.createValues();
        dices.values = this.values;

        /** @type {RauslegenButton} */
        const rauslegenButton = this.shadowRoot.querySelector('schocken-rauslegen-button');
        const isNotSchockOut = this.values.some((value) => value !== 1);
        const sechsenAmount = this.values.filter((value) => value === 6).length;
        const containsEinsenOrSechsen = this.values.includes(1) || sechsenAmount > 1;
        if (containsEinsenOrSechsen && this.move < 3 && isNotSchockOut) {
            rauslegenButton.style.display = 'initial';
        }

        if (this.specialMode) {
            const funnyLines = new FunnyLines(this.values, this.move);
            this.shadowRoot.querySelector('.funny-lines-wrapper').appendChild(funnyLines);
        }
    }

    handleDiceRoll() {
        const isNotSchockOut = this.values.some((value) => value !== 1);
        if (this.move < 3 && isNotSchockOut) {
            this.move += 1;
            this.hideDices();
        }
        else {
            this.reset();
        }
        /** @type {RauslegenButton} */
        const rauslegenButton = this.shadowRoot.querySelector('schocken-rauslegen-button');
        rauslegenButton.style.display = 'none';

        this.shadowRoot.querySelector('.funny-lines-wrapper').innerHTML = ``;
    }

    hideDices() {
        /** @type {Dices} */
        const dices = this.shadowRoot.querySelector('schocken-dices');
        dices.style.display = 'none';

        /** @type {RevealButton} */
        const revealButton = this.shadowRoot.querySelector('schocken-reveal-button');
        revealButton.style.display = 'initial';
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
        return values;
    }

    reset() {
        this.hideDices();
        this.move = 1;
        this.resetEinsen();
        /** @type {RauslegenButton} */
        const rauslegenButton = this.shadowRoot.querySelector('schocken-rauslegen-button');
        rauslegenButton.style.display = 'none';
        this.shadowRoot.querySelector('.funny-lines-wrapper').innerHTML = ``;
        this.values = [];
    }

    resetEinsen() {
        /** @type {Einsen} */
        const einsen = this.shadowRoot.querySelector('schocken-einsen');
        einsen.dicesAmount = 0;
    }

    /** @param {Event} e */
    einsenRauslegen(e) {
        /** @type {Einsen} */
        const einsen = this.shadowRoot.querySelector('schocken-einsen');
        const sechsenAmount = this.values.filter((value) => value === 6).length;
        let einsenAmount = this.values.filter((value) => value === 1).length;
        if (sechsenAmount > 1) {
            einsenAmount += sechsenAmount - 1;
            this.values = this.values.filter((value) => value !== 6);
            this.values.push(0);
        }
        einsen.dicesAmount += einsenAmount;

        this.values = this.values.filter((value) => value !== 1);
        /** @type {Dices} */
        const dices = this.shadowRoot.querySelector('schocken-dices');
        dices.removeEinsen();

        /** @type {RauslegenButton} */
        const rauslegenButton = e.target;
        rauslegenButton.style.display = 'none';
    }
}

customElements.define('schocken-game', Game);