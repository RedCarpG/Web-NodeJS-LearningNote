const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();

/* Register User info */
router.get('/', function(req, res, next) {
    res.render('register.ejs');
});

var users = [];
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
        users.push(user);

        console.log("-- User registered");
        console.log(users);
        res.redirect('/login');
     } catch (e) {
        console.log(e)
        res.redirect('/register');
     }
}

module.exports = router;
