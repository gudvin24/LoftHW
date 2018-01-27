const path = require('path');
const koa = require('koa');
const app = new koa();
const Pug = require('koa-pug');
const static = require('koa-static');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({ users: [{ login: 'admin', password: 'admin' }],
              contact_requests: [], works: []})
.write()

fs.mkdir('./server/files', (err) => {
  if(err && err.code !== 'EEXIST') {
    throw err;
  }
});

const pug = new Pug({
  viewPath: path.join(process.cwd(), 'server/views/pages'),
  basedir: path.join(process.cwd(), 'server/public_html')
});

pug.use(app); 

app
  .use(static(path.join(__dirname, './public')))
  .use(require('./routes/index').routes());

const server = app.listen(3000, () => {
  console.log('Listening to port: ' + server.address().port);
});