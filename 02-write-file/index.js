const readline = require("readline");
const fs = require('fs')
const path = require('path')
let __dirpath = path.resolve(path.dirname(require.main.filename))
let __file = path.join(__dirpath, 'text.txt');

let ws = fs.createWriteStream(__file);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


// fs.stat(__file, function(err, stat) {
//     if (err === null) {
//     }
// })

fs.unlink(__file, (err) => {
    if(err) {
        return
    }
    // throw err;
});
fs.open(__file, 'w', (err) => {
    if(err) throw err;
});

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        exitStream()
    } else {
        ws.write(input)
        ws.write('\n')
    }
})

rl.on('SIGINT', () => {
    ws.write(rl.line)
    exitStream()
});

function exitStream () {
    console.log("Stream is closed, data save to text.txt")
    rl.close();
    ws.close()
}

console.log('Hello, my friend. Tell us about your achievements.')
console.log('To exit, type the word "exit"')
