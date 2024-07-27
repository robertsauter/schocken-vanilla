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

                @media(min-width: 640) {
                    .menu-button-wrapper {
                        padding: 0 4rem;
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
                        <details>
                            <summary class="menu-title">Theme</summary>
                            <schocken-theme-selection></schocken-theme-selection>
                        </details>
                    </li>
                    <li>
                        <schocken-special-mode-switch></schocken-special-mode-switch>
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