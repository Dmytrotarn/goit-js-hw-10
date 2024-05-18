import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

const startBtn = document.querySelector('button[data-start]')

startBtn.disabled = true


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options);


let userSelectedDate = null
