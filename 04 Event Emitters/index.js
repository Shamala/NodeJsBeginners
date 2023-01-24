const logEvents = require("./logEvents");

const EventEmitter = require("events");

// Create a class by extending from EventEmitter
class MyEmitter extends EventEmitter {}

// Initialize Object
const myEmitter = new MyEmitter();

//Add listener
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "Log Event emitted!");
}, 2000);
