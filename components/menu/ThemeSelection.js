export class ThemeSelection extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
               @import url('/globals.css');

                .themes-wrapper {
                    background-color: var(--theme-light);
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 1rem;
                    border-radius: 1.5rem;
                    padding: 1rem;
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
            </style>
            <div class="themes-wrapper">
                <button data-variant="light" class="theme-button light">Hell</button>
                <button data-variant="dark" class="theme-button dark">Dunkel</button>
            </div>
        `;
    }

    connectedCallback() {
        let initialTheme = localStorage.getItem('theme');
        if (!initialTheme) {
            initialTheme = 'light';
        }
        document.documentElement.setAttribute('data-theme', initialTheme);


        this.shadowRoot.querySelectorAll('.theme-button').forEach((themeButton) => {
            if (initialTheme === themeButton.getAttribute('data-variant')) {
                themeButton.classList.add('active');
            }

            themeButton.addEventListener('click', (e) => {
                /** @type {string} */
                const selectedTheme = e.target.dataset.variant;
                document.documentElement.setAttribute('data-theme', selectedTheme);
                this.shadowRoot.querySelector('.theme-button.active').classList.remove('active');
                e.target.classList.add('active');
                localStorage.setItem('theme', selectedTheme);
            });
        });
    }
}

customElements.define('schocken-theme-selection', ThemeSelection);