// this section is all about learning how to implement promimse-based apis

const name = document.getElementById('name')
const delay = document.getElementById('delay')
const button = document.getElementById('set-alarm');
const output = document.getElementById('output');

// function setAlarm() {
//     setTimeout(() => {
//         output.textContent = "Wake up!";
//     }, 1000)
// }

function alarm(person, delay) {
    // our alarm function will return a promise 
    // said promise is fulfilled when the timer expires
    // pass a wake up message to the then() handler
    // reject the promise if the caller puts a negative delay value

    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Delay must not be negative');
        }

        setTimeout(() => {
            resolve(`Goodmorning, ${person}. It is time to wake up!`)
        }, delay)
    });
}

// the first way of handling our Promise: "then" and "catch"
// button.addEventListener('click', () => {
//     alarm(name.value, delay.value)
//     .then(message => output.textContent = message)
//     .catch((error) => output.textContent = `Couldn't set alarm: ${error}`)
// });

// the second way of way of handling the Promise: async and await
button.addEventListener('click', async () => {
    try {
        const message = await alarm(name.value, delay.value);
        output.textContent = message
    } catch (error) {
        output.textContent = error;
    }
}) 