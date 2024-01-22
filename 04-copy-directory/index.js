const fsp = require('fs/promises');
const path = require('path');

async function createFolder(dir) {
  await fsp.mkdir(dir, { recursive: true });
}


async function copyDir(dirSrc) {
  const rootPath = path.resolve(path.dirname(require.main.filename));
  const srcPath = path.join(rootPath, dirSrc);
  const distPath = path.join(rootPath, dirSrc.concat('-copy'));

  await createFolder(distPath);
  const files = await fsp.readdir(srcPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const srcFile = path.resolve(srcPath, file.name);
      const distFile = path.resolve(distPath, file.name);
      await fsp.copyFile(srcFile, distFile);
    }
  }
  // fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
  //   if (err) throw err;
  //   for (const file of files) {
  //     if (file.isFile()) {
  //       fs.stat(path.resolve(srcPath, file.name), (err) => {
  //         fs.copyFile(
  //           path.resolve(srcPath, file.name),
  //           path.resolve(distPath, file.name),
  //           (err) => {
  //             if (err) throw err;
  //           }
  //         );
  //       });
  //     }
  //   }
  // });
}

copyDir('files');
