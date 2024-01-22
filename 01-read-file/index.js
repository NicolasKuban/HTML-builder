const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(path.dirname(require.main.filename));
const filePath = path.join(folderPath, 'text.txt');
const stream = fs.ReadStream(filePath, { encoding: 'utf-8' });

function readContent() {
  const data = stream.read();
  if (data !== null) {
    console.log(data);
  }
}

stream.on('readable', readContent);
