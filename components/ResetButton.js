import { gameStateService } from '../services/GameStateService.js';

export class ResetButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                .reset-button {
                    background-color: transparent;
                    border-style: none;
                    padding: 1rem;
                }
                .bounce-element {
                    background-color: var(--theme-yellow);
                    border-radius: 9999px;
                    padding: 0.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .reset-icon {
                    color: white;
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media(min-width: 640px) {
                    .reset-icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            </style>
            <button class="reset-button">
                <div class="bounce-element">
                    <svg class="reset-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            </button>
        `;
    }

    connectedCallback() {
        const resetButton = this.shadowRoot.querySelector('.reset-button');
        resetButton.addEventListener('click', () => {
            gameStateService.emitReset();
        });
    }
}

customElements.define('schocken-reset-button', ResetButton);