const fs = require('fs')
const path = require('path')
const __root = path.resolve(path.dirname(require.main.filename))
const __dirpath = path.join(__root, 'secret-folder');


fs.readdir(__dirpath, {withFileTypes: true}, (err, files) => {
    if (err) throw err
    for (const file of files) {
        if (file.isFile()) {
            fs.stat(path.resolve(__dirpath, file.name), (err, fileStat) => {
                console.log(file.name.split('.').concat(fileStat.size).join(' - '))
            })
        }
    }
})
