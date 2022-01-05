const express = require('express');
const router = express.Router();
const auth = require('../public/javascripts/authentication');

/* GET home page. */
router.delete('/', auth.checkAuthenticated, function(req, res) {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
