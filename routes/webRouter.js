'use strict'

var express = require('express');
var router = express.Router();
var webControl = require('../controllers/webControl');

router.use(function timeLog (req, res, next) {
  next()
});

router.route('/')
  .get(webControl.get_index);

router.route('/app')
  .get(webControl.get_app);

module.exports = router;
