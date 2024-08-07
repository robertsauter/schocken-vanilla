export class Menu extends HTMLElement {

    constructor() {
        super();
        this.close = this.close.bind(this);
        this.handleEscapePress = this.handleEscapePress.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');

                .menu-wrapper {
                    width: 100%;
                    height: 100%;
                    background-color: var(--theme-menu-background);
                    backdrop-filter: blur(8px);
                    transition: all 200ms;
                    animation: fadeIn 200ms;
                }
                .menu-wrapper.fade-out {
                    opacity: 0;
                }
                .menu-button-wrapper {
                    display: flex;
                    justify-content: end;
                    padding: 0 0.5rem;
                    height: 12%;
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
                    animation: slideIn 200ms;
                    transition: all 200ms;
                }
                .main-menu.slideOut {
                    transform: translateY(0.25rem);
                }
                .menu-item {
                    width: 100%;
                }

                @media(min-width: 640) {
                    .menu-button-wrapper {
                        padding: 0 4rem;
                    }
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    0% {
                        transform: translateY(0.25rem);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            </style>
            <div class="menu-wrapper">
                <div class="menu-button-wrapper">
                    <button aria-label="Close menu button" class="menu-button close-menu-button">
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

    connectedCallback() {
        this.shadowRoot
            .querySelector('.close-menu-button')
            .addEventListener('click', this.close);

        document.addEventListener('keyup', this.handleEscapePress);
    }

    /** @param {KeyboardEvent} e */
    handleEscapePress(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close() {
        this.shadowRoot.querySelector('.menu-wrapper').classList.add('fade-out');
        this.shadowRoot.querySelector('.main-menu').classList.add('slideOut');

        setTimeout(() => {
            const closeEvent = new Event('close', { composed: true });
            this.shadowRoot.dispatchEvent(closeEvent);
            this.shadowRoot.querySelector('.menu-wrapper').classList.remove('fade-out');
            this.shadowRoot.querySelector('.main-menu').classList.remove('slideOut');
        }, 200);
    }
}

customElements.define('schocken-menu', Menu);