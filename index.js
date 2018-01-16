const fs = require("fs");
const path = require("path");

let srcDir = process.argv[2];
let destinationDir = process.argv[3];
let removeSrc = !!process.argv[4];

let copyFile = (from, to, remove) => {

    fs.copyFile(from,to, (err) => { 
        if (err) {    
            console.log("ERROR COPYING!" + err);
            throw err;
        }
        if (remove) {
            fs.unlink(from, (err) => {
                if (err)
                    throw err;
            })
        }});
}

let performDir = (srcPath, distPath, removeSrc) => {

    fs.readdir(srcPath, (err, files) => {

        if (err) {
            console.log('ERROR READING DIRECTORY ' + srcPath + ': ' + err.message);
            throw err;
        }
        files.forEach( (item) => {

            fs.stat(path.join(srcPath, item), (err, stats) => {

                if (err) {
                    console.log('ERROR while getting stats for ' + path.join(srcPath, item) + ': ' + err.message);
                    throw err;
                }
                if (stats.isDirectory()) {
                    console.log('DIRECTORY FOUND: ' + path.join(srcPath, item));
                    performDir(path.join(srcPath, item), distPath, removeSrc);
                }
                else {// if file
                    console.log('NEED TO MOVE FILE ' + item + ' TO ' + path.join(distPath, item.charAt(0)));
                    fs.stat(path.join(distPath, item.charAt(0)), function(err, stats) {
                        let from = path.join(srcPath, item);
                        let destDir = path.join(distPath, item.charAt(0));
                        let to = path.join(destDir, item);
                        if (err && err.code === "ENOENT") {
                            console.log('NO DIRECTORY ' + destDir + ' FOUND, LETS CREATE IT'); 
                            fs.mkdir(destDir, (err) => {
                                if (err) {
                                    if (err.code != 'EEXIST') { // directory maybe exists, maybe created concurrently.
                                        console.log('UNABLE TO CREATE DIRECTORY ' + destDir + ': ' + err.code);
                                        throw err;
                                    }
                                }
                                copyFile(from,to, removeSrc);
                                
                            })
                        } else {
                            copyFile(from,to, removeSrc);
                        
                        }
                    });
                }});

        });

    });
}

performDir(srcDir, destinationDir, removeSrc);
