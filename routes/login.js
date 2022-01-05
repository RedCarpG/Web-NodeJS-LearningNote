const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login.ejs');
});

router.post('/', function(req, res) {
    try {
    } catch {
        res.redirect('/login');
    }
})

module.exports = router;
