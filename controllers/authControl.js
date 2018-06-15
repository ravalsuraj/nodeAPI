var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Account = require('../models/account');

passport.use(new BasicStrategy(
  function(username, password, callback){
    Account.findOne({email:username}, function(err,account){
      if(err) return callback(err);

      //No existing user found with that username
      if(!account) return (callback(null,false));

      //if user exists, check password
      account.verifyPassword(password,function(err,isMatch){
        if(err) return callback(err,null);

        // If Password is not correct, send a false
        if(!isMatch) return callback(null, false);

        //success
        return (callback(null,account));
      });
    });
  }
));
/* authenticate using our BasicStrategy without storing session variables,
so users have to send credentials on every call*/
exports.isValidAccount = passport.authenticate('basic',{session: false});
