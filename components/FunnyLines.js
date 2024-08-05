export class FunnyLines extends HTMLElement {

    lines = {
        schockOut: [
            'Schock out!',
            'Du geile/r Hengst*in &#x1F60F;',
            '&#x1F389;&#x1F389;&#x1F389;'
        ],
        schock: [
            'Jawoll!',
            'Schock &#x1F389;'
        ],
        strasse: [
            'Straße &#x1F389;'
        ],
        pasch: [
            'Pasch &#x1F389;'
        ],
        twoFives: [
            'Zwei Fünfen im Ersten verlieren nicht!'
        ],
        aboveSix: [
            'Damit kann man arbeiten!',
            'Gar nicht so schlecht!'
        ],
        wundertuete: [
            'Mach lieber ne Wundertüte draus...',
            'Wie heißt das Spiel nochmal?',
            'Also ich würde nochmal würfeln...',
            'So würde ich das nicht stehen lassen...',
            'Schocken heißt das Spiel!'
        ],
        nothing: [
            'Was kannst du eigentlich?',
            '&#x1F926;',
            '...',
            'Das tut weh...',
            'Schon peinlich jetzt...',
            'Bittere Sache...'
        ]
    };

    /** 
     * @param {Array<number>} values  
     * @param {number} move
     * */
    constructor(values, move) {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('../globals.css');

                .funny-lines {
                    margin: 0;
                    font-size: 1.875rem;
                    font-weight: bold;
                    text-align: center;
                    animation: popUp 200ms;
                }

                @media(min-width: 640px) {
                    .funny-lines {
                        font-size: 2.25rem;
                    }
                }
                
                @keyframes popUp {
                    0% {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            </style>
            <p class="funny-lines">${this.generateLine(values, move)}</p>
        `;
    }

    /** 
     * @param {Array<number>} values  
     * @param {number} move
     * */
    generateLine(values, move) {
        const distribution = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0
        };
        if (values.length < 3) {
            distribution['1'] += 3 - values.length;
        }
        values.forEach((value) => distribution[`${value}`] += 1);

        if (distribution['1'] === 3) {
            return this.getRandomEntry('schockOut');
        }
        else if (distribution['1'] === 2) {
            return this.getRandomEntry('schock');
        }
        else if (move === 1) {
            if (distribution['5'] === 2) {
                return this.getRandomEntry('twoFives');
            }
            let strasse = 0;
            let begin = false;
            for (let i = 1; i <= 6; i++) {
                if (distribution[`${i}`] === 3) {
                    return this.getRandomEntry('pasch');
                }
                else if (distribution[`${i}`] === 1) {
                    strasse += 1;
                    begin = true;
                }
                else if (distribution[`${i}`] === 0 && begin && strasse < 3) {
                    break;
                }
            }
            if (strasse === 3) {
                return this.getRandomEntry('strasse');
            }
        }
        if (distribution['6'] > 0) {
            return this.getRandomEntry('aboveSix');
        }
        if (move === 2) {
            return this.getRandomEntry('wundertuete');
        }
        return this.getRandomEntry('nothing');
    }

    getRandomEntry(description) {
        const randomNumber = Math.floor(Math.random() * this.lines[description].length);
        return this.lines[description][randomNumber];
    }
}

customElements.define('schocken-funny-lines', FunnyLines);