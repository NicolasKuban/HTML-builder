const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const __sourceDirName = 'styles';
const __outputDirName = 'project-dist';
const __outputFileName = 'bundle.css'

const __currentDir = path.resolve(path.dirname(require.main.filename))
const __outputFile = path.join(__currentDir, __outputDirName, __outputFileName);

const __sourceDir = path.join(__currentDir, __sourceDirName);


const arrFiles = []


async function mergeFiles() {
  namesFiles = []
  const outputFile = fs.createWriteStream(__outputFile)
  try {
    const files = await fsp.readdir(__sourceDir, {withFileTypes: true})
    for (const file of files) {
      if (file.isFile()) {
        if (file.name.split('.').slice(-1)[0] === 'css') {
          namesFiles.push(file.name)
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  function rec(arr, stream) {
    if (!arr.length) {
      return
    }

    let fileName = arr.shift()
    let currentFile = fs.createReadStream(path.resolve(__sourceDir, fileName));
    stream.write(`/* === ${fileName} === */\n`)
    currentFile.pipe(stream, { end: false})
    currentFile.on('end', () => {
      stream.write(`\n`)
      rec(arr, stream)
    })
  }

  rec(namesFiles, outputFile)


}
mergeFiles()