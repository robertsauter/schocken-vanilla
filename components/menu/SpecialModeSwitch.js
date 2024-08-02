export class SpecialModeSwitch extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .switch-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .switch {
                    display: flex;
                    align-items: center;
                    justify-content: start;
                    border-radius: 9999px;
                    padding: 0.25rem;
                    background-color: var(--theme-switch);
                    transition: all 200ms;
                    width: 3.5rem;
                }
                .switch.active {
                    justify-content: end;
                    background-color: var(--theme-switch-active);
                }
                .slider {
                    border-radius: 9999px;
                    width: 1.5rem;
                    height: 1.5rem;
                    background-color: var(--theme-menu-background);
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
            .addEventListener('change', (e) => {
                const switchElement = this.shadowRoot.querySelector('.switch');
                if (e.target.checked) {
                    switchElement.classList.add('active');
                }
                else {
                    switchElement.classList.remove('active');
                }
                localStorage.setItem('specialMode', e.target.checked);
            });
    }
}

customElements.define('schocken-special-mode-switch', SpecialModeSwitch);