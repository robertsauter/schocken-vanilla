import { storeService } from '../../services/StoreService.js';

export class SpecialModeSwitch extends HTMLElement {

    constructor() {
        super();
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleLabelEnter = this.handleLabelEnter.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .switch-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .switch {
                    border-radius: 9999px;
                    background-color: var(--theme-switch);
                    width: 4rem;
                    height: 2rem;
                    position: relative;
                }
                .switch.active {
                    background-color: var(--theme-switch-active);
                }
                .slider {
                    position: absolute;
                    top: 0.25rem;
                    left: 0.25rem;
                    border-radius: 9999px;
                    width: 1.5rem;
                    height: 1.5rem;
                    background-color: var(--theme-menu-background);
                    transition: all 75ms ease-in;
                }
                .switch.active .slider {
                    left: 2.25rem
                }

                @media(min-width: 640px) {
                    .switch-wrapper {
                        gap: 1rem;
                    }
                }
            </style>
            <label tabindex="0" for="specialModeInput" class="switch-wrapper">
                <span class="menu-title">Spezial Modus</span>
                <input id="specialModeInput" class="special-mode-input" name="special-mode" hidden type="checkbox" />
                <div class="switch">
                    <div class="slider"></div>
                </div>
            </label>
        `;
    }

    connectedCallback() {
        /** @type {HTMLInputElement} */
        const specialModeInput = this.shadowRoot.querySelector('.special-mode-input');
        specialModeInput.addEventListener('change', this.handleModeChange);

        /** @type {HTMLLabelElement} */
        const specialModeLabel = this.shadowRoot.querySelector('.switch-wrapper');
        specialModeLabel.addEventListener('keyup', this.handleLabelEnter);

        const specialMode = localStorage.getItem('specialMode') === 'true';
        if (specialMode) {
            specialModeInput.checked = true;
            this.handleModeChange();
        }
    }

    /** @param {KeyboardEvent} e */
    handleLabelEnter(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            /** @type {HTMLInputElement} */
            const modeCheckbox = this.shadowRoot.querySelector('.special-mode-input');
            modeCheckbox.checked = !modeCheckbox.checked;
            this.handleModeChange();
        }
    }

    handleModeChange() {
        /** @type {HTMLInputElement} */
        const modeCheckbox = this.shadowRoot.querySelector('.special-mode-input');
        const switchElement = this.shadowRoot.querySelector('.switch');
        if (modeCheckbox.checked) {
            switchElement.classList.add('active');
        }
        else {
            switchElement.classList.remove('active');
        }
        localStorage.setItem('specialMode', modeCheckbox.checked);

        storeService.specialMode$.emit(modeCheckbox.checked);
    }
}

customElements.define('schocken-special-mode-switch', SpecialModeSwitch);