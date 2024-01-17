const fs = require('fs');
const path = require('path');
let __dirpath = path.resolve(path.dirname(require.main.filename))
let __file = path.join(__dirpath, 'text.txt');
var stream = fs.ReadStream(__file, { encoding: 'utf-8' });
stream.on('readable', function () {
  var data = stream.read();
  if (data !== null) {
      console.log(data);
  }
});