// Asynchronous operators allow a program to perfrom tasks without waiting for others to complete
// This is useful especially for long operations such as grabbing api data

//what are some examples of a synchronous operation?
const fName = "melvino";
const greeting = `Hello, my name is ${fName}`;
console.log(greeting);

function greet(name) {
    console.log(`Hello, my name is ${name}`)
}

const fName2 = 'miriam';
const anotherGreeting = greet(fName2);
console.log(anotherGreeting);
// The above code is executed one line at a time from top to bottom. And, that line must finish successfully before moving on to the next.
// even if we called a separate function
// we have been working with this the entire time.


// the problem with synchronous operations is that they may take a long time,
// which can block the main thread, stopping the program until that particular line finishes
// here is an example of a long running synchronous function

const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const quota = document.getElementById("quota");
const output = document.getElementById("output");

document.getElementById("generate").addEventListener("click", () => {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;
});

document.getElementById("reload").addEventListener("click", () => {
  document.location.reload();
});

// it takes a very long time for this code to output something
// This is a big problem because this stops us from doing other tasks, and it makes the page unresponsive
// you cannot click, type, or do anything else. 
// this is the case becaues JS is single-threaded, meaning it can only do one thing at a time.

// what is an example of an asynchronous function?
// event handlers
// XMLHttpRequest

// this is an example of an XML HTTP Request
const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
    log.textContent = "";

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadend', () => {
        log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
    })

    xhr.open(
        "GET",
        "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json"
    );

    xhr.send();
    log.textContent = `${log.textContent}Started XHR request\n`
});

document.getElementById('reload').addEventListener('click', () => {
    log.textContent = "";
    document.location.reload();
})


//callbacks
// event handlers are a particular type of callback.
// a callback is just a function passed onto another function.
// callbacks were used for async functions in JS back in the day
// but callback based code becomes hard to read, and it can lead to something called callback hell

// below is a very simple synchronous program.
// function doStep1(init) {
//     return init + 1;
// }

// function doStep2(init) {
//     return init + 2;
// }

// function doStep3(init) {
//     return init + 3;
// }

// function doOperation() {
//     let result = 0;
//     result = doStep1(result);
//     result = doStep2(result);
//     result = doStep3(result);
//     console.log(`result: ${result}`);
// }

// using callbacks now
// this is a problem because we'd have to call a functions callback,
// and in that functions callback, we call another callback
// this is known as callback hell.
function doStep1(init, callback) {
    const result = init + 1; 
    callback(result);
}

function doStep2(init, callback) {
    const result = init + 2; 
    callback(result);
}

function doStep3(init, callback) {
    const result = init + 3; 
    callback(result);
}

function doOperation() {
    doStep1(0, (result1) => {
        doStep2(result1, (result2) => {
            doStep3(result2, (result3) => {
                console.log(`result: ${result3}`);
            })
        })
    })
}

doOperation();
