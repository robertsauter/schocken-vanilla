export class ThemeSelection extends HTMLElement {

    themeColors = {
        light: '#FFFFFF',
        dark: '#023047'
    };

    constructor() {
        super();
        this.initializeButton = this.initializeButton.bind(this);
        this.handleThemeButtonClick = this.handleThemeButtonClick.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
               @import url('/globals.css');

                .themes-wrapper {
                    background-color: var(--theme-background);
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 1rem;
                    border-radius: 1.5rem;
                    padding: 1rem;
                    animation: fadeIn 200ms;
                }
                .theme-button {
                    border-width: 4px;
                    border-style: solid;
                    padding: 0.75rem 0.5rem;
                    border-radius: 1rem;
                    font-weight: 700;
                    transition: border 200ms;
                }
                .theme-button.light {
                    color: var(--theme-dark);
                    border-color: var(--theme-light);
                    background-color: var(--theme-light);
                }
               .theme-button.dark {
                    color: var(--theme-light);
                    border-color: var(--theme-dark-blue);
                    background-color: var(--theme-dark-blue);
               } 
                .theme-button.active {
                    border-color: var(--theme-yellow);
                }

                @media (min-width: 640) {
                    .menu-button-wrapper {
                        padding: 0 4rem;
                    }
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-0.5rem);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
            <div class="themes-wrapper">
                <button data-variant="light" class="theme-button light">Hell</button>
                <button data-variant="dark" class="theme-button dark">Dunkel</button>
            </div>
        `;
    }

    connectedCallback() {
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme ?? 'light';
        document.documentElement.setAttribute('data-theme', initialTheme);

        const themeColorMeta = document.createElement('meta');
        themeColorMeta.setAttribute('name', 'theme-color');
        themeColorMeta.setAttribute('content', this.themeColors[initialTheme]);
        document.querySelector('head').appendChild(themeColorMeta);

        this.shadowRoot
            .querySelectorAll('.theme-button')
            .forEach((themeButton) => this.initializeButton(themeButton, initialTheme));
    }

    /**
     * @param {HTMLButtonElement} themeButton
     * @param {string} initialTheme
     * */
    initializeButton(themeButton, initialTheme) {
        if (initialTheme === themeButton.getAttribute('data-variant')) {
            themeButton.classList.add('active');
        }
        themeButton.addEventListener('click', this.handleThemeButtonClick);
    }

    /** @param {Event} e */
    handleThemeButtonClick(e) {
        /** @type {HTMLButtonElement} */
        const themeButton = e.target;
        /** @type {string} */
        const selectedTheme = themeButton.dataset.variant;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        this.shadowRoot.querySelector('.theme-button.active').classList.remove('active');
        themeButton.classList.add('active');
        localStorage.setItem('theme', selectedTheme);

        document.querySelector('meta[name="theme-color"]').setAttribute('content', this.themeColors[selectedTheme]);
    }
}

customElements.define('schocken-theme-selection', ThemeSelection);