const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();
const config = require('../public/javascripts/config');
const auth = require('../public/javascripts/authentication');

/* Register User info */
router.get('/', auth.checkNotAuthenticated, function(req, res) {
    res.render('register.ejs');
});

router.post('/', registerUser);

async function registerUser(req, res, next) {
    try {
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
  
        /** TODO: Use Database here */
        var user = {
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
       };
        
        config.users.push(user);

        console.log("-- User registered");
        console.log(config.users);
        res.redirect('/login');
     } catch (e) {
        console.log(e)
        res.redirect('/register');
     }
}

module.exports = router;
