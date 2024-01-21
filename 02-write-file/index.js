const readline = require('readline');
const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(path.dirname(require.main.filename));
const filePath = path.join(folderPath, 'text.txt');

const ws = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(filePath, 'w', (err) => {
  if (err) throw err;
});

function exitStream() {
  console.log('Stream is closed, data save to text.txt');
  rl.close();
  ws.close();
}

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    exitStream();
  } else {
    ws.write(input);
    ws.write('\n');
  }
});

rl.on('SIGINT', () => {
  ws.write(rl.line);
  exitStream();
});

console.log('Hello, my friend. Tell us about your achievements.');
console.log('To exit, type the word "exit"');
