const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../public/javascripts/authentication');

/* GET users listing. */
router.get('/', auth.checkNotAuthenticated, function(req, res, next) {
    res.render('login.ejs');
});

router.post('/', auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    })
)

module.exports = router;
