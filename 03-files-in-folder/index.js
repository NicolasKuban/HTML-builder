const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(path.dirname(require.main.filename));
const folderPath = path.join(rootPath, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (file.isFile()) {
      fs.stat(path.resolve(folderPath, file.name), (err, fileStat) => {
        console.log(file.name.split('.').concat(String(fileStat.size).concat(' bytes')).join(' - '));
      });
    }
  }
});
