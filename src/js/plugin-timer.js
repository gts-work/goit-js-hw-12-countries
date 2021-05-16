import timerTpl from "../templates/timer.hbs";

export class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;

        this.start();
    }

    start() {
        setInterval(() => {
            const startTime = Date.now();

            const deltaTime = this.targetDate - startTime;
            const time = this.getTimeComponents(deltaTime);

            updateClockView(this.selector, time);
        }, 1000);
    }

    getTimeComponents(time) {
        /*
         * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
         * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
         */
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

        /*
         * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
         * остатка % и делим его на количество миллисекунд в одном часе
         * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
         */
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );

        /*
         * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
         * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
         */
        const mins = this.pad(
            Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
        );

        /*
         * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
         * миллисекунд в одной секунде (1000)
         */
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    /*
     * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
     */
    pad(value) {
        return String(value).padStart(2, "0");
    }
}

function updateClockView(selector, { days, hours, mins, secs }) {
    const timeContainer = document.querySelector(selector);
    const timerMarkup = timerTpl({ days, hours, mins, secs });
    timeContainer.innerHTML = "";
    timeContainer.insertAdjacentHTML("beforeEnd", timerMarkup);
}
