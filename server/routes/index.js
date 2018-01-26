const express = require('express');
const router = express.Router();
const base = '../controller';

// const auth = (req, res, next) => {
//   if (!req.session.auth) {
//     return next();
//   }

//   res.redirect('/');
// };

router.get('/', (req, res, next) => {
    res.status(200).render('index', { });
});
router.get('/contact-me', (req, res, next) => {
    res.status(200).render('contact-me', { });
});
router.get('/my-work', (req, res, next) => {
    res.status(200).render('my-work', { });
});
router.get('/login', (req, res, next) => {
    res.status(200).render('login', { });
});
router.get('/logout', (req, res, next) => {
    req.session.auth = false;
    res.redirect('/login');
});

router.post('/contact-me', require('../service/contact'));



module.exports = router;







// const express = require('express');
// const router = express.Router();
// // const base = '../controller';

// const auth = (req, res, next) => {
//   if (!req.session.auth) {
//     return next();
//   }
//   res.redirect('/');
// };

// router.get('/', (req, res, next) => {
//     res.status(200).render('index', { });
// });
// router.get('/contact-me', (req, res, next) => {
//     res.status(200).render('contact-me', { });
// });
// router.get('/my-work', (req, res, next) => {
//     res.status(200).render('my-work', { });
// });
// router.get('/login', auth, (req, res, next) => {
//     res.status(200).render('login', { });
// });
// router.get('/logout', (req, res, next) => {
//     req.session.auth = false;
//     res.redirect('/login');
//   });

// router.post('/contact-me', (req, res, next) => {
//     // res.status(200).render('contact-me', { });
// });
// // router.post('/my-work', require(base + '/api/my-work'));
// // router.post('/login', require(base + '/api/login'));

// module.exports = router;