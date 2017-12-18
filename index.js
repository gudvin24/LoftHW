const fs = require("fs");
const path = require("path");

let srcDir = process.argv[2];
let destinationDir = process.argv[3];
let removeSrc = !!process.argv[4];

let handleDir = (srcPath, distPath, removeSrc) => {
    fs.readdir(srcPath, (err, files) => {
        if (err) 
            throw err;

        console.log('START READING DIRECTORY: ' + srcPath);
            
        files.forEach( (item) => {
            fs.stat(path.join(srcPath, item), (err, stats) => {
                if (err) 
                    throw err;
                if (stats.isDirectory()) {
                    handleDir(srcPath + item);
                }
                else
                    console.log('FILE FOUND: ' + path.join( srcPath, item));
            });
        });

    });
}

handleDir(srcDir);