import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')
const inputDelay = document.querySelector('[name="delay"]');
const inputFulfilled = document.querySelector('[value="fulfilled"]');
const inputRejected = document.querySelector('[value="rejected"]');
const button = document.querySelector('button[type=submit]')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const delay = parseInt(inputDelay.value)
    const promise = new Promise((resolve, reject) => {
        if (inputFulfilled.checked) {
            setTimeout(() => {
                resolve(delay)
            }, delay);
        }
        else if (inputRejected.checked) {
            setTimeout(() => {
                reject(delay)
            }, delay);
        }
    })
    promise.then((delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            icon: ''
        });
    })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                icon: ''
            });
        });

    inputDelay.value = '';
    inputFulfilled.checked = false;
    inputRejected.checked = false;
})


