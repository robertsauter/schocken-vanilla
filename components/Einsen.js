export class Einsen extends HTMLElement {

    #dicesAmount = 0;

    get dicesAmount() {
        return this.#dicesAmount;
    }

    set dicesAmount(amount) {
        this.#dicesAmount = amount;
        let template = '';
        for (let i = 0; i < amount; i++) {
            template += `<div class="dice"><div class="dot"></div></div>`;
        }
        this.shadowRoot.querySelector('.dices-wrapper').innerHTML = template;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .dices-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                } 
                .dice {
                    border-style: solid;
                    border-color: var(--theme-text);
                    border-width: 4px;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 0.75rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .dot {
                    border-radius: 9999px;
                    width: 0.5rem;
                    height: 0.5rem;
                    background-color: var(--theme-text);
                }

                @media(min-width: 640px) {
                    .dice {
                        border-width: 6px;
                    }
                }
            </style>
            <div class="dices-wrapper"></div>
        `;
    }
}

customElements.define('schocken-einsen', Einsen);