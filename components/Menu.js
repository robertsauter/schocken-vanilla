export class Menu extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
               @import url('/globals.css');

                .menu-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--theme-menu-background);
                    opacity: 90%;
                    backdrop-filter: blur(8px);
                    transition: background-color 200ms;
                }
                .menu-button-wrapper {
                    display: flex;
                    justify-content: end;
                    padding: 0 1.5rem;
                }
                .menu-button .menu-button-icon {
                    color: var(--theme-menu-text);
                } 
                .main-menu {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2.5rem;
                    gap: 2rem;
                }
                .menu-item {
                    width: 100%;
                }
                .menu-title {
                    font-size: 1.875rem;
                    font-weight: 700;
                    text-align: center;
                    color: var(--theme-menu-text);
                }
                .switch {
                    display: flex;
                    align-items: center;
                    border-radius: 9999px;
                    padding: 0.25rem;
                }
                .slider {
                    border-radius: 9999px;
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media (min-width: 640) {
                    .menu-button-wrapper {
                        padding: 0 4rem;
                    }
                    .menu-title {
                        font-size: 2.25rem;
                    }
                }

                @media (min-width: 768px) {
                    .menu-title {
                        font-size: 3rem;
                    }
                }
            </style>
            <div class="menu-wrapper">
                <div class="menu-button-wrapper">
                    <button class="menu-button">
                        <svg class="menu-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <menu class="main-menu">
                    <li class="menu-item">
                        <details class="expandable">
                            <summary class="menu-title">Theme</summary>
                            <schocken-theme-selection></schocken-theme-selection>
                        </details>
                    </li>
                    <li>
                        <label class="switch-wrapper">
                            <span class="menu-title">Spezial Modus</span>
                            <input type="checkbox" />
                            <div class="switch">
                                <div class="slider"></div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <a href="/impressum" class="menu-title">Impressum</a>
                    </li>
                </menu>
            </div>
        `;
    }
}

customElements.define('schocken-menu', Menu);