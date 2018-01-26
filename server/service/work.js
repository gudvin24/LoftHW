const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const os = require('os');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = (req, res, next) => {
  
    var storage = 'server/files';
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        const file = files.file[0];
        if (!fields.projectName || !fields.projectUrl || !fields.text || !file) {      
            res.send({ mes: 'Заполните все поля', status: 'Error' });
        } else {
            fs.copyFile(file.path, path.join(storage, path.basename(file.path)), (err) => {
                if (err) {
                    console.log('Не удалось сохранить файл');
                    res.send({ mes: 'Что-то пошло не так', status: 'Error' });
                    throw err;
                }
                db.get('works')
                .push({ projectName: fields.projectName[0], 
                        projectUrl: fields.projectUrl[0], 
                        text: fields.text[0], 
                        filename: path.basename(file.path),
                        originalFilename: file.originalFilename})
                .write();
                res.send({ mes: 'Проект успешно загружен', status: 'OK' });
            });        
        }
    });
};