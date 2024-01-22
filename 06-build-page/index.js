const { error } = require('console');
const fs = require('fs');
const fsp = require('fs/promises')
const path = require('path');

const __currentDir = path.resolve(path.dirname(require.main.filename))
const __templateFileName = 'template.html'
const __templateDirName = 'components'
const __outputHtmlName = 'index.html'
const __outputCssName = 'style.css'
const __sourceDirAssets = 'assets'
const __outputDirName = 'project-dist';
const __sourceDirName = 'styles';

const projectDir = path.resolve(__currentDir, __outputDirName)
const tempHtmlFile = path.resolve(__currentDir, __templateFileName)
const tempDir = path.resolve(__currentDir, __templateDirName)
const outputFile = path.resolve(projectDir, __outputHtmlName)
const cssSourceDir = path.resolve(__currentDir, __sourceDirName)
const outputCssFile = path.resolve(projectDir, __outputCssName)
const assetsSourceDir = path.resolve(__currentDir, __sourceDirAssets)
const assetsDistDir = path.resolve(projectDir, __sourceDirAssets)

async function createFolder(dir) {
    await fsp.mkdir(dir, { recursive: true });
}

async function replaceSample(tempFile, files) {
    for (const file of files) {
        sampleFile = path.resolve(tempDir, file.name)
        if (file.isFile() && file.name.split('.').at(-1) === 'html') {
            nameSample = file.name.split('.').at(0)
            contentSampleFile = await fsp.readFile(sampleFile, {encoding: 'utf-8'})
            tempFile = tempFile.replace(`{{${nameSample}}}`, contentSampleFile);
        }
    }
    return tempFile;
}

async function mergeHtml() {
    const contentHtmlFile = await fsp.readFile(tempHtmlFile, {encoding: 'utf-8'})
    const extendFiles = await fsp.readdir(tempDir, {withFileTypes: true})
    const mergedFile = await replaceSample(contentHtmlFile, extendFiles)

    await fsp.writeFile(outputFile, mergedFile);
}

async function mergeStyle() {
    const files = await fsp.readdir(cssSourceDir, { withFileTypes: true })
    const mergedCssFile = fs.createWriteStream(outputCssFile)
    for (const file of files) {
        cssFile = path.resolve(cssSourceDir, file.name)
        if (file.isFile() && file.name.split('.').at(-1) === 'css') {
            const tempFile = fs.createReadStream(cssFile, {encoding: 'utf-8'})
            tempFile.pipe(mergedCssFile)
        }
    }
}

async function copyFiles (srcDir, distDir) {
    await createFolder(distDir)
    try {
        const files = await fsp.readdir(srcDir ,{ withFileTypes: true })
        for (const file of files) {
            srcFile = path.join(srcDir, file.name)
            distFile = path.join(distDir, file.name)
            if (file.isFile()) {
                await fsp.copyFile(srcFile, distFile)
            } else {
                copyFiles(srcFile, distFile)
            }
        }
    } catch {
        console.log(error.message)
    }
}

async function mergeProject() {
    await createFolder(projectDir)
    await mergeHtml()
    await mergeStyle()
    await copyFiles(assetsSourceDir, assetsDistDir)
}

mergeProject()