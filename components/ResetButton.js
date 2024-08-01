export class ResetButton extends HTMLElement {

    #rotation = 0;

    constructor() {
        super();

        this.handleReset = this.handleReset.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .reset-button {
                    background-color: transparent;
                    border-style: none;
                    padding: 1rem;
                    transition: transform 500ms;
                }
                .bounce-element {
                    background-color: var(--theme-yellow);
                    border-radius: 9999px;
                    padding: 0.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: transform 75ms ease-in;
                }
                .bounce-element.expanded {
                    transform: scale(1.1);
                }
                .reset-icon {
                    color: var(--theme-light);
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media (min-width: 640px) {
                    .reset-icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            </style>
            <button class="reset-button">
                <div class="bounce-element">
                    <svg class="reset-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            </button>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.reset-button').addEventListener('click', this.handleReset);
    }

    handleReset() {
        const bounceElement = this.shadowRoot.querySelector('.bounce-element');
        /** @type {HTMLButtonElement} */
        const resetButton = this.shadowRoot.querySelector('.reset-button');
        this.#rotation += 180;

        resetButton.style.transform = `rotate(${this.#rotation}deg)`;
        bounceElement.classList.add('expanded');
        setTimeout(() => {
            bounceElement.classList.remove('expanded');
        }, 75);

        const resetEvent = new Event('reset', { composed: true });
        this.shadowRoot.dispatchEvent(resetEvent);
    };
}

customElements.define('schocken-reset-button', ResetButton);