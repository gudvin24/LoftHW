const fs = require('fs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)


module.exports = () => {
    db.defaults({ users: [{ login: 'admin', password: 'admin' }],
                contact_requests: [], 
                works: []})
    .write()

    fs.mkdir('./server/files', (err) => {
    if(err && err.code !== 'EEXIST') {
        throw err;
    }
    });
}