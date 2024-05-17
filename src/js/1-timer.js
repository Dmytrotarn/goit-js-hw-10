import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
});
