//each function represents a section of the website from MDN

//if the promise failes or succeeds, it will call our handler ,
// pass in our repsonse object; which contains the server's response.
function usingFetch() {
    const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")

    console.log(fetchPromise); // this tells us that we have a promise
    // it will say pending; telling us that the operation is still going on.
    fetchPromise.then((response) => { 
        jsonPromise = response.json(); // use this method to get the responses data;
    
        // since .json() is also asynchronous, we have to use .then() handler
        // console.log(jsonPromise);
        jsonPromise.then((data) => {
            // keep in mind that we just called a callback inside another callback
            // this refers to as callback hell
            console.log(data);
        })
        console.log(`Received response: ${response.status}`);
    });
    
    console.log("Started Request");
}

function chaining() {
    const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
    fetchPromise
    .then((response) => {
        // we need to check that the server accepted and was able to handle the request
        //we can check the STATUS CODE in the response and throw an error
        // if it was not 'ok'
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
}

function catchingErrors() {
    // error handling can get difficult with nested callbacks
    // thus, promise objects have provide a catch() method.
    // it is similar to .then(), but catch() is called when 
    // the async operation fails
    // we can add catch() to the end of a promise chain 

    const fetchPromise = fetch("bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

    fetchPromise
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }

        return response.json()
    })
    .then(data => console.log(data))
    .catch((error) => {
        console.error(`Could not get products: ${error}`)
    });
}

function combiningMultPromises() {
    // At times, you need promises to be fulfilled
    // but they don't depend on each other 
    // in that case, it would be efficient to start them all together at once. 
    // the Promise.all() method is what you need 

    const fetchPromise1 = fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    const fetchPromise2 = fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
    );
    const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );

    Promise.all([fetchPromise1, fetchPromise2, fetchPromise3]) // this takes an array of promises
    .then((responses) => { // if all responses are fulfilled, the "then" handler will be called 
        console.log(responses);
        for (const response of responses) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error(`Failed to fetch : ${error}`)
    })
}

// adding the async keyoword at the start of the function makes it an async function
// inside an async function we can use await; await is only available in an async func.!
async function asyncAwait() {
    try {
        // we are naming this variable response because the await keyword will 
        // wait for a promise response
        const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
        const data = await response.json();    
        console.log(data);
    } catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}


// usingFetch();
// chaining();
// catchingErrors();
// combiningMultPromises();
asyncAwait();




