const router = require('koa-router')();
const koaBody = require('koa-body');

router.get('/', async (ctx, next) => {
    ctx.render('index');
});

router.get('/login', async (ctx, next) => {
    ctx.render('login');
});
router.post('/login', koaBody(), require('../service/login'));

router.get('/my-work', async (ctx, next) => {
    ctx.render('my-work');
});
router.post('/my-work', koaBody({
    multipart: true,
    formidable: {
      uploadDir: './server/files'
    }
  }), require('../service/work'));

router.get('/contact-me', async (ctx, next) => {
    ctx.render('contact-me');
});
router.post('/contact-me', koaBody(), require('../service/contact'));

module.exports = router;
