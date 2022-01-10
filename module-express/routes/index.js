const express = require('express');
const router = express.Router();
const auth = require('../public/javascripts/authentication');

/* GET home page. */
router.get('/', auth.checkAuthenticated, function(req, res) {
  res.render('index', {name: req.user.name});
});

module.exports = router;
