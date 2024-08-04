export class Dices extends HTMLElement {

    /** @param {Array<number>} values */
    set values(values) {
        let template = '';
        values.forEach((value) => template += this.createDice(value));
        const dicesWrapper = this.shadowRoot.querySelector('.dices-wrapper');
        dicesWrapper.innerHTML = template;
    }

    constructor() {
        super();
        this.handleDicesClick = this.handleDicesClick.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .dices-wrapper {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    align-content: center;
                    flex-wrap: wrap;
                    transition: all 200ms;
                    background-color: transparent;
                    border-style: none;
                    animation: appear 200ms;
                }
                
                .dices-wrapper.rotated {
                    opacity: 0;
                    transform: scale(0.75) rotate(45deg);
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

                @keyframes appear {
                    0% {
                        transform: translateY(1rem);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                } 
            </style> 
            <button class="dices-wrapper"></button>
        `;
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector('.dices-wrapper')
            .addEventListener('click', this.handleDicesClick);
    }

    handleDicesClick() {
        this.shadowRoot.querySelector('.dices-wrapper').classList.add('rotated');
        setTimeout(() => {
            const rollEvent = new Event('roll', { composed: true });
            this.shadowRoot.dispatchEvent(rollEvent);
            this.shadowRoot.querySelector('.dices-wrapper').classList.remove('rotated');
        }, 200);
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