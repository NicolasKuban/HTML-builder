const readline = require("readline");
const fs = require('fs')
const path = require('path')
let __dirpath = path.resolve(path.dirname(require.main.filename))
let __file = path.join(__dirpath, 'text.txt');

// path.exists(__file, function(exists) {
//     if (exists) {
//       console.log('EXISTS')
//     }
//   });

fs.stat(__file, function(err, stat) {
    if (err === null) {
        console.log("File is exists")
        fs.unlink(__file, (err) => {
            if(err) throw err;
            console.log('File deleted successfully!');
        });
    } else if (err.code === 'ENOENT') {
        console.log("File not exists")
    } else {
        console.log('Other error')
    }
})



fs.open(__file, 'w', (err) => {
    if(err) throw err;
    console.log('File created');
});

let ws = fs.createWriteStream(__file);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
// flag = true
// while (flag) {
// console.log(rl.input)
let b = rl.input.read(10)
console.log(b)

    // rl.question("What kind of animals do you know? \n=> ", function (answer) {
    //     if (answer === 'exit') {
    //         rl.close();
    //         ws.close()
    //         // flag = !flag
    //     } else {

    //         console.log(`Oh, so your name is ${answer}`);
    //         ws.write(answer)
    //     }
    // });
// }
// process.stdin.on('readable', function () {
//     var buf = process.stdin.readline;
//     if (buf !== null) {

//         console.log(buf.toString());
//     }
// });

rl.on('line', (input) => {
    console.log('=>', input)
})
console.log("=========", rl.readline)
rl.on('SIGINT', () => {
    console.log("EXIT")
    rl.close();
    ws.close()
});
// console.log("EXIT")