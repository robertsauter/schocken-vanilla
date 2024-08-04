export class RauslegenButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .rauslegen-button {
                    background-color: var(--theme-reveal-button);
                    color: var(--theme-light);
                    border-style: none;
                    border-radius: 9999px;
                    font-size: 1.25rem;
                    font-weight: 700;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 1rem 1rem;
                }
                .arrow-icon {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media(min-width: 640px) {
                    .rauslegen-button {
                        font-size: 1.875rem;
                    }
                    .arrow-icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            </style>
            <button class="rauslegen-button">
                <span>Einsen rauslegen</span>
                <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>                  
            </button>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.rauslegen-button').addEventListener('click', () => {
            const rauslegenEvent = new Event('rauslegen', { composed: true });
            this.shadowRoot.dispatchEvent(rauslegenEvent);
        });
    }


}

customElements.define('schocken-rauslegen-button', RauslegenButton);