const fs = require('fs')
const path = require('path')
const __root = path.resolve(path.dirname(require.main.filename))
const __dirSrc = path.join(__root, 'files');
const __dirDist = path.join(__root, 'files-copy');


fs.readdir(__dirSrc, {withFileTypes: true}, (err, files) => {
    if (err) throw err
    for (const file of files) {
        if (file.isFile()) {
            fs.stat(path.resolve(__dirSrc, file.name), (err, fileStat) => {
                fs.copyFile(path.resolve(__dirSrc, file.name), path.resolve(__dirDist, file.name), err => {
                    if (err) throw err
                })
            })
        }
    }
})

fs.mkdir(__dirDist, {recursive: true}, err => {
    if (err) throw err
})