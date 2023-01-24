console.log("Hi ");
console.log(global);

// Node                     vs              Vanilla js
// 1. runs on server                        Browser
// 2. Console is terminal                   Browser console
// window
// 3. Global object                         window object
// 4. CommonJs & ES modules                    ES modules
// 5. Common core modules
// 6. no fetch API                          fetch API
const os = require("os");
const path = require("path");
const { add, subtract, multiply, divide } = require("./math");

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
