// recall that JS is a single-threaded programming language
// thus, long synchronous tasks blocks the main thread and makes the page unresponsesive


// this is where workers come in
// they give you the ability to work in a DIFFERENT thread
// this means that your main code and worker code never get direct access to each other's variables
// this also means your worker code cannot access the DOM
// they are in completely different worlds

// There are three different sorts of workers:
// dedicated, shared, service
