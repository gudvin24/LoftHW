const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (ctx, next) => {
    const fields = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
    const storage = './server/files'
    if (!fields.projectName || !fields.projectUrl || !fields.text || !file) {    
        ctx.body = { mes: 'Заполните все поля', status: 'Error' };  
    } else {
        console.log(file.path + path.extname(file.name));
        await fs.rename(file.path, file.path + path.extname(file.name), (err) => {
            if (err) {
                ctx.body = { mes: 'Что-то пошло не так', status: 'Error' };
                console.log(err);
                throw err;
            }
            db.get('works')
            .push({ projectName: fields.projectName, 
                    projectUrl: fields.projectUrl, 
                    text: fields.text, 
                    filename: path.basename(file.path),
                    originalFilename: file.name})
            .write();
            console.log('OK');
        });
        ctx.body = { mes: 'Проект успешно загружен', status: 'OK' };
    }
};