'use strict'


exports.get_index = function(req, res){
  res.render('index.pug');
};


exports.get_app = function(req, res){
  res.render('login.pug');
};
