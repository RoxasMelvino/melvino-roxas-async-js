// recall that JS is a single-threaded programming language
// thus, long synchronous tasks blocks the main thread and makes the page unresponsesive


// this is where workers come in
// they give you the ability to work in a DIFFERENT thread
// but this means that your main code and worker code never get direct access to each other's variables
// this also means your worker code cannot access the DOM
// they are in completely different worlds

// There are three different sorts of workers:
// dedicated, shared, service


// To create a worker, you have to instantiate a new worker object
// give it the code in the separate worker file (workers have to be in a separate file);
//as soon as the worker is created, 
// the worker script is executed
const worker = new Worker('./generate.js');

// When the user clicks "Generate Primes," send a message to the worker
// the message commandd is "generate", and the message also contains "quota."
// which is the number of primes to generate. 
document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value;
    worker.postMessage({
        command: "generate", // identifying what we want the worker to do
        quota, // pass the quota data
    });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data. 
worker.addEventListener("message", (message) => {
    document.querySelector('#output').textContent =
    `Finished Generating ${message.data} primes!`
});

document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value =
        'Try typing in here immediately after pressing "Generate Primes"';
    document.location.reload();
})