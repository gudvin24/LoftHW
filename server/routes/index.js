const express = require('express');
const router = express.Router();

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

router.post('/contact-me', require('../service/contact'));
router.post('/login', require('../service/login'));
router.post('/my-work', require('../service/work'));

module.exports = router;
