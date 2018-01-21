const fs = require("fs");
const path = require("path");
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

let srcDir = process.argv[2];
let destinationDir = process.argv[3];
let removeSrc = !!process.argv[4];

let performDir = async (srcPath, destPath, remove) => {

    try { 
      let files = await readdir(srcPath)
      for (let file of files) {
        let stats = await stat(path.join(srcPath, file));
        if (stats.isDirectory()) {
          await performDir(path.join(srcPath, file), destPath, remove);
        } else { //IF FILE:
          let from = path.join(srcPath, file);
          let destDir = path.join(destPath, file.charAt(0));
          let to = path.join(destDir, file);
          
          try {
            let destStats = await stat(destDir)
          }
          catch (err) {
            if (err.code === "ENOENT") {
              console.log('CREATE DIR:' + destDir);
              await mkdir(destDir);
            } else {
              console.log('ERROR READING DIRECTORY: ' + destDir);
              throw err;
            }
          }

          await copyFile(from, to);
          if (remove)
            await unlink(from);

        }
      };
      console.log('READING FINISHED: ' + srcPath);
      if (remove)
        await rmdir(srcPath);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
}

performDir(srcDir, destinationDir, removeSrc);
