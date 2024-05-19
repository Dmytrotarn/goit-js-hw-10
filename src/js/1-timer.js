import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const timerDays = document.querySelector('[data-days]')
const timerHours = document.querySelector('[data-hours]')
const timerMinutes = document.querySelector('[data-minutes]')
const timerSeconds = document.querySelector('[data-seconds]')

let userSelectedDate = null
let interval;
startBtn.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            iziToast.error({
                title: 'Error',
                message: 'Please select date in the future',
                position: 'topRight',
                closeOnEscape: true,
                theme: 'dark',
                backgroundColor: '#EF4040',
                titleColor: '#FFF',
                titleSize: '16',
                titleLineHeight: '24',
                messageColor: '#FFF',
                messageSize: '16',
                messageLineHeight: '24',
            });
            startBtn.disabled = true
        }
        else {
            userSelectedDate = selectedDates[0]
            startBtn.disabled = false;
        }
    },
};


flatpickr("#datetime-picker", options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

startBtn.addEventListener('click', startTimer)

function startTimer() {
    startBtn.disabled = true;
    dateInput.disabled = true;
    interval = setInterval(upduteTime, 1000);
    return interval
}

const upduteTime = () => {
    const difference = userSelectedDate - Date.now()
    const { days, hours, minutes, seconds } = convertMs(difference)
    if (difference <= 0) {
        clearInterval(interval)
        dateInput.disabled = false;
        return
    }
    timerDays.textContent = addLeadingZero(days)
    timerHours.textContent = addLeadingZero(hours)
    timerMinutes.textContent = addLeadingZero(minutes)
    timerSeconds.textContent = addLeadingZero(seconds)
}