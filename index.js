const fs = require("fs");
const path = require("path");

let srcDir = process.argv[2];
let destinationDir = process.argv[3];
let removeSrc = !!process.argv[4];

let performDir = (srcPath, distPath, removeSrc) => {

    fs.readdir(srcPath, (err, files) => {
        if (err) 
            console.log('ERROR READING DIRECTORY ' + srcPath + ': ' + err.message);

        console.log('START READING DIRECTORY: ' + srcPath);
            
        files.forEach( (item) => {

            fs.stat(path.join(srcPath, item), (err, stats) => {
                if (err) 
                    console.log('ERROR while getting stats for ' + path.join(srcPath, item) + ': ' + err.message);
                if (stats.isDirectory()) {
                    console.log('DIRECTORY FOUND: ' + path.join(srcPath, item));
                    performDir(path.join(srcPath, item), distPath);
                }
                else {// if file
                    console.log('ITEM: ' + item + ', DISTPATH: ' + distPath)
                    console.log('NEED TO MOVE FILE ' + item + ' TO ' + path.join(distPath, item.charAt(0)));
                    fs.stat(path.join(distPath, item.charAt(0)), function(err, stats) {
                        let from = path.join(srcPath, item);
                        let newDir = path.join(distPath, item.charAt(0));
                        let to = path.join(newDir, item);
                        if (err && err.code === "ENOENT") {
                            console.log('NO DIRECTORY ' + newDir + ' FOUND, LETS CREATE IT'); 
                        fs.mkdir(newDir, (err) => {
                            if (err) {
                                if (err.code == 'EEXIST') { // directory exists, maybe created concurrently
                                    fs.copyFile(from,to, (err) => { 
                                        if (err)    
                                            console.log("ERROR COPYING!" + err);
                                        }
                                    )
                                } else {
                                    console.log('UNABLE TO CREATE DIRECTORY ' + newDir + ': ' + err.code);
                                    throw err;
                                }
                            }
                            fs.copyFile(from,to, (err) => { 
                                if (err)    
                                    console.log("ERROR COPYING!" + err);
                                }
                            )
                        })
                        } else {
                            fs.copyFile(from,to, (err) => { 
                                if (err)    
                                    console.log("ERROR COPYING!" + err);
                                }
                            )
                        }
                    });
                }});

        });
    });
}

performDir(srcDir, destinationDir);