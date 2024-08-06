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
        this.removeEinsen = this.removeEinsen.bind(this);

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
                .dices-wrapper.without-dices {
                    background-color: var(--theme-yellow);
                    color: var(--theme-light);
                    padding: 1rem 2rem;
                    border-radius: 9999px;
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
                        transform: translateY(1rem) scale(0.9);
                        opacity: 0;
                    }
                    80% {
                        opacity: 1
                    }
                    100% {
                        transform: translateY(0) scale(1);
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
            const dicesWrapper = this.shadowRoot.querySelector('.dices-wrapper');
            dicesWrapper.classList.remove('rotated');
            dicesWrapper.classList.remove('without-dices');
        }, 200);
    }

    removeEinsen() {
        const einsen = this.shadowRoot.querySelectorAll('.dice[data-value="1"]');
        const sechsen = this.shadowRoot.querySelectorAll('.dice[data-value="6"]');
        einsen.forEach((eins) => eins.remove());
        if (sechsen.length > 1) {
            sechsen.forEach((sechs) => sechs.remove());
        }
        if ((einsen.length + sechsen.length) === 3) {
            const dicesWrapper = this.shadowRoot.querySelector('.dices-wrapper');
            dicesWrapper.innerHTML = `Erneut würfeln`;
            dicesWrapper.classList.add('without-dices');
        }
    }

    /** @param {number} value */
    createDice(value) {
        const rotationValues = [0, 1, 2, 3, 6, 12, 45, -1, -2, -3, -6, -12, -45];
        const randomRotation = rotationValues[Math.floor(Math.random() * rotationValues.length)];

        switch (value) {
            case 1:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice" data-value="1">
                    <div style="grid-column-start: 2" class="dot"></div>
                </div>`;
            case 2:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice">
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                </div>`;
            case 3:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice">
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-column-start: 2; grid-row-start: 2" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                </div>`;
            case 4:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice">
                    <div class="dot"></div>
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 3" class="dot"></div>
                </div>`;
            case 5:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice">
                    <div class="dot"></div>
                    <div style="grid-column-start: 3" class="dot"></div>
                    <div style="grid-column-start: 2; grid-row-start: 2" class="dot"></div>
                    <div style="grid-row-start: 3" class="dot"></div>
                    <div style="grid-column-start: 3; grid-row-start: 3" class="dot"></div>
                </div>`;
            case 6:
                return `<div style="transform: rotate(${randomRotation}deg)" class="dice" data-value="6">
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