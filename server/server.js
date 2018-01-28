const path = require('path');
const koa = require('koa');
const app = new koa();
const Pug = require('koa-pug');
const static = require('koa-static');
const setup = require('./config/default_setup');

setup();

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