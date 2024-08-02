export class Dices extends HTMLElement {

    /** @param {number} amount */
    set dicesAmount(amount) {
        let template = '';
        for (let i = 0; i < amount; i++) {
            const min = Math.ceil(1);
            const max = Math.floor(7);
            const randomValue = Math.floor(Math.random() * (max - min) + min);
            console.log(randomValue);
            const dice = this.createDice(randomValue);
            template += dice;
        }
        const dicesWrapper = this.shadowRoot.querySelector('.dices-wrapper');
        dicesWrapper.innerHTML = template;
        dicesWrapper.classList.add('shown');
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .dices-wrapper {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    align-content: center;
                    flex-wrap: wrap;
                    opacity: 0;
                    transform: translateY(1rem);
                    transition: all 200ms;
                }
                .dices-wrapper.shown {
                    opacity: 1;
                    transform: translateY(0);
                }
                .dice {
                    width: 4rem;
                    height: 4rem;
                    border-width: 6px;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    align-items: center;
                    justify-items: center;
                    border-radius: 1.25rem;
                    border-color: var(--theme-text);
                    border-style: solid;
                    padding: 0.5rem;
                }
                .dot {
                    border-radius: 9999px;
                    width: 1rem;
                    height: 1rem;
                    background-color: var(--theme-text);
                }

                @media(min-width: 360px) {
                    .dice {
                        width: 5rem;
                        height: 5rem;
                        border-width: 8px;
                        border-radius: 1.5rem;
                    }
                    .dot {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                }

                @media(min-width: 640px) {
                    .dice {
                        width: 6rem;
                        height: 6rem;
                    }
                    .dot {
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                }
            </style> 
            <div class="dices-wrapper"></div>
        `;
    }

    /** @param {number} value */
    createDice(value) {
        switch (value) {
            case 1:
                return `<div class="dice">
                    <div style="grid-column-start: 2" class="dot"></div>
                </div>`;
            case 2:
                return `<div class="dice">
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                </div>`;
            case 3:
                return `<div class="dice">
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-column-start: 2; grid-row-start: 2" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                </div>`;
            case 4:
                return `<div class="dice">
                    <div class="dot"></div>
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 3" class="dot"></div>
                </div>`;
            case 5:
                return `<div class="dice">
                    <div class="dot"></div>
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-column-start: 2; grid-row-start: 2" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 3" class="dot"></div>
                </div>`;
            case 6:
                return `<div class="dice">
                    <div class="dot"></div>
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-row-start: 2" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 2" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 3" class="dot"></div>
                </div>`;
        }
    }
}

customElements.define('schocken-dices', Dices);