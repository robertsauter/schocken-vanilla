export class SpecialModeSwitch extends HTMLElement {

    constructor() {
        super();
        this.handleModeChange = this.handleModeChange.bind(this);

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
                    transition: all 200ms;
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
                    transition: all 200ms;
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
            <label class="switch-wrapper">
                <span class="menu-title">Spezial Modus</span>
                <input class="special-mode-input" name="special-mode" hidden type="checkbox" />
                <div class="switch">
                    <div class="slider"></div>
                </div>
            </label>
        `;
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector('.special-mode-input')
            .addEventListener('change', this.handleModeChange);
    }

    /** @param {Event} e */
    handleModeChange(e) {
        /** @type {HTMLInputElement} */
        const modeCheckbox = e.target;
        const switchElement = this.shadowRoot.querySelector('.switch');
        if (modeCheckbox.checked) {
            switchElement.classList.add('active');
        }
        else {
            switchElement.classList.remove('active');
        }
        localStorage.setItem('specialMode', modeCheckbox.checked);
    }
}

customElements.define('schocken-special-mode-switch', SpecialModeSwitch);