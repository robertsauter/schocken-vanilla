export class RevealButton extends HTMLElement {
    constructor() {
        super();
        this.handleRevealButtonClick = this.handleRevealButtonClick.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .reveal-button {
                    width: 15rem;
                    height: 15rem;
                    background-color: var(--theme-reveal-button);
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: var(--theme-light);
                    border-radius: 9999px;
                    border-style: none;
                    animation: appear 300ms ease-in;
                    transition: transform 75ms ease-in;
                }
                .reveal-button.active {
                    transform: scale(105%);
                }

                @media(min-width: 360px) {
                    .reveal-button {
                        width: 18rem;
                        height: 18rem;
                        font-size: 3rem;
                    }
                }

                @media(min-width: 640px) {
                    .reveal-button {
                        width: 100%;
                        height: 100%;
                        font-size: 6rem;
                    }
                }

                @keyframes appear {
                    0% {
                        transform: scale(90%);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(100%);
                        opacity: 1;
                    }
                }
            </style> 
            <button class="reveal-button">Aufdecken</button>
        `;
    }

    connectedCallback() {
        /** @type {HTMLButtonElement} */
        this.shadowRoot
            .querySelector('.reveal-button')
            .addEventListener('click', this.handleRevealButtonClick);
    }

    /** @param {Event} e */
    handleRevealButtonClick(e) {
        /** @type {HTMLButtonElement} */
        const revealButton = e.target;
        revealButton.classList.add('active');
        setTimeout(() => {
            const revealEvent = new Event('reveal', { composed: true });
            this.shadowRoot.dispatchEvent(revealEvent);
        }, 200);
    }
}

customElements.define('schocken-reveal-button', RevealButton);