var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var AdminSchema = new mongoose.Schema({

  email: {type: String, required: true, unique: true},

  password: {type:String ,required:true, minlength: 6},

  firstName:String,

  LastName:String,

  Notes: String
});

// Hash the password before saving data
AdminSchema.pre('save', function(callback) {
  var admin = this;

  if(!admin.isModified('password'))
    return (callback);

  bcrypt.genSalt(5, function(err, salt){
    if(err) return callback(err);
    bcrypt.hash(admin.password, salt, null, function(err, hash){
      if(err) return callback(err);
      admin.password = hash;
      callback();
    });
  })
});

AdminSchema.methods.verifyPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
};
AdminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('admins',AdminSchema);
